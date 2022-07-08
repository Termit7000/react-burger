import { getErrorDescriptionByCodeEvent } from "../../utils/utils";

import { 
    WS_ON_CLOSE, 
    WS_ON_ERROR, 
    WS_ON_MESSAGE, 
    WS_ON_OPEN } from "../action-types"

import { TWsSocketActions } from "../actions";
import { TOrder } from "../types";

type TState = {
    isOpened: boolean,
    isError: boolean,
    errorText: string,
    orders: TOrder[],
    total: number,
    totalToday: number
}

const initialState: TState = {
    isOpened: false,
    isError: false,
    errorText: '',
    orders: [],
    total: 0,
    totalToday: 0
}

export const wsSocketReducer = (state = initialState, action: TWsSocketActions): TState => {

    switch (action.type) {

        case WS_ON_OPEN:
            return { ...state, isOpened: true };

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