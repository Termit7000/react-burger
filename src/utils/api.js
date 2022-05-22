import { BASE_URL,  URL_SERVICE_INGREDIENTS, URL_SEVICE_ORDER, URL_REGISTER } from "./constants";

export function getIngredients() {
    return fetchRequest(BASE_URL + URL_SERVICE_INGREDIENTS, { method: 'GET' });
}

export function createOrder({ ingredients }) {

    return fetchRequest(BASE_URL + URL_SEVICE_ORDER, {
        method: 'POST',
        body: JSON.stringify({ingredients})
    });
}

//Авторизация
export function fetchRegister(form) {

    return fetchRequest(BASE_URL+URL_REGISTER, {
        method: 'POST',
        body: JSON.stringify(form)
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

