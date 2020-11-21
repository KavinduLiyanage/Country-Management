import { fork, all } from 'redux-saga/effects';
import userLoginSagas from './containers/login/sagas';
import countryManagementSagas from './containers/application/sagas';


export default function* rootSaga() {
    return yield all([
        fork(userLoginSagas),
        fork(countryManagementSagas),
    ]);
}
