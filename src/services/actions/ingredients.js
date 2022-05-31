import { getIngredients } from "../../utils/api";

import { 
    GET_INGREDIENTS_REQUEST, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED,
    INCREASE_INGREDIENT,
    ADD_TO_CONSTRUCTOR,
    DECREASE_INGREDIENT,
    DELETE_FROM_CONSTRUCTOR,
    MOVE_INGREDIENTS_CONSTRUCTOR
 } from "./index";


export const getIngredientsItems = () => dispatch => {

    dispatch({ type: GET_INGREDIENTS_REQUEST });

    getIngredients()
        .then((dataFetch) => {
            dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: dataFetch.data });
        })
        .catch(error => dispatch({ type: GET_INGREDIENTS_FAILED, errorText: error }));
};


//ACTION CREATORS

export function increaseIngredient({ id }) {
    return { type: INCREASE_INGREDIENT, id };
}

export function addToConstructor({ id, itemKey }) {
    return { type: ADD_TO_CONSTRUCTOR, ...{ id, itemKey } };
}

export function decreaseIngredient({ id }) {
    return { type: DECREASE_INGREDIENT, id };
}

export function deleteFromConstructor({ id, itemKey }) {
    return { type: DELETE_FROM_CONSTRUCTOR, ...{ id, itemKey } };
}

export function moveConstructorElement({ fromId, toId }) {
    return { type: MOVE_INGREDIENTS_CONSTRUCTOR, ...{ fromId, toId } };
}