import { combineReducers } from "redux";

import { authReducer } from "./auth.js";
import { ingredientsReducer } from "./ingredients.js";
import { orderReducer } from "./order.js";
import { wsSocketReducer } from "./wsSocket.js";
import { wsOrdersHistoryReducer } from './wsOrdersHistory';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    auth: authReducer,
    wsSocket: wsSocketReducer,
    wsOrdersHistory: wsOrdersHistoryReducer
});

export default rootReducer; 