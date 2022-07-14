import { ThunkAction, ThunkDispatch } from 'redux-thunk';
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
export type AppDispatch = ActionCreator<ThunkDispatch<RootState, never, TApplicationActions>>; // typeof store.dispatch;
export type AppThunk<ReturnTyp = void> = ActionCreator<
ThunkAction<ReturnTyp, RootState, unknown, TApplicationActions>>;