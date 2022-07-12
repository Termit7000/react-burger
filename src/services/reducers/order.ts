import { TOrderActions } from "../actions";

import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
} from "../action-types"

type TState = {
    orderRequestInProgress: boolean,
    orderRequestFailed: boolean,
    orderErrorText: string,
    orderId: number
};

const initialState: TState = {
    orderRequestInProgress: false,
    orderRequestFailed: false,
    orderErrorText: '',
    orderId: 0
};

export const orderReducer = (state=initialState, action: TOrderActions): TState => {

    switch (action.type) {

        case GET_ORDER_REQUEST: 
            return {...state, orderRequestInProgress: true}
        case GET_ORDER_FAILED:
            return {...state, orderRequestFailed: true, orderRequestInProgress: false, orderErrorText: action.errorText};
        case GET_ORDER_SUCCESS:
            return {...state, orderRequestInProgress: false, orderId: action.orderId};        
        default :
            return state;
    }
}
