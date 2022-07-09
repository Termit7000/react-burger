import { fetchCreateOrder } from "../../utils/api";

import { 
    deleteAllFromConstructor, 
    requestOrder, 
    requestOrderFailed, 
    requestOrderSuccess, 
    resetAllCounts } from "../actions";

import { AppDispatch, AppThunk, RootState } from "../types";

import { getActualAccessToken } from "./auth";

/**
 * Создание заказа
 */
export const createOrder: AppThunk = () => (dispatch: AppDispatch, getState: ()=>RootState)  => {

    dispatch(requestOrder());

    const { ingredients, auth } = getState() ;

    const ingredientsIds = [...ingredients.constructor.ingredients.map(el => el.id),
                               ingredients.constructor.bun,
                               ingredients.constructor.bun] as string[];

    const { accessToken, refreshToken, expiration } = auth;

    const getOrder = (accessToken: string) => fetchCreateOrder({ ingredientsIds, accessToken })
        .then((dataFetch) => {
            dispatch(requestOrderSuccess(dataFetch?.order.number || 0));
        })
        .then(() => {
            dispatch(deleteAllFromConstructor());
            dispatch(resetAllCounts());
        })
        .catch(errorText => dispatch(requestOrderFailed(errorText)));

    return getActualAccessToken(dispatch, { accessToken, expiration, refreshToken })
        .then(getOrder)
        .catch(errorText => dispatch(requestOrderFailed(errorText)));
};