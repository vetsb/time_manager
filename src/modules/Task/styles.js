const styles = theme => ({
	wrapper: theme.wrapper,

	toolbarTitle: theme.toolbarTitle,
	toolbarArrowBack: theme.toolbarArrowBack,
	toolbarButtons: theme.toolbarButtons,

	buttons: {
		...theme.lineButtons,
		marginTop: 20,
	},
	button: theme.lineButton,

	inner: theme.inner,
	container: theme.container,

	progressContainer: theme.progressContainer,
	errorTitle: theme.errorTitle,
});

export default styles;