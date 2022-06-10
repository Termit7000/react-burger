import { getIngredients } from "../../utils/api";

import { 
    requestIngredients, 
    requestIngredientsFailed, 
    requestIngredientsSuccess } from "../actions";

export const getIngredientsItems = () => dispatch => {

    dispatch(requestIngredients());    

    getIngredients()
        .then((dataFetch) => {
            dispatch( requestIngredientsSuccess({ingredients: dataFetch.data }));
        })
        .catch(errorText => dispatch(requestIngredientsFailed({errorText})));
};