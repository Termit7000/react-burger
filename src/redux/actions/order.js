
import { 
    CLEAR_ALL_INGREDIENTS, 
    DELETE_ALL_FROM_CONSTRUCTOR, 
    GET_ORDER_FAILED, 
    GET_ORDER_REQUEST, 
    GET_ORDER_SUCCESS } from "../action-types";

export function requestOrder() {
    return {type: GET_ORDER_REQUEST};
}

export function requestOrderSuccess({orderId}){
    return {type: GET_ORDER_SUCCESS, orderId};
}

export function deleteAllFromConstructor() {
    return {type: DELETE_ALL_FROM_CONSTRUCTOR};
}

export function resetAllCounts() {
    return {type: CLEAR_ALL_INGREDIENTS};
}

export function requestOrderFailed({errorText}) {
    return {type: GET_ORDER_FAILED, errorText};
}