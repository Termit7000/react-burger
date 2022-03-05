import { URL_SERVICE } from "../../utils/constants";


export function getIngredients() {
    return fetch(URL_SERVICE)
        .then(response=>{
                      
            if (response.ok) {
                return response.json();
            }            
            
            return Promise.reject(`Не удалось выполнить запрос к серверу ${response.statusText}`);            
        });
}