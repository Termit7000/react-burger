import { TTokens, TUser } from "../types";

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
    AUTH_UPDATE_REQUEST,
    AUTH_UPDATE_SUCCESS} from "../action-types";

export interface IRequestAuth {
    readonly type: typeof AUTH_REQUEST;
}

interface IRequestAuthFailed {
    readonly type: typeof AUTH_FAILED;
    readonly error: string;
}

export interface IResetRequestError {
    readonly type: typeof AUTH_RESET_ERROR;
}

export interface IRequestAuthSuccess {
    readonly type: typeof AUTH_SUCCESS;
}

export interface ISetToken {
    readonly type: typeof AUTH_SET_NEW_TOKEN;
    readonly accessToken: string;
    readonly refreshToken: string;
}

export interface IRequestAuthUpdate {
    readonly type: typeof AUTH_UPDATE_REQUEST;
}

export interface IRequestAuthUpdateSuccess {
    readonly type: typeof AUTH_UPDATE_SUCCESS;
    readonly user: TUser;
}

export interface ISetUserInfo {
    readonly type: typeof AUTH_SET_USER_INFO;
    readonly user: TUser;
}

export interface IReqestAuthUpdateFailed {
    readonly type: typeof AUTH_UPDATE_FAILED;
    readonly error: string;
}

export interface IRequestLogOut {
    readonly type: typeof AUTH_LOGOUT_REQUEST;
}

export interface IRequestLogOutSuccess {
    readonly type: typeof AUTH_LOGOUT_SUCCESS;
}

export interface IRequestLogOutFailed {
    readonly type: typeof AUTH_LOGOUT_FAILED;
    readonly error: string;    
}

export type TAuthActions = 
    | IRequestAuth
    | IRequestAuthFailed
    | IResetRequestError
    | IRequestAuthSuccess
    | ISetToken
    | IRequestAuthUpdate
    | IRequestAuthUpdateSuccess
    | ISetUserInfo
    | IReqestAuthUpdateFailed
    | IRequestLogOut
    | IRequestLogOutSuccess
    | IRequestLogOutFailed;

//Авторизация
export function requestAuth(): IRequestAuth {
    return {type: AUTH_REQUEST};
}

export function requestAuthFailed({error}:{error: string}): IRequestAuthFailed {
    return {type: AUTH_FAILED, error};
}

export function resetRequestError(): IResetRequestError {
    return {type: AUTH_RESET_ERROR};
}

export function requestAuthSuccess(): IRequestAuthSuccess {
    return {type: AUTH_SUCCESS};
}

//Установка токена
export function setToken({ accessToken, refreshToken }:TTokens):ISetToken {
    return {
        type: AUTH_SET_NEW_TOKEN,
        accessToken,
        refreshToken };
}
           
//Обновление пользователя
export function requestAuthUpdate(): IRequestAuthUpdate {
    return {type: AUTH_UPDATE_REQUEST};
}

export function requestAuthUpdateSuccess({user}: {user:TUser}):IRequestAuthUpdateSuccess {
    return {type: AUTH_UPDATE_SUCCESS, user};
}

export function reqestAuthUpdateFailed({error}:{error: string}): IReqestAuthUpdateFailed {
    return {type: AUTH_UPDATE_FAILED, error};
}

export function setUserInfo({user}:{user:TUser}): ISetUserInfo {
    return {type: AUTH_SET_USER_INFO, user};
}

//Выход из системы
export function requestLogOut():IRequestLogOut {
    return {type: AUTH_LOGOUT_REQUEST};
}

export function requestLogOutSuccess(): IRequestLogOutSuccess {
    return {type: AUTH_LOGOUT_SUCCESS};
}

export function requestLogOutFailed({error}:{error: string}): IRequestLogOutFailed {
    return {type: AUTH_LOGOUT_FAILED, error};
}