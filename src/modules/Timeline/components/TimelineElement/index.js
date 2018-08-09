import React, {Component, Fragment} from 'react';
import {withStyles} from "@material-ui/core/styles";
import DateFormat from "../../../../utils/DateFormat";
import {secondsToTimeWithMeasure} from "../../../../utils/timeFormatter";
import Button from "@material-ui/core/Button";
import StopExecutionDialog from "../../../Stopwatch/dialog/StopExecutionDialog";
import bindActionCreators from "redux/src/bindActionCreators";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import withRoot from "../../../../utils/withRoot";
import {editTimelineElement} from "../../../Task/store/actionCreator";
import styles from './styles';

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