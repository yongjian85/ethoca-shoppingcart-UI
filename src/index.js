import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import {render} from 'react-dom';
import rootReducer from './reducers/RootReducer.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import AppContainer from './containers/App'
import 'bootstrap/dist/css/bootstrap.min.css';


const store = createStore(rootReducer)


render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    document.getElementById('root')
  )


