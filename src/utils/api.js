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
    URL_LOGOUT} from "./constants";

export function getIngredients() {
    return fetchRequest(BASE_URL + URL_SERVICE_INGREDIENTS, { method: 'GET' });
}

export function fetchCreateOrder({ ingredientsIds, accessToken }) {

    return fetchRequest(BASE_URL + URL_SEVICE_ORDER, {
        method: 'POST',
        body: JSON.stringify({ingredients: ingredientsIds}),
        accessToken
    });
}

//Регистрация нового пользователя
export function fetchRegister(form) {

    return fetchRequest(BASE_URL+URL_REGISTER, {
        method: 'POST',
        body: JSON.stringify(form)
    });
}

//Авторизация существующего пользователя
export function fetchSignIn(form) {
    return fetchRequest(BASE_URL + URL_SIGN_IN, {
        method: 'POST',        
        body: JSON.stringify(form)
    });
}

//Восстановление пароля
export function fetchForgotPassword(form) {
    return fetchRequest(BASE_URL + URL_FORGOT_PASSWORD, {
        method: 'POST',        
        body: JSON.stringify(form)
    });
}

//Сброс пароля
export function fetchResetPassword(form) {
    return fetchRequest(BASE_URL + URL_RESET_PASSWORD, {
        method: 'POST',        
        body: JSON.stringify(form)
    });
}

//Обновление токена
export function fetchRefreshToken(refreshToken) {
    return fetchRequest(BASE_URL + URL_REFRESH_TOKEN, {
        method: 'POST',        
        body: JSON.stringify({token: refreshToken})
    });
}

//Данные пользователя
export function fetchUser(accessToken) {

    return fetchRequest(BASE_URL + URL_USER_INFO, {
        method: 'GET',  
        accessToken              
    });
}

//LOGOUT
export function fetchLogOut(refreshToken) {
    
    return fetchRequest(BASE_URL + URL_LOGOUT, {
        method: 'POST',        
        body: JSON.stringify({token: refreshToken})
    });
}


//СЕРВИСНЫЕ ФУНКЦИИ

function fetchRequest(urlService, { method, body = undefined, accessToken='' }) {

    const headers = {
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

