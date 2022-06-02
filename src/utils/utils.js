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
export function parseToken(jwt) {

    if (!jwt) return null;

    return JSON.parse(window.atob(jwt.split('.')[1]));
}

/**
 * получает описание кода ошибки, согласно 
 * https://www.rfc-editor.org/rfc/rfc6455#section-7.4.1
 * @param {Number} code 
 */
export function getErrorDescriptionByCodeEvent(code) {

    switch (code) {
        case 1000: return "Normal closure, meaning that the purpose for which the connection was established has been fulfilled.";
        case 1001: return "An endpoint is \"going away\", such as a server going down or a browser having navigated away from a page.";
        case 1002: return "An endpoint is terminating the connection due to a protocol error";
        case 1003: return "An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message:.";
        case 1004: return "Reserved. The specific meaning might be defined in the future.";
        case 1005: return "No status code was actually present.";
        case 1006: return "The connection was closed abnormally, e.g., without sending or receiving a Close control frame";
        case 1007: return "An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [https://www.rfc-editor.org/rfc/rfc3629] data within a text message:.";
        case 1008: return "An endpoint is terminating the connection because it has received a message that \"violates its policy\". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.";
        case 1009: return "An endpoint is terminating the connection because it has received a message that is too big for it to process.";
        case 1010: return "An endpoint (client: is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. ";
        case 1011: return "A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.";
        case 1015: return "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified:.";
        default: return "Unknown reason";
    }
}

