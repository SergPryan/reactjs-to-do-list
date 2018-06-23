import {createStore} from 'redux';
import React from 'react';
import {Provider} from "react-redux";
import App from "./App";
import ReactDOM from 'react-dom';
import reducers from './reducers';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <div>
        <Provider store={store}>
            <App/>
        </Provider>
    </div>,
    document.getElementById('root'));



