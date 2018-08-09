import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {deleteCurrentTask, editTask, getTask} from "./store/actionCreator";
import store from '../../store';

import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteIcon from "@material-ui/icons/Delete";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Button from "@material-ui/core/Button";

import Timeline from '../Timeline';
import TimelineElement from '../Timeline/components/TimelineElement';

import {secondsToTimeWithMeasure, timeToSeconds} from "../../utils/timeFormatter";
import withRoot from "../../utils/withRoot";

import AddTaskDialog from "../Tasks/dialogs/AddTaskDialog";
import DeleteTaskDialog from "./dialogs/DeleteTaskDialog";

import styles from './styles';
import {getDeadlineSeconds, getLeftSeconds, getSpendSeconds} from "./js/secondsFormatter";

import MAppBar from '../../components/MAppBar';
import Progress from '../../components/Progress';

class Task extends Component {
	state = {
		task: {
			timeline: []
		},
		loading: true,
		openEditDialog: false,
		openDeleteDialog: false,
	};

	componentDidMount() {
		this.props.getTask(this.props.match.params.id);

		this.unsubscribe = store.subscribe(() => {
			this.setState({
				task: store.getState().task,
				loading: false,
			});
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	showEditTaskDialog = () => {
		this.setState({
			openEditDialog: true
		});
	};

	closeEditTaskDialog = () => {
		this.setState({
			openEditDialog: false
		})
	};

	showDeleteTaskDialog = () => {
		this.setState({
			openDeleteDialog: true
		});
	};

	closeDeleteTaskDialog = () => {
		this.setState({
			openDeleteDialog: false
		})
	};

	runTask = () => {
		this.props.history.push('/' + this.state.task.id + '/run');
	};

	editTask = task => {
		this.props.editTask(task);
	};

	deleteTask = () => {
		this.props.deleteCurrentTask(this.state.task.id);
	};

	renderSpendTime = () => {
		const {task} = this.state;
		const deadlineSeconds = timeToSeconds(task.time, task.measure);
		const spendSeconds = getSpendSeconds(task);

		if (spendSeconds > 0) {
			return (
				<React.Fragment>
					{secondsToTimeWithMeasure(spendSeconds)}
					&nbsp;
					<i>(Запланировано {secondsToTimeWithMeasure(deadlineSeconds)})</i>
				</React.Fragment>
			)
		}

		return "Ещё не начиналось";
	};

	renderLeftTime = () => {
		const leftSeconds = getLeftSeconds(this.state.task);
		const deadlineSeconds = getDeadlineSeconds(this.state.task);
		const spendSeconds = getSpendSeconds(this.state.task);

		if (leftSeconds > 0) {
			return secondsToTimeWithMeasure(leftSeconds);
		} else {
			if (deadlineSeconds === 0) {
				return "Нет срока";
			} else {
				return (
					<React.Fragment>
						Завершено <i>(Переработка {secondsToTimeWithMeasure(spendSeconds - deadlineSeconds)})</i>
					</React.Fragment>
				)
			}
		}
	};

	renderAppBar = () => {
		return (
			<MAppBar
				hasBackArrow={true}
				title="Подробнее"
				history={this.props.history}
				buttons={[
					{
						onClick: this.runTask,
						icon: <PlayArrowIcon />
					},
					{
						onClick: this.showEditTaskDialog,
						icon: <EditIcon />
					},
					{
						onClick: this.showDeleteTaskDialog,
						icon: <DeleteIcon />
					}
				]}/>
		);
	};

	renderAppBarError = () => {
		return (
			<MAppBar
				hasBackArrow={true}
				title="Ошибка"
				history={this.props.history}/>
		);
	};

	render() {
		const {task} = this.state;
		const {classes} = this.props;
		const taskFound = task.id !== undefined;

		if (this.state.loading) {
			return (
				<React.Fragment>
					{this.renderAppBar()}
					<Progress />
				</React.Fragment>
			)
		}

		if (taskFound) {
			const deadlineSeconds = getDeadlineSeconds(task);
			let sumSeconds = 0;

			return (
				<React.Fragment>
					{this.renderAppBar()}

					<div className={classes.inner}>
						<div className={classes.container}>
							<Typography variant="headline">{task.title}</Typography>
						</div>

						<List>
							<ListItem>
								<ListItemText
									primary="Выполняется"
									secondary={this.renderSpendTime()}/>
							</ListItem>

							<ListItem>
								<ListItemText
									primary="Осталось"
									secondary={this.renderLeftTime()}/>
							</ListItem>

							{task.description.length > 0 ? (
								<ListItem>
									<ListItemText primary="Описание" secondary={task.description}/>
								</ListItem>
							) : null}
						</List>

						<div className={classes.container}>
							<Timeline>
								{task.groupTimeline.map((item, key) => {
									sumSeconds += item.seconds;

									return (
										<TimelineElement
											key={item.id}
											isStart={key === 0}
											isEnd={sumSeconds >= deadlineSeconds && key === task.groupTimeline.length - 1}
											createdAt={item.createdAt}
											time={secondsToTimeWithMeasure(item.seconds)}
											description={item.description}
											color="#3f51b5"/>
									)
								})}
							</Timeline>

							<div className={classes.buttons}>
								<Button
									variant="contained"
									color="primary"
									className={classes.button}
									onClick={this.runTask}>
									Выполнять сейчас
								</Button>

								<Button
									variant="contained"
									color="primary"
									className={classes.button}
									onClick={this.showEditTaskDialog}>
									Редактировать
								</Button>

								<Button
									variant="contained"
									color="secondary"
									className={classes.button}
									onClick={this.showDeleteTaskDialog}>
									Удалить
								</Button>
							</div>
						</div>
					</div>

					{task.id !== undefined ?
						(
							<React.Fragment>
								<AddTaskDialog
									task={task}
									onClose={this.closeEditTaskDialog}
									open={this.state.openEditDialog}
									onSubmit={this.editTask}/>

								<DeleteTaskDialog
									onClose={this.closeDeleteTaskDialog}
									open={this.state.openDeleteDialog}
									onAgree={this.deleteTask}/>
							</React.Fragment>
						) : null}
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				{this.renderAppBarError()}

				<div className={classes.inner}>
					<div className={classes.container}>
						<Typography
							variant="headline"
							className={classes.errorTitle}>
							Страница не найдена
						</Typography>

						<Button variant="contained" color="primary" onClick={() => this.props.history.push('/')}>На главную</Button>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
function mapStateToProps(state) {
	return {
		task: state.task
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({getTask: getTask, editTask: editTask, deleteCurrentTask: deleteCurrentTask}, dispatch);
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(Task))));