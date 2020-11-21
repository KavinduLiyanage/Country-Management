import { createSelector } from 'reselect';

const selectUserLoginState = state => state.userLogin;

const selectUserLoginStatus = () => createSelector(
    selectUserLoginState,
    currentState => currentState.userLoginStatus,
);

const selectUserLoginError = () => createSelector(
    selectUserLoginState,
    currentState => currentState.userLoginError,
);

export {
    selectUserLoginStatus,
    selectUserLoginError,
};
