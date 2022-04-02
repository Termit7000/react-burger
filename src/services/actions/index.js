import { createOrder, getIngredients } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const getIngredientsItems = () => dispatch => {

    dispatch({ type: GET_INGREDIENTS_REQUEST })

    getIngredients()
        .then((dataFetch) => {
            dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: dataFetch.data });
        })
        .catch(error => dispatch({ type: GET_INGREDIENTS_FAILED, errorText: error }));
}

export const getOrderNumber = (ingredients) => dispatch => {

    dispatch({ type: GET_ORDER_REQUEST });

    createOrder({ ingredients })
        .then((dataFetch) => {
            dispatch({ type: GET_ORDER_SUCCESS, orderId: dataFetch?.order.number || 0 });
        })
        .catch(error => {
            dispatch({ type: GET_ORDER_FAILED, errorText: error });
        });
}