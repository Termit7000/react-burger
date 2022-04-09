import { createOrder, getIngredients } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export const MOVE_INGREDIENTS_CONSTRUCTOR = 'MOVE_INGREDIENTS_CONSTRUCTOR';

export const OPEN_INGREDIENT_DETAILS = 'OPEN_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CLOSE_MODAL_ORDER = 'CLOSE_MODAL_ORDER';

export const getIngredientsItems = () => dispatch => {

    dispatch({ type: GET_INGREDIENTS_REQUEST })

    getIngredients()
        .then((dataFetch) => {
            dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: dataFetch.data });
        })
        .catch(error => dispatch({ type: GET_INGREDIENTS_FAILED, errorText: error }));
}


/**
 * Создание заказа
 */
export const getOrderNumber = () => ( dispatch, getState ) => {

    dispatch({ type: GET_ORDER_REQUEST });

    const state = getState().ingredients;

    const ingredients = [...state.constructor.ingredients.map(el=>el._id), state.constructor.bun, state.constructor.bun];

    createOrder({ ingredients })
        .then((dataFetch) => {
            dispatch({ type: GET_ORDER_SUCCESS, orderId: dataFetch?.order.number || 0 });
        })
        .catch(error => {
            dispatch({ type: GET_ORDER_FAILED, errorText: error });
        });
}

