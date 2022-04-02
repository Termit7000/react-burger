import { URL_SERVICE_INGREDIENTS, URL_SEVICE_ORDER } from "./constants";


export function getIngredients() {
    return fetchRequest(URL_SERVICE_INGREDIENTS, { method: 'GET' });
}

export function createOrder({ ingredients }) {

    return fetchRequest(URL_SEVICE_ORDER, {
        method: 'POST',
        body: JSON.stringify(ingredients)
    });
}

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