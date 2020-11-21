import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userLogin from './login';
import countryManagement from './countryManagement';


export default history =>
    combineReducers({
        router: connectRouter(history),
        userLogin,
        countryManagement,
    });
