import { ThunkAction } from 'redux-thunk';
import { ActionCreator } from 'redux';

import { TAuthActions, TIngredientsAction, TOrderActions, TWsOrdersHistoryActions, TWsSocketActions } from '../actions';
import { store } from '../store';

type TApplicationActions = 
    | TAuthActions
    | TIngredientsAction
    | TOrderActions
    | TWsOrdersHistoryActions
    | TWsSocketActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
ThunkAction<ReturnType, RootState, unknown, TApplicationActions>>;