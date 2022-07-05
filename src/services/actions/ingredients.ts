import { TConstructorItem, TIngredients } from "../types";

import { 
    GET_INGREDIENTS_REQUEST, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED,
    INCREASE_INGREDIENT,
    ADD_TO_CONSTRUCTOR,
    DECREASE_INGREDIENT,
    DELETE_FROM_CONSTRUCTOR,
    MOVE_INGREDIENTS_CONSTRUCTOR,
    CLEAR_ALL_INGREDIENTS,
    DELETE_ALL_FROM_CONSTRUCTOR
 } from "../action-types";

type TId = {
    id: string;
}

type TFromToId = { 
    fromId: string, 
    toId: string 
}

interface IRequestIngredients {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

interface IRequestIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: ReadonlyArray<TIngredients>;
}

interface IRequestIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
    readonly errorText: string;
}

interface IIncreaseIngredient extends TId  {
    readonly type: typeof INCREASE_INGREDIENT;    
}

interface IAddToConstructor extends TConstructorItem {
    readonly type: typeof ADD_TO_CONSTRUCTOR;
}

interface IDecreaseIngredient extends TId {
    readonly type: typeof DECREASE_INGREDIENT;
}

interface IDeleteFromConstructor extends TConstructorItem {
    readonly type: typeof DELETE_FROM_CONSTRUCTOR;
}

interface IMoveConstructorElement extends TFromToId {
    readonly type: typeof MOVE_INGREDIENTS_CONSTRUCTOR;
}

interface IClearAllIngredients {
    readonly type: typeof CLEAR_ALL_INGREDIENTS;
}

interface IDeleteAllFromConstructor {
    readonly type: typeof DELETE_ALL_FROM_CONSTRUCTOR;
}

export type TIngredientsAction = 
    | IRequestIngredients
    | IRequestIngredientsSuccess
    | IRequestIngredientsFailed
    | IIncreaseIngredient
    | IAddToConstructor
    | IDecreaseIngredient
    | IDeleteFromConstructor
    | IMoveConstructorElement
    | IClearAllIngredients
    | IDeleteAllFromConstructor;

//ACTION CREATORS

export function requestIngredients(): IRequestIngredients{
    return {type: GET_INGREDIENTS_REQUEST};
}

export function requestIngredientsSuccess({ingredients}:{ingredients: TIngredients[]}): IRequestIngredientsSuccess {
    return {type: GET_INGREDIENTS_SUCCESS, ingredients };
}

export function requestIngredientsFailed({errorText}: {errorText: string}): IRequestIngredientsFailed {
    return {type: GET_INGREDIENTS_FAILED, errorText};
}

export function increaseIngredient({ id }: TId): IIncreaseIngredient{
    return { type: INCREASE_INGREDIENT, id };
}

export function addToConstructor({ id, itemKey }: TConstructorItem) : IAddToConstructor {
    return { type: ADD_TO_CONSTRUCTOR, ...{ id, itemKey } };
}

export function decreaseIngredient({ id }: TId): IDecreaseIngredient {
    return { type: DECREASE_INGREDIENT, id };
}

export function deleteFromConstructor({ id, itemKey }: TConstructorItem): IDeleteFromConstructor {
    return { type: DELETE_FROM_CONSTRUCTOR, ...{ id, itemKey } };
}

export function moveConstructorElement({ fromId, toId }: TFromToId): IMoveConstructorElement {
    return { type: MOVE_INGREDIENTS_CONSTRUCTOR, ...{ fromId, toId } };
}

export function deleteAllFromConstructor(): IDeleteAllFromConstructor {
    return {type: DELETE_ALL_FROM_CONSTRUCTOR};
}

export function resetAllCounts(): IClearAllIngredients {
    return {type: CLEAR_ALL_INGREDIENTS};
}