import { AppDispatch, AppThunk } from "../types";
import { getIngredients } from "../../utils/api";

import { 
    requestIngredients, 
    requestIngredientsFailed, 
    requestIngredientsSuccess } from "../actions";

export const getIngredientsItems: AppThunk = () => (dispatch: AppDispatch) => {

    dispatch(requestIngredients());    

    getIngredients()
        .then((dataFetch) => {
            dispatch( requestIngredientsSuccess(dataFetch.data));
        })
        .catch(errorText => dispatch(requestIngredientsFailed(errorText)));
};