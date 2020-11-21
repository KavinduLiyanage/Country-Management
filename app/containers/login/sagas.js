import { takeEvery, put } from 'redux-saga/effects';
import browserStorage from '../../helpers/browserStorage';
import {
    USER_LOGIN,
} from '../../constants/action_types/user';
import {
    userLoginSuccess,
    userLoginFailed,
} from './actions';

export function* userLogin(data) {
    try {
        const { data: { email, password } } = data;
        if (email === 'sugathsathkorala@gmail.com' && password === '1qaz!QAZ') {
            browserStorage.setLocalStorage('sc_data', email);
            yield put(userLoginSuccess(true));
        } else {
            yield put(userLoginFailed('Username or Password incorrect'));
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error->userLogin ', error);
        yield put(userLoginFailed(error));
    }
}


export default function* userSignUpSagas() {
    yield* [
        takeEvery(USER_LOGIN, userLogin),
    ];
}
