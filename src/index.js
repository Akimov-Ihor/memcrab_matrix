import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Matrix from './components/Matrix.jsx';
import store from './store/store'
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <Matrix />
    </Provider>
    , document.getElementById('root')
);

