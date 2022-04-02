import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
} from "../actions";

const initialState = {
    orderRequestInProgress: false,
    orderRequestFailed: false,
    orderErrorText: '',
    orderId: 0
};

export const orderReducer = (state=initialState, action) => {

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
