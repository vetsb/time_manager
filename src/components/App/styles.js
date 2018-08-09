const styles = theme => ({
	wrapper: {
		minWidth: 360,
		marginLeft: 'auto',
		marginRight: 'auto',
		backgroundColor: "#FFF",
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		paddingTop: 58,
		"@media(min-width: 576px)": {
			paddingTop: 64,
		}
	},
	gridContainer: {
		flex: 1,
		position: 'relative',
	},
	gridMenu: {
		width: 270,
		position: 'fixed',
		top: 0,
		left: 0,
		bottom: 0,
		backgroundColor: '#333',
	},
	gridContent: {
		flex: 1,
		marginLeft: 270,
		display: 'flex',
		flexDirection: 'column',
	},
});

export default styles;