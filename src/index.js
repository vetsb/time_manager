import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import registerServiceWorker from './utils/registerServiceWorker';
import store from './store';
import App from "./components/App/index";
import './styles/index.css';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
