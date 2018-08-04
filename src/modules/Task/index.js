import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {deleteCurrentTask, editTask, getTask} from "./actionCreator";
import store from '../../store';

import {withStyles} from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteIcon from "@material-ui/icons/Delete";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import Timeline from '../Timeline';
import TimelineElement from '../Timeline/TimelineElement';

import {secondsToTimeWithMeasure, timeToSeconds} from "../../utils/timeFormatter";
import withRoot from "../../utils/withRoot";

import AddTaskDialog from "../Tasks/dialogs/AddTaskDialog";
import DeleteTaskDialog from "./dialogs/DeleteTaskDialog";

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

	groupByTimePeriod = (obj, timestamp, period) => {
		let objPeriod = {};
		let oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds

		for (let i = 0; i < obj.length; i++) {
			let d = new Date(obj[i][timestamp] * 1000);
			if (period === 'day') {
				d = Math.floor(d.getTime() / oneDay);
			} else if (period === 'week') {
				d = Math.floor(d.getTime() / (oneDay * 7));
			} else if (period === 'month') {
				d = (d.getFullYear() - 1970) * 12 + d.getMonth();
			} else if (period === 'year') {
				d = d.getFullYear();
			} else {
				console.log('groupByTimePeriod: You have to set a period! day | week | month | year');
			}

			objPeriod[d] = objPeriod[d] || [];
			objPeriod[d].push(obj[i]);
		}
		return objPeriod;
	};

	render() {
		const {task} = this.state;
		const {classes} = this.props;
		const taskFound = task.id !== undefined;

		if (this.state.loading) {
			return (
				<div className={classes.progressContainer}>
					<CircularProgress size={60} />
				</div>
			);
		}

		if (taskFound) {
			const deadlineSeconds = timeToSeconds(task.time, task.measure);
			let spendSeconds = 0;

			let timeline = Object.assign([], task.timeline);

			timeline.sort((a, b) => {
				if (a.createdAt > b.createdAt) {
					return 1;
				}

				if (a.createdAt < b.createdAt) {
					return -1;
				}

				return 0;
			});

			timeline.forEach(item => spendSeconds += item.seconds);

			const groupedTimeline = this.groupByTimePeriod(timeline, 'createdAt', 'day');
			let newTimeline = [];

			Object.values(groupedTimeline).forEach(element => {
				let el = Object.assign({}, element[0]);
				el.seconds = 0;
				el.description = [];

				element.forEach(item => {
					el.seconds += item.seconds;

					if (item.description !== undefined && item.description.length > 0) {
						el.description.push(item.description);
					}
				});

				newTimeline.push(el);
			});

			let leftSeconds = deadlineSeconds - spendSeconds;

			if (leftSeconds < 0) {
				leftSeconds = 0;
			}

			let sumSeconds = 0;

			return (
				<Grid className={classes.wrapper}>
					<AppBar position="static">
						<Toolbar>
							<IconButton
								color="inherit"
								className={classes.toolbarArrowBack}
								onClick={() => this.props.history.push('/')}>
								<ArrowBackIcon />
							</IconButton>

							<Typography
								variant="title"
								color="inherit"
								className={classes.toolbarTitle}>Подробнее</Typography>

							<div className={classes.toolbarButtons}>
								<IconButton
									color="inherit"
									onClick={this.runTask}>
									<PlayArrowIcon />
								</IconButton>

								<IconButton
									color="inherit"
									onClick={this.showEditTaskDialog}>
									<EditIcon />
								</IconButton>

								<IconButton
									color="inherit"
									onClick={this.showDeleteTaskDialog}>
									<DeleteIcon />
								</IconButton>
							</div>
						</Toolbar>
					</AppBar>

					<div className={classes.inner}>
						<div className={classes.container}>
							<Typography variant="headline">{task.title}</Typography>
						</div>

						<List>
							<ListItem>
								<ListItemText
									primary="Выполняется"
									secondary={spendSeconds > 0 ? (<React.Fragment>{secondsToTimeWithMeasure(spendSeconds)} <i>(Запланировано {secondsToTimeWithMeasure(deadlineSeconds)})</i></React.Fragment>) : "Ещё не начиналось"}/>
							</ListItem>

							<ListItem>
								<ListItemText
									primary="Осталось"
									secondary={
										leftSeconds > 0
											?
											secondsToTimeWithMeasure(leftSeconds)
											:
											(deadlineSeconds === 0
													?
													"Нет срока"
													:
													(<React.Fragment>Завершено <i>(Переработка {secondsToTimeWithMeasure(spendSeconds - deadlineSeconds)})</i></React.Fragment>)
											)}/>
							</ListItem>

							{task.description.length > 0 ? (
								<ListItem>
									<ListItemText primary="Описание" secondary={task.description}/>
								</ListItem>
							) : null}
						</List>

						<div className={classes.container}>
							<Timeline>
								{newTimeline.map((item, key) => {
									sumSeconds += item.seconds;

									return (
										<TimelineElement
											key={item.id}
											isStart={key === 0}
											isEnd={sumSeconds >= deadlineSeconds && key === newTimeline.length - 1}
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
				</Grid>
			);
		}

		return (
			<Grid className={classes.wrapper}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							color="inherit"
							className={classes.arrowBack}
							onClick={this.returnBack}>
							<ArrowBackIcon />
						</IconButton>

						<Typography variant="title" color="inherit" className={classes.title}>Ошибка</Typography>
					</Toolbar>
				</AppBar>

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
			</Grid>
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