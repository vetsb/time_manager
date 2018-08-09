import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import withRoot from "../../utils/withRoot";
import {getTask} from "../Task/store/actionCreator";
import store from '../../store';

import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Stopwatch from '../Stopwatch';
import {finishExecution, getNotFinishedExecutionByTaskId, increaseSecondsByTaskId} from "./store/actionCreator";
import ExitDialog from "./dialogs/ExitDialog";

import styles from './styles';

import MAppBar from '../../components/MAppBar';
import Progress from '../../components/Progress';

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

	handleAgree = () => {
		this.exit();
	};

	handleStart = () => {
		this.setState({
			running: true
		});
	};

	handleTick = () => {
		this.props.increaseSecondsByTaskId(this.state.task.id);
	};

	handleStop = (execution) => {
		execution.id = this.state.execution.id;
		execution.finished = true;

		this.props.finishExecution(execution);

		this.setState({
			running: false
		});
	};

	renderAppBar = () => {
		return (
			<MAppBar
				hasBackArrow={true}
				onClickBackArrow={this.handleBackClick}
				title="Выполнение задачи"
				history={this.props.history}/>
		);
	};

	render() {
		const {classes} = this.props;
		const {task, execution} = this.state;
		const taskFound = task.id !== undefined;

		if (this.state.loading) {
			return (
				<React.Fragment>
					{this.renderAppBar()}
					<Progress/>
				</React.Fragment>
			)
		}

		if (taskFound) {
			return (
				<React.Fragment>
					<MAppBar
						hasBackArrow={true}
						onClickBackArrow={this.handleBackClick}
						title="Выполнение задачи"
						history={this.props.history}/>

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
						onAgree={this.handleAgree}/>
				</React.Fragment>
			);
		}

		return (
			<Grid className={classes.wrapper}>
				<MAppBar
					hasBackArrow={true}
					title="Ошибка"
					history={this.props.history}/>

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
		getNotFinishedExecutionByTaskId: getNotFinishedExecutionByTaskId,
		finishExecution: finishExecution
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(Execution))));