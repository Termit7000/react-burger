

import { getErrorDescriptionByCodeEvent } from "../../utils/utils";
import { 
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

        case WS_ON_OPEN:
            return { ...initialState, isOpened: true };

        case WS_ON_CLOSE:
            {
                const closeCode = Number(action.payload.code);
                if (closeCode!==1000 && closeCode!==1005) {
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