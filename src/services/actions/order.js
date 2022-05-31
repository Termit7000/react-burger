import { fetchCreateOrder } from "../../utils/api";
import { getActualAccessToken } from "./auth";
import { 
    GET_ORDER_REQUEST, 
    GET_ORDER_SUCCESS, 
    DELETE_ALL_FROM_CONSTRUCTOR, 
    CLEAR_ALL_INGREDIENTS, 
    GET_ORDER_FAILED } from "./index";

/**
 * Создание заказа
 */
export const createOrder = () => (dispatch, getState) => {

    dispatch({ type: GET_ORDER_REQUEST });

    const { ingredients, auth } = getState();

    const ingredientsIds = [...ingredients.constructor.ingredients.map(el => el.id),
    ingredients.constructor.bun,
    ingredients.constructor.bun];

    const { accessToken, refreshToken, expiration } = auth;

    const getOrder = accessToken => fetchCreateOrder({ ingredientsIds, accessToken })
        .then((dataFetch) => {
            dispatch({ type: GET_ORDER_SUCCESS, orderId: dataFetch?.order.number || 0 });
        })
        .then(() => {
            dispatch({ type: DELETE_ALL_FROM_CONSTRUCTOR });
            dispatch({ type: CLEAR_ALL_INGREDIENTS });
        })
        .catch(error => {
            dispatch({ type: GET_ORDER_FAILED, errorText: error });
        });

    return getActualAccessToken(dispatch, { accessToken, expiration, refreshToken })
        .then(getOrder)
        .catch(error => dispatch({ type: GET_ORDER_FAILED, errorText: error }));
};
