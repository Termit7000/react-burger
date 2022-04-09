

import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    OPEN_INGREDIENT_DETAILS,
    CLOSE_INGREDIENT_DETAILS
} from "../actions"

const initialState = {
    requestInProgress: false,
    requestFailed: false,
    errorText: '',
    items: [],

    constructor: {
        ingredients: [],
        bun: null,
    },

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

        case ADD_INGREDIENT: {

            const item = state.items.find(el=>el._id === action.id);
            if (!item) return state;

            const newState = {...state};

            if (item.type === 'bun') {               
                newState.constructor.bun = item._id;
                newState.items = newState.items.map(el=>el.type==='bun' ? {...el, count:0} : el);
            } else {
                newState.constructor.ingredients.push({key: item._id + (new Date()).getTime(),  id: item._id});
            }

            newState.items = [...newState.items.map(el => el._id === action.id ? { ...el, count: ++el.count } : el)];

           return newState;
        }

        case DELETE_INGREDIENT: {
                        
            const newState = {...state};
            newState.items = [...state.items.map(el=>el._id===action.id ? {...el, count: --el.count} : el)];
            newState.constructor.ingredients = [...newState.constructor.ingredients.filter(el=>el.key!==action.key)];            
            
            return newState;
        }

        default:
            return state
    }
}