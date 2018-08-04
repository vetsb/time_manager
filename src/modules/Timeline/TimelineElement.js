import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import DateFormat from "../../utils/DateFormat";

const styles = () => ({
	element: {
		display: 'flex',
		paddingBottom: 25,
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
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
	descriptionItem: {
		fontSize: 14,
		lineHeight: 1.7,
		color: "#444",
		marginBottom: 15,
		"&:last-child": {
			marginBottom: 0,
		}
	}
});

const TimelineElement = (props) => {
	const {classes} = props;

	return (
		<div className={classes.element + (props.isEnd ? " " + classes.lastElement : "")}>
			<div className={classes.left}>
				{props.isEnd ? null : <div className={classes.line} style={{backgroundColor: props.color}}/>}
				<div className={classes.circle} style={{backgroundColor: props.color}}/>
			</div>

			<div className={classes.content}>
				<div className={classes.top}>
					<span className={classes.date}>
						{DateFormat(new Date(props.createdAt*1000), "d mmmm")}
						{props.isStart || props.isEnd ? "." : null}
					</span>

					{props.isStart ? <span className={classes.startLabel}>Старт</span> : null}
					{props.isEnd ? <span className={classes.startLabel}>Финиш</span> : null}
				</div>

				<div className={classes.time}>
					<span className={classes.timeLabel}>Время:</span>
					<span>
						{props.time}
					</span>
				</div>

				{props.description.length > 0 ? (
					<div className={classes.description}>
						<ul className={classes.descriptionList}>
							{props.description.map((item, key) => {
								if (item.length > 0) {
									return <li className={classes.descriptionItem} key={key}>{item}</li>
								}

								return null;
							})}
						</ul>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default withStyles(styles)(TimelineElement)