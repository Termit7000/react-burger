import { 
    GET_INGREDIENTS_REQUEST, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED,
    INCREASE_INGREDIENT,
    ADD_TO_CONSTRUCTOR,
    DECREASE_INGREDIENT,
    DELETE_FROM_CONSTRUCTOR,
    MOVE_INGREDIENTS_CONSTRUCTOR
 } from "../action-types";

//ACTION CREATORS

export function requestIngredients(){
    return {type: GET_INGREDIENTS_REQUEST};
}

export function requestIngredientsSuccess({ingredients}) {
    return {type: GET_INGREDIENTS_SUCCESS, ingredients };
}

export function requestIngredientsFailed({errorText}) {
    return {type: GET_INGREDIENTS_FAILED, errorText};
}

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