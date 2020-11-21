import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

export const history = createBrowserHistory();

const initialState = {};
const sagaMiddleware = createSagaMiddleware();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer(history), // new root reducer with router state
    initialState,
    composeEnhancer(
        applyMiddleware(
            routerMiddleware(history), // for dispatching history actions
            sagaMiddleware,
        ),
    ),
);

sagaMiddleware.run(rootSaga);

export default store;
