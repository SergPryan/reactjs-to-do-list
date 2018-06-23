import {createStore} from 'redux';
import React from 'react';
import {Provider} from "react-redux";
import App from "./App";
import ReactDOM from 'react-dom';
import reducers from './reducers';
import {loadState ,saveState} from './localStorage';

const persistedState = loadState();

// const store = createStore(reducers, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(reducers, persistedState);

store.subscribe(()=>{
    saveState(store.getState());
    });

ReactDOM.render(
    <div>
        <Provider store={store}>
            <App/>
        </Provider>
    </div>,
    document.getElementById('root'));



