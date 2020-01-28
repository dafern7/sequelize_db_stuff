import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import './index.css';
import App from './js/components/app'
import index from "./js/index"
import store from "./js/store/index"


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);