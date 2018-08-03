import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import withRoot from "../../utils/withRoot";
import {getTask} from "../Task/actionCreator";
import store from '../../store';

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import Stopwatch from '../Stopwatch';
import {finishExecutionByTaskId, getNotFinishedExecutionByTaskId, increaseSecondsByTaskId} from "./actionCreator";
import ExitDialog from "./dialogs/ExitDialog";

const styles = theme => ({
	wrapper: theme.wrapper,
	toolbarArrowBack: theme.toolbarArrowBack,

	inner: theme.inner,
	container: theme.container,

	progressContainer: theme.progressContainer,
	errorTitle: theme.errorTitle,
});

class Execution extends Component {
	stopwatch = React.createRef();
	state = {
		task: {},
		loading: true,
		running: false,
		openExitDialog: false,
	};

	componentDidMount() {
		const task = store.getState().task;

		if (task.id === undefined) {
			this.props.getNotFinishedExecutionByTaskId(this.props.match.params.id);
			this.props.getTask(this.props.match.params.id);
		} else {
			const execution = task.timeline.filter(item => !item.finished);

			this.setState({
				task: task,
				execution: execution.length === 0 ? {} : execution[0],
				loading: false,
			});
		}

		this.unsubscribe = store.subscribe(() => {
			this.setState({
				task: store.getState().task,
				execution: store.getState().execution,
				loading: false,
			});
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	openExitDialog = () => {
		this.setState({
			openExitDialog: true,
		})
	};

	closeExitDialog = () => {
		this.setState({
			openExitDialog: false,
		})
	};

	handleBackClick = () => {
		if (this.state.running) {
			this.openExitDialog();
		} else {
			this.exit();
		}
	};

	exit = () => {
		this.props.history.push('/' + this.state.task.id);
	};

	handleStart = () => {
		this.setState({
			running: true
		});
	};

	handleTick = () => {
		this.props.increaseSecondsByTaskId(this.state.task.id);
	};

	handleStop = () => {
		this.props.finishExecutionByTaskId(this.state.task.id);

		this.setState({
			running: false
		});
	};

	render() {
		const {classes} = this.props;
		const {task, execution} = this.state;
		const taskFound = task.id !== undefined;

		if (this.state.loading) {
			return (
				<div className={classes.progressContainer}>
					<CircularProgress size={60} />
				</div>
			);
		}

		if (taskFound) {
			return (
				<Grid className={classes.wrapper}>
					<AppBar position="static">
						<Toolbar>
							<IconButton
								color="inherit"
								className={classes.toolbarArrowBack}
								onClick={this.handleBackClick}>
								<ArrowBackIcon />
							</IconButton>

							<Typography variant="title" color="inherit" className={classes.title}>Выполнение задачи</Typography>
						</Toolbar>
					</AppBar>

					<div className={classes.inner}>
						<div className={classes.container}>
							<Typography variant="headline">{task.title}</Typography>
						</div>

						<div className={classes.container}>
							<Stopwatch
								seconds={Object.keys(execution).length === 0 ? 0 : execution.seconds}
								onStart={this.handleStart}
								onTick={this.handleTick}
								onStop={this.handleStop}/>
						</div>
					</div>

					<ExitDialog
						onClose={this.closeExitDialog}
						open={this.state.openExitDialog}
						onAgree={this.exit}/>
				</Grid>
			);
		}

		return (
			<Grid className={classes.wrapper}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							color="inherit"
							className={classes.toolbarArrowBack}
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
		task: state.task,
		execution: state.execution
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getTask: getTask,
		increaseSecondsByTaskId: increaseSecondsByTaskId,
		finishExecutionByTaskId: finishExecutionByTaskId,
		getNotFinishedExecutionByTaskId: getNotFinishedExecutionByTaskId
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(Execution))));