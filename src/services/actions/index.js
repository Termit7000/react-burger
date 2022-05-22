import { createOrder, getIngredients } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const INCREASE_INGREDIENT = 'INCREASE_INGREDIENT';
export const DECREASE_INGREDIENT = 'DECREASE_INGREDIENT';

export const CLEAR_ALL_INGREDIENTS = 'CLEAR_ALL_INGREDIENTS';

export const ADD_TO_CONSTRUCTOR = 'ADD_TO_CONSTRUCTOR';
export const DELETE_FROM_CONSTRUCTOR = 'DELETE_FROM_CONSTRUCTOR';
export const DELETE_ALL_FROM_CONSTRUCTOR = 'DELETE_ALL_FROM_CONSTRUCTOR';

export const MOVE_INGREDIENTS_CONSTRUCTOR = 'MOVE_INGREDIENTS_CONSTRUCTOR';

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

/**
 * Создание заказа
 */
export const getOrderNumber = () => ( dispatch, getState ) => {

    dispatch({ type: GET_ORDER_REQUEST });

    const state = getState().ingredients;

    const ingredients = [...state.constructor.ingredients.map(el=>el.id), state.constructor.bun, state.constructor.bun];

    createOrder({ ingredients })
        .then((dataFetch) => {
            dispatch({ type: GET_ORDER_SUCCESS, orderId: dataFetch?.order.number || 0 });                    
        })
        .then (()=>{
            dispatch({type: DELETE_ALL_FROM_CONSTRUCTOR});
            dispatch({type: CLEAR_ALL_INGREDIENTS});
        })
        .catch(error => {
            dispatch({ type: GET_ORDER_FAILED, errorText: error });
        });
}


//ACTION CREATORS

export function increaseIngredient({id}) {
    return { type: INCREASE_INGREDIENT, id };
}

export function addToConstructor({id, itemKey}) {
    return { type: ADD_TO_CONSTRUCTOR, ...{ id, itemKey } };
}

export function decreaseIngredient({id}) {
    return { type: DECREASE_INGREDIENT, id };
}

export function deleteFromConstructor({id, itemKey}) {
    return { type: DELETE_FROM_CONSTRUCTOR, ...{ id, itemKey } };
}

export function moveConstructorElement({fromId, toId}) {
    return {type: MOVE_INGREDIENTS_CONSTRUCTOR,...{fromId, toId}};
}