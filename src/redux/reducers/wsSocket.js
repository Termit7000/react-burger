

import { getErrorDescriptionByCodeEvent } from "../../utils/utils";
import { 
    WS_INIT, 
    WS_ON_CLOSE, 
    WS_ON_ERROR, 
    WS_ON_MESSAGE, 
    WS_ON_OPEN } from "../action-types"

const initialState = {
    isOpened: false,
    isError: false,
    errorText: '',
    orders: [],
    total: 0,
    totalToday: 0
}

export const wsSocketReducer = (state = initialState, action) => {

    switch (action.type) {

        case WS_INIT:
            return { ...initialState };

        case WS_ON_OPEN:
            return { ...state, isOpened: true };

        case WS_ON_CLOSE:
            {
                const closeCode = Number(action.payload.code);
                if (closeCode!==1000) {
                    return {...state, isOpened: false, isError: true, errorText: getErrorDescriptionByCodeEvent(closeCode)};
                }
                
                return { ...state, isOpened: false };}

        case WS_ON_MESSAGE:
            return { ...state, ...action.payload };

        case WS_ON_ERROR:
            return { ...state, isError: true};             

        default:
            return state;
    }
}