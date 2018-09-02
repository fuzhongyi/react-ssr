import React, {Component} from 'react';
import Routers from './router';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import createStore from './store';
import 'babel-polyfill';
const {store, history} = createStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Routers/>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
