import { PayloadAction } from "@reduxjs/toolkit";
import { 
    WS_CLOSE_CONNECTION_AUTH, 
    WS_INIT_AUTH, 
    WS_ON_CLOSE_AUTH, 
    WS_ON_ERROR_AUTH, 
    WS_ON_MESSAGE_AUTH, 
    WS_ON_OPEN_AUTH} from "../action-types";

interface IOnOpenConnection {
    readonly type: typeof WS_ON_OPEN_AUTH;
    readonly payload: PayloadAction;
}

interface IOnError {
    readonly type: typeof WS_ON_ERROR_AUTH;
    readonly payload: PayloadAction;
}

interface IOnMessage {
    readonly type: typeof WS_ON_MESSAGE_AUTH;
    readonly payload: PayloadAction;
}

interface IWsInit_Auth {
    readonly type: typeof WS_INIT_AUTH;
}

interface IOnCloseConnection {
    readonly type: typeof WS_ON_CLOSE_AUTH;
    readonly payload: {code: number};
}

interface ICloseConnection_Auth {
    readonly type: typeof WS_CLOSE_CONNECTION_AUTH;
}

export type TWsOrdersHistoryActions = 
    | IWsInit_Auth
    | IOnOpenConnection  
    | IOnError   
    | IOnCloseConnection
    | ICloseConnection_Auth
    | IOnMessage;

export function wsInit_Auth(): IWsInit_Auth {
    return {type: WS_INIT_AUTH};
}

export function closeConnection_Auth(): ICloseConnection_Auth {
    return { type: WS_CLOSE_CONNECTION_AUTH};
}