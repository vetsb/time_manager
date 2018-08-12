import React from 'react';

import {Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";


import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import routes from '../../routes';
import Menu from '../Menu';
import withRoot from "../../utils/withRoot";
import styles from './styles';

const history = createBrowserHistory();
history.listen(() => {
	window.scrollTo(0,0);
});

const App = (props) => {
	const {classes} = props;

	return (
		<Router history={history}>
			<Grid className={classes.wrapper}>
				{/*<Grid container className={classes.gridContainer}>*/}
					{/*<Grid className={classes.gridMenu}>*/}
						{/*<Menu history={history}/>*/}
					{/*</Grid>*/}

					{/*<Grid className={classes.gridContent}>*/}
						{/*<Switch>*/}
							{/*{routes.map((item, key) => <Route key={key} exact={item.isExact} path={item.path} component={item.component}/>)}*/}
						{/*</Switch>*/}
					{/*</Grid>*/}
				{/*</Grid>*/}

				<Switch>
					{routes.map((item, key) => <Route key={key} exact={item.isExact} path={item.path} component={item.component}/>)}
				</Switch>
			</Grid>
		</Router>
	)
};

export default withRoot(withStyles(styles)(App));