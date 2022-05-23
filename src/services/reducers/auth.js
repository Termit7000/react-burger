import { KEY_USER_DATA } from "../../utils/constants";
import { AUTH_FAILED, AUTH_REQUEST, AUTH_SUCCESS } from "../actions"


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

            saveUserData(action.refreshToken);

            return { ...state, ...userData };
        }

        default: return state
    }

}