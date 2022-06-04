import { 
    WS_CLOSE_CONNECTION, 
    WS_INIT } from "../action-types";

export function wsInit() {
    return {type: WS_INIT};
}

export function closeConnection() {
    return { type: WS_CLOSE_CONNECTION};
}