import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,

    INCREASE_INGREDIENT,
    DECREASE_INGREDIENT,
    CLEAR_ALL_INGREDIENTS,
    ADD_TO_CONSTRUCTOR,
    DELETE_FROM_CONSTRUCTOR,
    DELETE_ALL_FROM_CONSTRUCTOR,

    MOVE_INGREDIENTS_CONSTRUCTOR
} from "../actions"

const initialState = {
    requestInProgress: false,
    requestFailed: false,
    errorText: '',
    items: [],

    constructor: {
        ingredients: [],
        bun: null,
    }
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

        //Увеличить счетчик ингредиента
        case INCREASE_INGREDIENT: {

            const isBun = state.items.find(el=>el._id===action.id).type === 'bun';

            const items = [...state.items].map(el=>{
                
                //Сбросить счетчики у дргих булочек
                if (isBun && el._id!==action.id) {                    
                    return {...el, count:0};
                }

                return el._id===action.id ? {...el, count: ++el.count} : el;
            });

            return {...state, items};
        }

        //уменьшить счетчик ингридиента, булочка не можем быть уменьшена
        case DECREASE_INGREDIENT: {

            return {...state, items: state.items.map(el=>{
                return el._id===action.id ? {...el, count: --el.count} : el;
            })}
        }

        case ADD_TO_CONSTRUCTOR: {

            const item = state.items.find(el => el._id === action.id);
            if (!item) return state;

            const {constructor} = state;

            if (item.type === 'bun') {
                constructor.bun = item._id;
            }

            else {
                constructor.ingredients.push({ itemKey: item._id + Math.random(), id: item._id });
            }

            return {...state, constructor};

        }

        //удалить ингредиент из конструктора, булочка не может быть удалена
        case DELETE_FROM_CONSTRUCTOR: {
            
            const {constructor} = state;
            constructor.ingredients = constructor.ingredients.filter(el => el.itemKey !== action.itemKey);

            return {...state, constructor};
        }

        //DRAG And PROP
        case MOVE_INGREDIENTS_CONSTRUCTOR: {

            const items = state.constructor.ingredients;

            const dragIndex = items.findIndex(el => el.itemKey === action.fromId);
            const dragItem = items[dragIndex];

            items.splice(dragIndex,1);

            const hoverIndex = items.findIndex(el => el.itemKey === action.toId);

            const isMoveUp = dragIndex>hoverIndex;

            items.splice(hoverIndex+(isMoveUp ? 0 : 1), 0, dragItem);

            const constructor = {...state.constructor, ingredients: items};
            return {...state, constructor};          
        }

        case CLEAR_ALL_INGREDIENTS: 
            return {...state, items: state.items.map(el=>({...el, count:0}))};
       
        case DELETE_ALL_FROM_CONSTRUCTOR:
            return {...state, constructor: {ingredients:[], bun: null}};

        default:
            return state
    }
}