import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients.js";
import { orderReducer } from "./order.js";

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer
});


export default rootReducer; 