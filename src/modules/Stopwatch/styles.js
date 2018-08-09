const styles = theme => ({
	container: {
		textAlign: 'center',
	},
	stopwatch: {
		fontSize: 46,
		color: '#000',
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		marginTop: 25,
		marginBottom: 35,
	},

	buttons: theme.lineButtons,
	button: theme.lineButton,

	buttonInactive: {
		opacity: 0.7,
		pointerEvents: "none"
	}
});

export default styles;