import React from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const spacing = 24;
const theme = createMuiTheme({
	// palette: {
	// 	primary: {
	// 		light: purple[300],
	// 		main: purple[500],
	// 		dark: purple[700],
	// 	},
	// 	secondary: {
	// 		light: green[300],
	// 		main: green[500],
	// 		dark: green[700],
	// 	},
	// },
	spacing: {
		unit: spacing
	},
	container: {
		marginLeft: -spacing/2,
		marginRight: -spacing/2
	},
	item: {
		padding: spacing,
	}
});

function withRoot(Component) {
	function WithRoot(props) {
		return (
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...props} />
			</MuiThemeProvider>
		);
	}

	return WithRoot;
}

export default withRoot;