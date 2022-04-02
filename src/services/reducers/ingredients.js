import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from "../actions"

const initialState = {
    requestInProgress: false,
    requestFailed: false,
    errorText: '',
    ingredients: []
};

export const ingredientsReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case GET_INGREDIENTS_REQUEST:
            return { ...state, requestInProgress: true };

        case GET_INGREDIENTS_FAILED:
            return { ...state, requestInProgress: false, requestFailed: true, errorText: action.errorText };

        case GET_INGREDIENTS_SUCCESS: 
            return { ...state, requestInProgress: false, requestFailed: false, ingredients: action.ingredients };
        
        default:
            return state
    }
}