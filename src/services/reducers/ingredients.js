import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    OPEN_INGREDIENT_DETAILS,
    CLOSE_INGREDIENT_DETAILS
} from "../actions"

const initialState = {
    requestInProgress: false,
    requestFailed: false,
    errorText: '',
    items: [],

    isDatailsOpen: false,
    ingredientId: ''
};

export const ingredientsReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_INGREDIENTS_REQUEST:
            return { ...state, requestInProgress: true };

        case GET_INGREDIENTS_FAILED:
            return { ...state, requestInProgress: false, requestFailed: true, errorText: action.errorText };

        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                requestInProgress: false,
                requestFailed: false,
                items: action.ingredients.map(el => ({ ...el, count: 0 }))
            };

        case OPEN_INGREDIENT_DETAILS:
            return { ...state, isDatailsOpen: true, ingredientId: action.ingredientId };

        case CLOSE_INGREDIENT_DETAILS:
            return { ...state, isDatailsOpen: false, ingredientId: '' };

        default:
            return state
    }
}