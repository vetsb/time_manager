const styles = theme => ({
	logotype: {
		...theme.roboto,
		fontSize: 30,
		fontWeight: 500,
		color: "#FFF",
		padding: "0px 16px",
		height: 56,
		display: 'flex',
		alignItems: 'center',
		borderBottom: '1px solid #666',
		"@media(min-width: 576px)": {
			height: 64
		}
	},
	menuItem: {
		color: "#FFF"
	}
});

export default styles;