import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

import { URL_WS_ORDERS_ALL, URL_WS_ORDERS_HISTORY } from '../utils/constants';

import { socketMiddleWare } from './middleware';

import { 
    WS_CLOSE_CONNECTION, 
    WS_INIT, 
    WS_ON_CLOSE, 
    WS_ON_ERROR, 
    WS_ON_MESSAGE, 
    WS_ON_OPEN, 
    WS_SEND_MESSAGE,

    WS_CLOSE_CONNECTION_AUTH, 
    WS_INIT_AUTH, 
    WS_ON_CLOSE_AUTH, 
    WS_ON_ERROR_AUTH, 
    WS_ON_MESSAGE_AUTH, 
    WS_ON_OPEN_AUTH, 
    WS_SEND_MESSAGE_AUTH,

} from './action-types';

const wsActionsOrderALL = {
    wsInit: WS_INIT, 
    wsSendMessage: WS_SEND_MESSAGE,
    wsClose: WS_CLOSE_CONNECTION,
    onOpen: WS_ON_OPEN,
    onClose: WS_ON_CLOSE,
    onError: WS_ON_ERROR,
    onMessage: WS_ON_MESSAGE 
};

const wsActionsOrdersHistory = {
    wsInit: WS_INIT_AUTH, 
    wsSendMessage: WS_SEND_MESSAGE_AUTH,
    wsClose: WS_CLOSE_CONNECTION_AUTH,
    onOpen: WS_ON_OPEN_AUTH,
    onClose: WS_ON_CLOSE_AUTH,
    onError: WS_ON_ERROR_AUTH,
    onMessage: WS_ON_MESSAGE_AUTH 
};

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
  
export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(
    thunk, 
    socketMiddleWare(URL_WS_ORDERS_ALL, wsActionsOrderALL),
    socketMiddleWare(URL_WS_ORDERS_HISTORY, wsActionsOrdersHistory, true)
    )));