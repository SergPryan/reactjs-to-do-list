import {createStore} from 'redux';
import React from 'react';
import {Provider} from "react-redux";
import App from "./component/App";
import ReactDOM from 'react-dom';
import reducers from './reducers';
import {loadState, saveState} from './commons/localStorage';

const persistedState = loadState();

const store = createStore(reducers, persistedState);
// const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    saveState(store.getState());
});

ReactDOM.render(
    <div>
        green - выполненные задачи<br/>
        yellow - активные задачи<br/>
        red - просроченные задачи<br/>
        Чтобы пометить задачу как выполненную нужно нажать кнопку Mark as Executed.<br/>
        Чтобы сохранить задачу нужно нажать кнопку save.<br/>
        <Provider store={store}>
            <App/>
        </Provider>
    </div>,
    document.getElementById('root'));



