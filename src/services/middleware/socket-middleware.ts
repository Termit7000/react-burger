import { AnyAction, MiddlewareAPI } from "redux";
import { TWsActions } from "../types";

export function socketMiddleWare(urlSocket:string, wsActions:TWsActions, isAuth:boolean = false) {

    const { wsInit, wsSendMessage, wsClose, onOpen, onClose, onError, onMessage } = wsActions;

    return (store:MiddlewareAPI) => {
        const { dispatch, getState } = store;
        let socket:WebSocket|null = null;

        return (next: (item:AnyAction)=>void) => (action:AnyAction) => {

            const { type, payload } = action;

            if (type === wsInit) {
                if (isAuth )  {
                    const { accessToken } = getState().auth;
                    socket = new WebSocket(`${urlSocket}?token=${accessToken}`);
                } else {
                    socket = new WebSocket(urlSocket);
                }

                socket.onopen = event => dispatch({ type: onOpen, payload: event });
                socket.onerror = event => dispatch({ type: onError, payload: event });

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    dispatch({ type: onMessage, payload: restParsedData });
                };

                socket.onclose = event => dispatch({ type: onClose, payload: event });
            }

            if (socket) {

                if (type === wsSendMessage) {
                    const message = { ...payload };
                    socket.send(JSON.stringify(message));
                }

                if (type === wsClose) {
                    socket.close();
                    socket = null;
                }
            }
            next(action);
        }
    }
}