
export function socketMiddleWare(urlSocket, wsActions, isAuth) {

    const { wsInit, wsSendMessage, wsClose, onOpen, onClose, onError, onMessage } = wsActions;

    return store => {
        const { dispatch } = store;
        let socket = null;

        return next => action => {

            const { type, payload } = action;

            if (type === wsInit) {

                socket = new WebSocket(urlSocket);

                socket.onopen = event => dispatch({ type: onOpen, payload: event });
                socket.onerror = event => dispatch({ type: onError, payload: event});
                
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    dispatch({type: onMessage, payload: restParsedData } );
                };

                socket.onclose = event => dispatch({ type: onClose, payload: event });

                return;
            }

            if (!socket) {
                next(action);
                return;
            };

            switch (type) {

                case wsSendMessage: {

                    const message = { ...payload };
                    socket.send(JSON.stringify(message));
                    return;
                }

                case wsClose: {

                    socket.close();
                    socket = null;
                    return;
                }

                default: next(action);
            }
        }
    }
}