import { 
    BASE_URL,  
    URL_SERVICE_INGREDIENTS, 
    URL_SEVICE_ORDER, 
    URL_REGISTER, 
    URL_SIGN_IN, 
    URL_REFRESH_TOKEN, 
    URL_FORGOT_PASSWORD } from "./constants";

export function getIngredients() {
    return fetchRequest(BASE_URL + URL_SERVICE_INGREDIENTS, { method: 'GET' });
}

export function createOrder({ ingredients }) {

    return fetchRequest(BASE_URL + URL_SEVICE_ORDER, {
        method: 'POST',
        body: JSON.stringify({ingredients})
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

//Обновление токена
export function fetchRefreshToken(refreshToken) {
    return fetchRequest(BASE_URL + URL_REFRESH_TOKEN, {
        method: 'POST',        
        body: JSON.stringify({token: refreshToken})
    });
}
//СЕРВИСНЫЕ ФУНКЦИИ

function fetchRequest(urlService, { method, body = undefined }) {

    return fetch(urlService, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
        .then(response => {

            if (response.ok) return response.json();
            return response.text().then(text => Promise.reject(text));
        });
}

