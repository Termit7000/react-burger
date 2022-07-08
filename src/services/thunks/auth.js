import {
    fetchRegister,
    fetchSignIn,
    fetchRefreshToken,
    fetchUser,
    fetchLogOut,
    fetchUpdateUser
} from "../../utils/api";

import { 
    requestAuth,
    requestAuthFailed,
    requestAuthSuccess, 
    requestAuthUpdate, 
    requestAuthUpdateSuccess, 
    reqestAuthUpdateFailed,
    requestLogOut, 
    requestLogOutFailed, 
    requestLogOutSuccess, 
    resetRequestError, 
    setToken, 
    setUserInfo } from "../actions";

//РЕГИСТРАЦИЯ и АВТОРИЗАЦИЯ
function dispatchUserInfo(dispatch, { accessToken, refreshToken, user }) {

    dispatch(setToken({
        accessToken: accessToken.split('Bearer ')[1],
        refreshToken}));

   dispatch(setUserInfo(user));
   dispatch(requestAuthSuccess());
}
//Создать нового пользователя

export const registerNewUser = form => dispatch => {

    dispatch(requestAuth());

    fetchRegister(form)
        .then(res => dispatchUserInfo(dispatch, res))
        .catch(error => dispatch(requestAuthFailed({error})));
};

//Авторизация
export const signIn = form => dispatch => {

    dispatch(requestAuth());
    return fetchSignIn(form)
        .then(res => dispatchUserInfo(dispatch, res))
        .catch(error => dispatch(requestAuthFailed({error})));
};

//Получить данные пользователя
export const getUser = () => (dispatch, getState) => {

    const { auth } = getState();

    if (!auth.refreshToken)
        return Promise.resolve('RefreshToken не найден');

    dispatch(requestAuth());

    return getActualAccessToken(dispatch, auth)
        .then(fetchUser)
        .then(res => {

            const user = {
                email: res.user.email,
                name: res.user.name
            };

            dispatch(setUserInfo(user));
            dispatch(requestAuthSuccess());
        })
        .catch(error => {
            dispatch(requestAuthFailed({error}));
            dispatch(resetRequestError());
        });
};

//Обновить данные пользователя
export const updateUser = form => (dispatch, getState) => {

    dispatch(requestAuthUpdate());

    const { auth } = getState();

    return getActualAccessToken(dispatch, auth)
        .then(accessToken => fetchUpdateUser(form, accessToken))
        .then(res => {

            const user = {
                email: res.user.email,
                name: res.user.name
            };

            dispatch(requestAuthUpdateSuccess(user));

        })
        .catch(error => dispatch(reqestAuthUpdateFailed(error)));
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

            dispatch(setToken({...auth}));

            return auth.accessToken;
        });
}

export const logOut = refreshToken => dispatch => {

    dispatch(requestLogOut());

    return fetchLogOut(refreshToken)
        .then(() => dispatch(requestLogOutSuccess()))
        .catch(error => dispatch(requestLogOutFailed(error)));
};
