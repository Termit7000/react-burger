import {
    fetchRegister,
    fetchSignIn,
    fetchRefreshToken,
    fetchUser,
    fetchLogOut,
    fetchUpdateUser
} from "../../utils/api";

import { 
    AUTH_SET_NEW_TOKEN, 
    AUTH_SET_USER_INFO, 
    AUTH_SUCCESS, 
    AUTH_REQUEST, 
    AUTH_FAILED, 
    AUTH_RESET_ERROR, 
    AUTH_UPDATE_REQUEST, 
    AUTH_UPDATE_SUCCESS, 
    AUTH_UPDATE_FAILED, 
    AUTH_LOGOUT_REQUEST, 
    AUTH_LOGOUT_SUCCESS, 
    AUTH_LOGOUT_FAILED } from "./index";

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
};
//Авторизация

export const signIn = form => dispatch => {

    dispatch({ type: AUTH_REQUEST });
    return fetchSignIn(form)
        .then(res => dispatchUserInfo(dispatch, res))
        .catch(error => dispatch({ type: AUTH_FAILED, error }));
};
//Получить данные пользователя

export const getUser = () => (dispatch, getState) => {

    const { auth } = getState();

    if (!auth.refreshToken)
        return Promise.resolve('RefreshToken не найден');

    dispatch({ type: AUTH_REQUEST });

    return getActualAccessToken(dispatch, auth)
        .then(fetchUser)
        .then(res => {

            const user = {
                email: res.user.email,
                name: res.user.name
            };

            dispatch({ type: AUTH_SET_USER_INFO, user });
            dispatch({ type: AUTH_SUCCESS });
        })
        .catch(error => {
            dispatch({ type: AUTH_FAILED, error });
            dispatch({ type: AUTH_RESET_ERROR });
        });
};
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
};
export function getActualAccessToken(dispatch, { accessToken, expiration, refreshToken }) {

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
        });
}

export const logOut = refreshToken => dispatch => {

    dispatch({ type: AUTH_LOGOUT_REQUEST });

    return fetchLogOut(refreshToken)
        .then(() => dispatch({ type: AUTH_LOGOUT_SUCCESS }))
        .catch(error => dispatch({ type: AUTH_LOGOUT_FAILED, error }));
};
