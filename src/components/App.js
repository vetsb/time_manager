import React from 'react';

import {Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";

import routes from '../routes';

const history = createBrowserHistory();
history.listen(() => {
	window.scrollTo(0,0);
});

const App = () => {
	return (
		<Router history={history}>
			<Switch>
				{routes.map((item, key) => <Route key={key} exact={item.isExact} path={item.path} component={item.component}/>)}
			</Switch>
		</Router>
	)
};

export default App;