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
	wrapper: {
		minWidth: 360,
		maxWidth: 720,
		marginLeft: 'auto',
		marginRight: 'auto',
		backgroundColor: "#FFF",
		minHeight: '100vh',
	},

	toolbarTitle: {
		flex: 1,
	},
	toolbarArrowBack: {
		marginLeft: -spacing/2,
		marginRight: spacing/2,
	},
	toolbarButtons: {
		marginRight: -spacing/2,
	},

	inner: {
		paddingTop: 16,
		paddingBottom: 16,

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

	progressContainer: {
		width: '100vw',
		height: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},

	errorTitle: {
		marginBottom: '1em',
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