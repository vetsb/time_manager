import React, {Component, Fragment} from 'react';
import {withStyles} from "@material-ui/core/styles";
import DateFormat from "../../../utils/DateFormat";
import {secondsToTimeWithMeasure} from "../../../utils/timeFormatter";
import Button from "@material-ui/core/Button";
import StopExecutionDialog from "../../Stopwatch/dialog/StopExecutionDialog";
import bindActionCreators from "redux/src/bindActionCreators";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import withRoot from "../../../utils/withRoot";
import {editTimelineElement} from "../../Task/actionCreator";

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

class TimelineElement extends Component {
	state = {
		openEditDialog: false,
		currentElement: {}
	};

	handleEditClick = (item) => {
		this.openEditDialog(item);
	};

	openEditDialog = (item) => {
		this.setState({
			openEditDialog: true,
			currentElement: item,
		})
	};

	closeEditDialog = () => {
		this.setState({
			openEditDialog: false,
			currentElement: {},
		})
	};

	editElement = (element) => {
		const newElement = Object.assign({}, this.state.currentElement, element);

		this.props.editTimelineElement(newElement);
	};

	render() {
		const props = this.props;
		const {classes} = props;
		const {currentElement: current} = this.state;

		return (
			<Fragment>
				<div className={classes.element + (props.isEnd ? " " + classes.lastElement : "")}>
					<div className={classes.left}>
						{props.isEnd ? null : <div className={classes.line} style={{backgroundColor: props.color}}/>}
						<div className={classes.circle} style={{backgroundColor: props.color}}/>
					</div>

					<div className={classes.content}>
						<div className={classes.top}>
					<span className={classes.date}>
						{DateFormat(new Date(props.createdAt * 1000), "d mmmm")}
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
										return (
											<li className={classes.descriptionItem} key={key}>
												{item.description.length === 0 ? null : (
													<p className={classes.descriptionText} dangerouslySetInnerHTML={{__html: item.description.replace(/\n/g, "<br />")}}/>
												)}
												<div className={classes.descriptionBottom}>
													<div className={classes.descriptionBottomItem}>{DateFormat(new Date(item.createdAt * 1000), "HH:mm")}</div>
													<div className={classes.descriptionBottomItem}>{secondsToTimeWithMeasure(item.seconds)}</div>
												</div>

												<Button
													className={classes.descriptionButton}
													variant="outlined"
													color="primary"
													onClick={() => this.handleEditClick(item)}>
													Изменить
												</Button>
											</li>
										)
									})}
								</ul>
							</div>
						) : null}
					</div>
				</div>

				<StopExecutionDialog
					onClose={this.closeEditDialog}
					open={this.state.openEditDialog}
					onAgree={this.editElement}
					description={Object.keys(current).length > 0 ? current.description : ""}/>
			</Fragment>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		editTimelineElement: editTimelineElement
	}, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(withRoot(withStyles(styles)(TimelineElement))));