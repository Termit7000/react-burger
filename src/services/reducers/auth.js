import { KEY_USER_DATA } from "../../utils/constants";
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

export function saveUserData(obj) {
    window.localStorage.setItem(KEY_USER_DATA, JSON.stringify(obj));
}

export function getUserData() {

    const userData = window.localStorage.getItem(KEY_USER_DATA);
    return JSON.parse(userData);
}

const userData = getUserData();

if (userData?.user) {
    for (let key in initialState) {
        initialState[key] = userData[key] || initialState[key];
    }   

    initialState.isAuthChecked = String(initialState.refreshToken).length>0;
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case REGISTER_REQUEST:
            return { ...initialState };
        case REGISTER_FAILED:
            return { ...state, authInProgress: false, isError: true, error: action.error };
        case REGISTER_SUCCESS: {

            const userData = {
                authInProgress: false,
                isAuthChecked: true,
                user: { ...action.user },
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            };

            saveUserData(userData);

            return { ...state, userData };
        }
        case AUTH_INIT: {

            const auth = action.payload;

            if (!auth || !auth.user || !auth.refreshToken) return state;

            return {
                ...state,
                isAuthChecked: true,
                user: { ...auth.user },
                accessToken: auth.accessToken,
                refreshToken: auth.refreshToken
            };
        }

        default: return state
    }

}