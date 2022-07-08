import { PayloadAction } from "@reduxjs/toolkit";
import { 
    WS_CLOSE_CONNECTION, 
    WS_INIT,
    WS_ON_CLOSE,
    WS_ON_ERROR,
    WS_ON_MESSAGE,
    WS_ON_OPEN} from "../action-types";

interface IWsInit {
    readonly type: typeof WS_INIT;
}

interface IWsOnOpen {
    readonly type: typeof WS_ON_OPEN;
}

interface IWsOnClose {
    readonly type: typeof WS_ON_CLOSE;
    readonly payload: {code: number};
}

interface IWsOnError {
    readonly type: typeof WS_ON_ERROR;
}

interface IWsOnMassage {
    readonly type: typeof WS_ON_MESSAGE;
    readonly payload: PayloadAction;
}


interface ICloseConnection {
    readonly type: typeof WS_CLOSE_CONNECTION;
}

export type TWsSocketActions = 
    | IWsInit
    | ICloseConnection
    | IWsOnOpen
    | IWsOnClose
    | IWsOnError
    | IWsOnMassage;

export function wsInit(): IWsInit {
    return {type: WS_INIT};
}

export function closeConnection(): ICloseConnection {
    return { type: WS_CLOSE_CONNECTION};
}