import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CLOSE_MODAL_ORDER
} from "../actions";

import testdata from '../../utils/testOrder.json';

const initialState = {
    orderRequestInProgress: false,
    orderRequestFailed: false,
    orderErrorText: '',
    orderId: 0,
    
    ingredients: [...testdata].filter(el=>el.type!=='bun'),
    bun: [...testdata].filter(el=>el.type === 'bun')[0],

    isOrderOpened: false
};

export const orderReducer = (state=initialState, action) => {

    switch (action.type) {

        case GET_ORDER_REQUEST: 
            return {...state, orderRequestInProgress: true, isOrderOpened: true}
        case GET_ORDER_FAILED:
            return {...state, orderRequestFailed: true, orderRequestInProgress: false, orderErrorText: action.errorText};
        case GET_ORDER_SUCCESS:
            return {...state, orderRequestInProgress: false, orderId: action.orderId};
        case CLOSE_MODAL_ORDER: 
            return {...state, isOrderOpened: false}
        default :
            return state;
    }
}
