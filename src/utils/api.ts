import { 
    TEmail, 
    TIngredients, 
    TLogin, 
    TUserInfo, 
    TOrder, 
    TResetPass, 
    TTokens, 
    TUser, 
    TUserWitnTokens } from "../services/types";

import { 
    BASE_URL,  
    URL_SERVICE_INGREDIENTS, 
    URL_SEVICE_ORDER, 
    URL_REGISTER, 
    URL_SIGN_IN, 
    URL_REFRESH_TOKEN, 
    URL_FORGOT_PASSWORD, 
    URL_RESET_PASSWORD,
    URL_USER_INFO,
    URL_LOGOUT,
    URL_UPDATE_USER} from "./constants";


export function getIngredients(): Promise<{data: TIngredients[]}> {
    return fetchRequest(BASE_URL + URL_SERVICE_INGREDIENTS, { method: 'GET' });
}

type TCreateOrder = ({ingredientsIds, accessToken}:{ingredientsIds: string[], accessToken: string}) => Promise<{order:TOrder}>;
export const fetchCreateOrder:TCreateOrder = ({ ingredientsIds, accessToken }) => {

    return fetchRequest(BASE_URL + URL_SEVICE_ORDER, {
        method: 'POST',
        body: JSON.stringify({ingredients: ingredientsIds}),
        accessToken
    });
}

//Регистрация нового пользователя
export function fetchRegister(form: TUserInfo): Promise<TUserWitnTokens> {

    return fetchRequest(BASE_URL+URL_REGISTER, {
        method: 'POST',
        body: JSON.stringify(form)
    });
}

//Авторизация существующего пользователя
export function fetchSignIn(form: TLogin): Promise<TUserWitnTokens> {
    return fetchRequest(BASE_URL + URL_SIGN_IN, {
        method: 'POST',        
        body: JSON.stringify(form)
    });
}

//Восстановление пароля
export function fetchForgotPassword(form:TEmail) {
    return fetchRequest(BASE_URL + URL_FORGOT_PASSWORD, {
        method: 'POST',        
        body: JSON.stringify(form)
    });
}

//Сброс пароля
export function fetchResetPassword(form:TResetPass) {
    return fetchRequest(BASE_URL + URL_RESET_PASSWORD, {
        method: 'POST',        
        body: JSON.stringify(form)
    });
}

//Обновление токена
export function fetchRefreshToken(refreshToken:string): Promise<TTokens> {
    return fetchRequest(BASE_URL + URL_REFRESH_TOKEN, {
        method: 'POST',        
        body: JSON.stringify({token: refreshToken})
    });
}

//Данные пользователя
export function fetchUser(accessToken: string): Promise<{user:TUser}> {

    return fetchRequest(BASE_URL + URL_USER_INFO, {
        method: 'GET',  
        accessToken              
    });
}

//LOGOUT
export function fetchLogOut(refreshToken:string) {
    
    return fetchRequest(BASE_URL + URL_LOGOUT, {
        method: 'POST',        
        body: JSON.stringify({token: refreshToken})
    });
}

//update user
export function fetchUpdateUser(form:TUserInfo, accessToken:string): Promise<{user:TUser}> {

    return fetchRequest(BASE_URL+URL_UPDATE_USER, {
        method: 'PATCH',
        accessToken,
        body: JSON.stringify(form)        
    });
}


//СЕРВИСНЫЕ ФУНКЦИИ

type TFetch = <R=void>(
    urlService: string, 
    { method, body, accessToken} : {method: 'GET' | 'PATCH' | 'POST', body?: string, accessToken?:string}
    ) 
    => Promise<R>;

const fetchRequest:TFetch = (urlService, { method, body = undefined, accessToken='' } ) => {

    const headers: {'Content-Type':string, 'Authorization'?:string} = {
        'Content-Type': 'application/json'
    };

    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`
    }
    
    return fetch(urlService, {
        method,
        headers,
        body
    })
        .then(response => {

            if (response.ok) return response.json();
            return response.text().then(text => Promise.reject(text));
        });
}

