
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
    return validateEmail.checkEmailInputElement.validity.valid;
}