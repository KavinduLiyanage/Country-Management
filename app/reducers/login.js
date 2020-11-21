import {
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
} from '../constants/action_types/user';

const initialState = {
    userLoginState: false,
    userLoginResponse: {},
    userLoginError: null,
};

export default function userLogin(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return { ...state, userLoginStatus: false, userLoginResponse: {}, userLoginError: null };
        case USER_LOGIN_SUCCESS:
            return { ...state, userLoginStatus: true, userLoginResponse: action.response.data, userLoginError: null };
        case USER_LOGIN_FAILED:
            return { ...state, userLoginStatus: false, userLoginResponse: {}, userLoginError: action.error };
        default:
            return state;
    }
}
