import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import allReducers from './reducers/all'
import thunk from 'redux-thunk'
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(allReducers, applyMiddleware(thunk))
ReactDOM.render(
  <Provider store={store}> <App /> </Provider>,
  document.getElementById('root')
); 