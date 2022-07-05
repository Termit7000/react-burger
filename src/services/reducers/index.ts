import { combineReducers } from "redux";

import { authReducer } from "./auth";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";
import { wsSocketReducer } from "./wsSocket";
import { wsOrdersHistoryReducer } from './wsOrdersHistory';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    auth: authReducer,
    wsSocket: wsSocketReducer,
    wsOrdersHistory: wsOrdersHistoryReducer
});

export default rootReducer; 