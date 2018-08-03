import React from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const spacing = 24;
const theme = createMuiTheme({
	spacing: {
		unit: spacing
	},
	wrapper: {
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
		paddingTop: spacing,
		paddingBottom: spacing,
	},
	container: {
		paddingLeft: spacing,
		paddingRight: spacing,
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