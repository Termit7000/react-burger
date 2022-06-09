import { 
    WS_CLOSE_CONNECTION_AUTH, 
    WS_INIT_AUTH } from "../action-types";

export function wsInit_Auth() {
    return {type: WS_INIT_AUTH};
}

export function closeConnection_Auth() {
    return { type: WS_CLOSE_CONNECTION_AUTH};
}