const styles = theme => ({
	element: {
		...theme.roboto,
		display: 'flex',
		paddingBottom: 25,
	},
	lastElement: {
		paddingBottom: 0,
	},
	left: {
		width: 30,
		position: 'relative',
		marginRight: 20,
	},
	line: {
		width: 4,
		position: 'absolute',
		top: 0,
		left: '50%',
		bottom: -25,
		transform: 'translateX(-50%)',
		background: '#000',
	},
	circle: {
		width: 30,
		height: 30,
		borderRadius: '50%',
		background: '#000',
		position: 'absolute',
		top: 0,
	},
	content: {
		flex: 1,
	},
	date: {
		fontSize: 20,
		marginBottom: 5,
	},
	startLabel: {
		color: "#AAA",
		fontSize: 16,
		marginLeft: 10,
	},
	time: {
		fontSize: 16,
	},
	timeLabel: {
		color: "#AAA",
		marginRight: 15,
	},
	description: {
		marginTop: 10,
	},
	descriptionList: {
		marginBottom: 0,
	},
	descriptionItem: {
		marginBottom: 20,
		"&:last-child": {
			marginBottom: 0,
		}
	},
	descriptionText: {
		fontSize: 16,
		lineHeight: 1.7,
		color: "#444",
		marginTop: 0,
		marginBottom: 3,
	},
	descriptionBottom: {
		display: 'flex',
		color: '#AAA',
		fontSize: 14,
	},
	descriptionBottomItem: {
		paddingRight: 12,
		marginRight: 8,
		position: 'relative',
		"&:before": {
			position: 'absolute',
			top: '50%',
			right: 0,
			borderRadius: '50%',
			marginTop: -1,
			width: 4,
			height: 4,
			background: '#CCC',
			content: "''",
			display: 'block',
		},
		"&:last-child": {
			paddingRight: 0,
			marginRight: 0,
			"&:before": {
				content: 'none'
			}
		}
	},
	descriptionButton: {
		marginTop: 8,
	}
});

export default styles;