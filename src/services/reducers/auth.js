import { KEY_USER_DATA } from "../../utils/constants";
import { parseToken } from "../../utils/utils";
import { 
    AUTH_FAILED, 
    AUTH_REQUEST, 
    AUTH_SUCCESS, 
    AUTH_SET_NEW_TOKEN, 
    AUTH_RESET_ERROR} from "../actions"


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
    expiration: 0,
    refreshToken: '',
}

const getExpirationTokenDate = token => {

    const expToken = parseToken(token)?.exp || 0;    

    const d = new Date();
    d.setTime( (new Date()).getTime() + expToken * 1000) ;
    return d.getTime();

};

const saveUserData = value => window.localStorage.setItem(KEY_USER_DATA, value);
const getUserData = ()=> window.localStorage.getItem(KEY_USER_DATA) || '';  

const refreshToken = getUserData();

if (refreshToken) {
    initialState.refreshToken = refreshToken; 
    initialState.isAuthChecked = true;   
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case AUTH_REQUEST:
            return { ...initialState, authInProgress: true };
        case AUTH_FAILED:
            return { ...state, authInProgress: false, isError: true, error: action.error };
        case AUTH_SUCCESS: {

            const userData = {
                authInProgress: false,
                isAuthChecked: true,
                user: { ...action.user },
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            };

            //Дата истечения токена                   
            userData.expiration = getExpirationTokenDate(action.accessToken);

            saveUserData(action.refreshToken);

            return { ...state, ...userData };
        }

        case AUTH_RESET_ERROR: 
            return {...state, isError: false, error: ''};

        case AUTH_SET_NEW_TOKEN: {

            const {accessToken, refreshToken} = action;
            const expiration = getExpirationTokenDate(accessToken);
            
            saveUserData(refreshToken);

            return {...state, accessToken, refreshToken, expiration};
        }

        default: return state
    }

}