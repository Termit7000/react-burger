import { KEY_USER_DATA } from "../../utils/constants";
import { parseToken } from "../../utils/utils";
import { 
    AUTH_FAILED, 
    AUTH_REQUEST, 
    AUTH_SUCCESS, 
    AUTH_SET_NEW_TOKEN, 
    AUTH_RESET_ERROR,
    AUTH_SET_USER_INFO,
    AUTH_LOGOUT_REQUEST,
    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_FAILED,
    AUTH_UPDATE_REQUEST,
    AUTH_UPDATE_FAILED,
    AUTH_UPDATE_SUCCESS} from "../actions"


const initialState = {
    isAuthChecked: false,
    
    authInProgress: false,
    logoutInProgress: false,
    updateInProgress: false,

    isErrorUpdate: false,

    isError: false,
    error: '',
    user: {
        email: '',
        name: '',
    },
    accessToken: '',
    expiration: 0,
    refreshToken: '',
}

const getExpirationTokenDate = token => {

    const expToken = parseToken(token)?.exp || 0;    

    const d = new Date();
    d.setTime( (new Date()).getTime() + expToken * 1000) ;
    return d.getTime();

};

const saveUserToken = value => window.localStorage.setItem(KEY_USER_DATA, value);
const getUserToken = ()=> window.localStorage.getItem(KEY_USER_DATA) || '';  
const removeUserToken = () => window.localStorage.removeItem(KEY_USER_DATA);

const refreshToken = getUserToken();

if (refreshToken) {
    initialState.refreshToken = refreshToken; 
    //initialState.isAuthChecked = true;   
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case AUTH_REQUEST:
            return { ...initialState, authInProgress: true };
        case AUTH_FAILED:
            return { ...state, authInProgress: false, isError: true, error: action.error };
        case AUTH_SUCCESS: {
            return { ...state, authInProgress: false, isAuthChecked: true };
        }

        case AUTH_RESET_ERROR: 
            return {...state, isError: false, error: ''};

        case AUTH_SET_NEW_TOKEN: {

            const {accessToken, refreshToken} = action;
            const expiration = getExpirationTokenDate(accessToken);
            
            saveUserToken(refreshToken);

            return {...state, accessToken, refreshToken, expiration};        }

        case AUTH_SET_USER_INFO: 
            return {...state, user: {...action.user}};

        case AUTH_LOGOUT_REQUEST: 
            return {...state, logoutInProgress: true};

        case AUTH_LOGOUT_SUCCESS: {
            removeUserToken();
            return {...initialState, refreshToken:''};
        }
        case AUTH_LOGOUT_FAILED: 
            return {...state, logoutInProgress:false, isError: true, error: action.error };

        case AUTH_UPDATE_REQUEST:
            return {...state, updateInProgress: true};
        
        case AUTH_UPDATE_FAILED: 
            return {...state, updateInProgress: false, isErrorUpdate: true, error: action.error};
        case AUTH_UPDATE_SUCCESS:
            return {...state, user: {...action.user}, updateInProgress: false};

        default: return state
    }

}