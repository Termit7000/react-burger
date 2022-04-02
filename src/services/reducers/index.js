import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients.js";
import { orderReducer } from "./burgerConstructor.js";

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer
});


export default rootReducer;