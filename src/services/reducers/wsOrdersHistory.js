

import { getErrorDescriptionByCodeEvent } from "../../utils/utils";
import { 
    WS_ON_CLOSE_AUTH, 
    WS_ON_ERROR_AUTH, 
    WS_ON_MESSAGE_AUTH, 
    WS_ON_OPEN_AUTH } from "../action-types"

const initialState = {
    isOpened: false,
    isError: false,
    errorText: '',
    orders: [],
    total: 0,
    totalToday: 0
}

export const wsOrdersHistoryReducer = (state = initialState, action) => {

    switch (action.type) {

        case WS_ON_OPEN_AUTH:            
            return { ...state, isOpened: true };
        case WS_ON_CLOSE_AUTH:
            {
                const closeCode = Number(action.payload.code);
                if (closeCode!==1000 && closeCode!==1005) {
                    return {...state, isOpened: false, isError: true, errorText: getErrorDescriptionByCodeEvent(closeCode)};
                }
                
                return { ...state, isOpened: false };}

        case WS_ON_MESSAGE_AUTH:
            return { ...state, ...action.payload };

        case WS_ON_ERROR_AUTH:
            return { ...state, isError: true};             

        default:
            return state;
    }
}