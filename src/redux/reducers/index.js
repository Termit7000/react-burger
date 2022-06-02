import { combineReducers } from "redux";

import { authReducer } from "./auth.js";
import { ingredientsReducer } from "./ingredients.js";
import { orderReducer } from "./order.js";
import { wsSocketReducer } from "./wsSocket.js";

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    auth: authReducer,
    wsSocket: wsSocketReducer
});

export default rootReducer; 