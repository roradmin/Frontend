import React from "react";
import ReactDOM from "react-dom";
import App from './components/App';
import { BrowserRouter as Router} from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; 
import rootReducer from './redux/reducers/rootReducer';
import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))



ReactDOM.render((
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
),document.getElementById("root")
);

serviceWorker.register();