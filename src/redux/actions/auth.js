import { 
    AUTH_FAILED,
    AUTH_LOGOUT_FAILED,
    AUTH_LOGOUT_REQUEST,
    AUTH_LOGOUT_SUCCESS,
    AUTH_REQUEST,
    AUTH_RESET_ERROR,
    AUTH_SET_NEW_TOKEN,
    AUTH_SET_USER_INFO, 
    AUTH_SUCCESS, 
    AUTH_UPDATE_FAILED, 
    AUTH_UPDATE_REQUEST} from "../action-types";

//Авторизация
export function requestAuth() {
    return {type: AUTH_REQUEST};
}

export function requestAuthFailed({error}) {
    return {type: AUTH_FAILED, error};
}

export function resetRequestError() {
    return {type: AUTH_RESET_ERROR};
}

export function requestAuthSuccess() {
    return {type: AUTH_SUCCESS};
}

//Установка токена
export function setToken({ accessToken, refreshToken }) {
    return {
        type: AUTH_SET_NEW_TOKEN,
        accessToken,
        refreshToken };
}
           
//Обновление пользователя
export function requestAuthUpdate() {
    return {type: AUTH_UPDATE_REQUEST};
}

export function requestAuthUpdateSuccess({user}) {
    return {type: AUTH_UPDATE_REQUEST, user};
}

export function reqestAuthUpdateFailed({error}) {
    return {type: AUTH_UPDATE_FAILED, error};
}

export function setUserInfo({user}) {
    return {type: AUTH_SET_USER_INFO, user};
}

//Выход из системы
export function requestLogOut() {
    return {type: AUTH_LOGOUT_REQUEST};
}

export function requestLogOutSuccess() {
    return {type: AUTH_LOGOUT_SUCCESS};
}

export function requestLogOutFailed({error}) {
    return {type: AUTH_LOGOUT_FAILED, error};
}