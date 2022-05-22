import { AUTH_INIT, REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS } from "../actions"

const initialState = {
    isAuthChecked: false,    
    authInProgress: false,
    isError: false,
    error: '',
    user: {
        email: '',
        name: '',
    },
    accessToken: '',
    refreshToken: '',
}

export const authReducer = (state = initialState, action) => { 

    switch (action.type) {

        case REGISTER_REQUEST: 
            return {...initialState};
        case REGISTER_FAILED:
            return {...state, authInProgress: false, isError: true, error: action.error};
        case REGISTER_SUCCESS: 
            return {...state, 
                authInProgress: false, 
                isAuthChecked: true, 
                user: {...action.user},                
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            };
        case AUTH_INIT: {

            const auth = action.payload;

            if (!auth || !auth.user || !auth.refreshToken) return state;

            return {...state, 
                isAuthChecked:true, 
                user: {...auth.user}, 
                accessToken: auth.accessToken, 
                refreshToken: auth.refreshToken};
            }

        default: return state
    }

}