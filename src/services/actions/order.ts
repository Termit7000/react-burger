import { TOrderID } from "../types";

import { 
    GET_ORDER_FAILED, 
    GET_ORDER_REQUEST, 
    GET_ORDER_SUCCESS } from "../action-types";

interface IRequestOrder {
    readonly type: typeof GET_ORDER_REQUEST;
}

interface IRequestOrderSuccess {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly orderId: TOrderID;
}

interface IRequestOrderFailed {
    readonly type: typeof GET_ORDER_FAILED;
    readonly errorText: string;
}

export type TOrderActions =
    | IRequestOrder
    | IRequestOrderSuccess
    | IRequestOrderFailed;

export function requestOrder(): IRequestOrder {
    return {type: GET_ORDER_REQUEST};
}

export function requestOrderSuccess(orderId: TOrderID): IRequestOrderSuccess{
    return {type: GET_ORDER_SUCCESS, orderId};
}

export function requestOrderFailed(errorText: string): IRequestOrderFailed {
    return {type: GET_ORDER_FAILED, errorText};
}