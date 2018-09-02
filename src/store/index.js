import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import createPromiseMiddleware from 'redux-promise-middleware'
import {routerMiddleware, routerReducer} from 'react-router-redux';
import {createBrowserHistory, createMemoryHistory} from 'history';
import nodeReducer from './node';

export const isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);
export default (url = '/') => {
    const history = isServer ? createMemoryHistory({initialEntries: [url]}) : createBrowserHistory();
    const reducer = combineReducers({
        node: nodeReducer,
        router: routerReducer
    });
    const promiseMiddleware = createPromiseMiddleware();
    const middlewares = [promiseMiddleware, routerMiddleware(history)];
    if (process.env.NODE_ENV !== 'production') {
        // redux-immutable-state-invariant辅助包（reducer违反纯函数时给出警告）
        middlewares.push(require('redux-immutable-state-invariant').default());
    }
    const enhancers = [];
    if (process.env.NODE_ENV === 'development' && !isServer) {
        const devToolsExtension = window.devToolsExtension;

        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension());
        }
    }
    const storeEnhancers = compose(applyMiddleware(...middlewares), ...enhancers,);
    const initialState = !isServer ? window.__REDUX_STATE__ : {};
    const store = createStore(reducer, initialState, storeEnhancers);
    return {
        store,
        history
    }
}
