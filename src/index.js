import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

const pinListReducer = (state=[], action) => {
    switch(action.type) {
        case ('SET_PIN_LIST'):
            return action.payload
        default: 
            return state;
    }
}

const storeInstance = createStore(
    combineReducers({
        pinListReducer,
    })
)

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
