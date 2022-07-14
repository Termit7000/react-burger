
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

import { 
    AppDispatch, 
    AppThunk, 
    TLogin, 
    TUserInfo, 
    TTokens, 
    TUserWitnTokens } from "../types";

//РЕГИСТРАЦИЯ и АВТОРИЗАЦИЯ
function  dispatchUserInfo(dispatch: AppDispatch, { accessToken, refreshToken, user }:TUserWitnTokens): void {

    dispatch(setToken({
        accessToken: accessToken.split('Bearer ')[1],
        refreshToken}));

   dispatch(setUserInfo(user));
   dispatch(requestAuthSuccess());
}
//Создать нового пользователя

type TregisterNewUser = (form: TUserInfo)=>(dispatch:AppDispatch) =>void;
export const registerNewUser: AppThunk = (form: TUserInfo) => dispatch => {

    dispatch(requestAuth());

    fetchRegister(form)
        .then(res => dispatchUserInfo(dispatch, res))
        .catch(error => dispatch(requestAuthFailed({error})));
};

//Авторизация
export const signIn: AppThunk = (form:TLogin) => (dispatch: AppDispatch) => {
    dispatch(requestAuth());
    return fetchSignIn(form)
        .then(res => dispatchUserInfo(dispatch, res))
        .catch(error => dispatch(requestAuthFailed({error})));
};

//Получить данные пользователя
export const getUser: AppThunk = () => (dispatch: AppDispatch, getState) => {

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
type TUpdateUserProps = {
    email: string;
    password: string;
    name: string;
}
export const updateUser: AppThunk = (form:TUpdateUserProps) => (dispatch: AppDispatch, getState) => {

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

type TAccessTokenWithExp = TTokens & { expiration: number };

export function getActualAccessToken(dispatch: AppDispatch, { accessToken, expiration, refreshToken }: TAccessTokenWithExp): Promise<string> {

    if (!refreshToken) {
        return Promise.reject('Отсутствует refreshToken');
    }

    const now = (new Date()).getTime();
    const expDate = (new Date(expiration)).getTime();

    if (  now - expDate  < 0) { // токен действует
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

export const logOut: AppThunk = (refreshToken: string) => (dispatch: AppDispatch) => {

    dispatch(requestLogOut());

    return fetchLogOut(refreshToken)
        .then(() => dispatch(requestLogOutSuccess()))
        .catch(error => dispatch(requestLogOutFailed(error)));
};
