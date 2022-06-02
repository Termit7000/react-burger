import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

import { URL_WS_ORDERS_ALL } from '../utils/constants';
import { socketMiddleWare } from './middleware';

import { 
    WS_CLOSE_CONNECTION, 
    WS_INIT, 
    WS_ON_CLOSE, 
    WS_ON_ERROR, 
    WS_ON_MESSAGE, 
    WS_ON_OPEN, 
    WS_SEND_MESSAGE } from './action-types';

const wsActionsOrderALL = {
    wsInit: WS_INIT, 
    wsSendMessage: WS_SEND_MESSAGE,
    wsClose: WS_CLOSE_CONNECTION,
    onOpen: WS_ON_OPEN,
    onClose: WS_ON_CLOSE,
    onError: WS_ON_ERROR,
    onMessage: WS_ON_MESSAGE 
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, socketMiddleWare(URL_WS_ORDERS_ALL, wsActionsOrderALL))));