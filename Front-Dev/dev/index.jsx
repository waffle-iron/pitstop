import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import  App from './components/App.jsx';
import * as reducers from './reducers'
import types from './constants/actions';
import message from './constants/message';
import mid from './middleWare/mid';

const logger = createLogger();
const reducer = combineReducers(reducers);

const store = createStore(
    reducer,
    {
      userName : 'N/A',
      error : '',
      info : '',
    },
    applyMiddleware(mid, logger)
);

const f = fetch("/сurrentUserName", {credentials: 'same-origin'})
    .then((response) => {
        response.json().then((data) => {
            if (response.status == '200'){
                store.dispatch({
                    type: types.LOAD_USER_NAME,
                    userName : data.message
                })
            } else {
                store.dispatch({
                    type: types.SHOW_ERROR,
                    error : message.UNABLE_LOAD_USER_NAME + ": " + response.status + " " + data.error
                })
            }
        });
    }).catch(()=> {
        store.dispatch({
            type: types.SHOW_ERROR,
            error : message.UNABLE_LOAD_USER_NAME
        })
    });


const destination = document.querySelector("#container");

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    destination
);


