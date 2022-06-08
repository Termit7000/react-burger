
export function socketMiddleWare(urlSocket, wsActions, isAuth = false) {

    const { wsInit, wsSendMessage, wsClose, onOpen, onClose, onError, onMessage } = wsActions;

    return store => {
        const { dispatch, getState } = store;
        let socket = null;

        return next => action => {

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