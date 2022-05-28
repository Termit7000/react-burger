import {
    fetchCreateOrder,
    getIngredients,
    fetchRegister,
    fetchSignIn,
    fetchRefreshToken,
    fetchUser,
    fetchLogOut,
    fetchUpdateUser
} from "../../utils/api";

//Авторизация
export const AUTH_REQUEST = 'REGISTER_REQUEST';
export const AUTH_FAILED = 'REGISTER_FAILED';
export const AUTH_SUCCESS = 'REGISTER_SUCCESS';
export const AUTH_RESET_ERROR = 'AUTH_RESET_ERROR';

export const AUTH_SET_NEW_TOKEN = 'AUTH_SET_NEW_TOKEN';

export const AUTH_SET_USER_INFO = 'AUTH_SET_USER_INFO';

//Выход из системы
export const AUTH_LOGOUT_REQUEST = 'AUTH_LOGOUT_REQUEST';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOGOUT_FAILED = 'AUTH_LOGOUT_FAILED';

//Обновление данных пользователя
export const AUTH_UPDATE_REQUEST = 'AUTH_UPDATE_REQUEST';
export const AUTH_UPDATE_SUCCESS = 'AUTH_UPDATE_SUCCESS';
export const AUTH_UPDATE_FAILED = 'AUTH_UPDATE_FAILED';

//Заказ
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

//Игредиенты 
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const INCREASE_INGREDIENT = 'INCREASE_INGREDIENT';
export const DECREASE_INGREDIENT = 'DECREASE_INGREDIENT';

export const CLEAR_ALL_INGREDIENTS = 'CLEAR_ALL_INGREDIENTS';

export const ADD_TO_CONSTRUCTOR = 'ADD_TO_CONSTRUCTOR';
export const DELETE_FROM_CONSTRUCTOR = 'DELETE_FROM_CONSTRUCTOR';
export const DELETE_ALL_FROM_CONSTRUCTOR = 'DELETE_ALL_FROM_CONSTRUCTOR';

export const MOVE_INGREDIENTS_CONSTRUCTOR = 'MOVE_INGREDIENTS_CONSTRUCTOR';

export const getIngredientsItems = () => dispatch => {

    dispatch({ type: GET_INGREDIENTS_REQUEST })

    getIngredients()
        .then((dataFetch) => {
            dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: dataFetch.data });
        })
        .catch(error => dispatch({ type: GET_INGREDIENTS_FAILED, errorText: error }));
}

/**
 * Создание заказа
 */
export const createOrder = () => (dispatch, getState) => {

    dispatch({ type: GET_ORDER_REQUEST });

    const { ingredients, auth } = getState();

    const ingredientsIds = [...ingredients.constructor.ingredients.map(el => el.id),
    ingredients.constructor.bun,
    ingredients.constructor.bun];

    const { accessToken, refreshToken, expiration } = auth;

    const getOrder = accessToken => fetchCreateOrder({ ingredientsIds, accessToken })
        .then((dataFetch) => {
            dispatch({ type: GET_ORDER_SUCCESS, orderId: dataFetch?.order.number || 0 });
        })
        .then(() => {
            dispatch({ type: DELETE_ALL_FROM_CONSTRUCTOR });
            dispatch({ type: CLEAR_ALL_INGREDIENTS });
        })
        .catch(error => {
            dispatch({ type: GET_ORDER_FAILED, errorText: error });
        });

    return getActualAccessToken(dispatch, { accessToken, expiration, refreshToken })
        .then(getOrder)
        .catch(error => dispatch({ type: GET_ORDER_FAILED, errorText: error }));
}

//РЕГИСТРАЦИЯ и АВТОРИЗАЦИЯ

function dispatchUserInfo(dispatch, { accessToken, refreshToken, user }) {

    dispatch({
        type: AUTH_SET_NEW_TOKEN,
        accessToken: accessToken.split('Bearer ')[1],
        refreshToken
    });

    dispatch({ type: AUTH_SET_USER_INFO, user });
    dispatch({ type: AUTH_SUCCESS });
}

//Создать нового пользователя
export const registerNewUser = form => dispatch => {

    dispatch({ type: AUTH_REQUEST });

    fetchRegister(form)
        .then(res => dispatchUserInfo(dispatch, res))
        .catch(error => dispatch({ type: AUTH_FAILED, error }));
}

//Авторизация
export const signIn = form => dispatch => {

    dispatch({ type: AUTH_REQUEST });
    return fetchSignIn(form)
        .then(res => dispatchUserInfo(dispatch, res))
        .catch(error => dispatch({ type: AUTH_FAILED, error }));
}

//Получить данные пользователя
export const getUser = () => (dispatch, getState) => {
    
    const { auth } = getState();

    if (!auth.refreshToken) return Promise.resolve('RefreshToken не найден');

    dispatch({ type: AUTH_REQUEST });

    return getActualAccessToken(dispatch, auth)
        .then(fetchUser)
        .then(res => {

            const user = {
                email: res.user.email,
                name: res.user.name
            };

            dispatch({ type: AUTH_SET_USER_INFO, user });
            dispatch({ type: AUTH_SUCCESS});
        })
        .catch(error => {
            dispatch({ type: AUTH_FAILED, error });
            dispatch({ type: AUTH_RESET_ERROR });
        });
}

//Обновить данные пользователя
export const updateUser = form => (dispatch, getState) => {

    dispatch({ type: AUTH_UPDATE_REQUEST });

    const { auth } = getState();

    return getActualAccessToken(dispatch, auth)
        .then(accessToken => fetchUpdateUser(form, accessToken))
        .then(res => {

            const user = {
                email: res.user.email,
                name: res.user.name
            };

            dispatch({ type: AUTH_UPDATE_SUCCESS, user });

        })
        .catch(error => dispatch({ type: AUTH_UPDATE_FAILED, error }));
}

function getActualAccessToken(dispatch, { accessToken, expiration, refreshToken }) {

    if (!refreshToken) {
        return Promise.reject('Отсутствует refreshToken');
    }

    if ((new Date() - new Date(expiration)) < 0) { // токен действует
        return Promise.resolve(accessToken);
    }

    //обновить токен
    return fetchRefreshToken(refreshToken)
        .then(res => {

            const auth = {
                accessToken: res.accessToken.split('Bearer ')[1],
                refreshToken: res.refreshToken
            };

            dispatch({ type: AUTH_SET_NEW_TOKEN, ...auth });

            return auth.accessToken;
        })
}

export const logOut = refreshToken => dispatch => {

    dispatch({ type: AUTH_LOGOUT_REQUEST });

    return fetchLogOut(refreshToken)
        .then(() => dispatch({ type: AUTH_LOGOUT_SUCCESS }))
        .catch(error => dispatch({ type: AUTH_LOGOUT_FAILED, error }));
}

//ACTION CREATORS

export function increaseIngredient({ id }) {
    return { type: INCREASE_INGREDIENT, id };
}

export function addToConstructor({ id, itemKey }) {
    return { type: ADD_TO_CONSTRUCTOR, ...{ id, itemKey } };
}

export function decreaseIngredient({ id }) {
    return { type: DECREASE_INGREDIENT, id };
}

export function deleteFromConstructor({ id, itemKey }) {
    return { type: DELETE_FROM_CONSTRUCTOR, ...{ id, itemKey } };
}

export function moveConstructorElement({ fromId, toId }) {
    return { type: MOVE_INGREDIENTS_CONSTRUCTOR, ...{ fromId, toId } };
}