import React from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const spacing = 24;
const breakpointValues = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
};
const theme = createMuiTheme({
	spacing: {
		unit: spacing,
	},
	breakpoints: {
		values: breakpointValues,
	},

	inner: {
		paddingTop: 16,
		paddingBottom: 16,
		overflowX: 'hidden',
		overflowY: 'auto',

		'@media (min-width: 576px)': {
			paddingTop: spacing,
			paddingBottom: spacing,
		}
	},

	container: {
		paddingLeft: 16,
		paddingRight: 16,

		'@media (min-width: 576px)': {
			paddingLeft: spacing,
			paddingRight: spacing,
		}
	},

	lineButtons: {
		margin: -spacing/4
	},
	lineButton: {
		margin: spacing/4
	},

	errorTitle: {
		marginBottom: '1em',
	},

	roboto: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
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