/**
 * 
 * @param {String} email - текст для проверки 
 * @returns {Boolean} - true - если переданный текст является валидным e-mail
 */
export const validateEmail = email => {

    if (!validateEmail.checkEmailInputElement) {

        validateEmail.checkEmailInputElement = document.createElement('input');
        validateEmail.checkEmailInputElement.setAttribute('type', 'email');
    }
    validateEmail.checkEmailInputElement.value = email;    
    return Boolean(validateEmail.checkEmailInputElement.validity.valid && email);
}

/**
 * Парсит переданный токен
 * @param {String} jwt 
 * @returns Объект из переданного токена
 */
export function parse(jwt) {
    return JSON.parse(window.atob(jwt.split('.')[1]));
}



