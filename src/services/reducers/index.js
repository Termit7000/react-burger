import { combineReducers } from "redux";
import { authReducer } from "./auth.js";
import { ingredientsReducer } from "./ingredients.js";
import { orderReducer } from "./order.js";

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    auth: authReducer
});


export default rootReducer; 