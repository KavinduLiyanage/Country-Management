import {
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
} from '../../constants/action_types/user';


const userLogin = data => ({
    type: USER_LOGIN,
    data,
});

const userLoginSuccess = response => ({
    type: USER_LOGIN_SUCCESS,
    response,
});

const userLoginFailed = error => ({
    type: USER_LOGIN_FAILED,
    error,
});

export {
    userLogin,
    userLoginSuccess,
    userLoginFailed,
};
