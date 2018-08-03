import React, {Component} from 'react';

import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import withRoot from "../../utils/withRoot";
import StopExecutionDialog from "../Execution/dialogs/StopExecutionDialog";

const styles = theme => ({
	container: {
		textAlign: 'center',
	},
	stopwatch: {
		fontSize: 46,
		color: '#000',
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		marginBottom: 35,
	},
	buttons: {
		margin: -theme.spacing.unit/4
	},
	button: {
		margin: theme.spacing.unit/4
	},
	buttonInactive: {
		opacity: 0.7,
		pointerEvents: "none"
	}
});

class Stopwatch extends Component {
	constructor() {
		super();

		this.state = {
			hours: 0,
			minutes: 0,
			seconds: 0,
			allSeconds: 0,
			running: false,
			openStopDialog: false,
		};
	}

	componentDidMount() {
		const {seconds:allSeconds} = this.props;

		let seconds = 0;
		let minutes = 0;
		let hours = 0;

		if (allSeconds < 60) {
			seconds = allSeconds;
		}

		if (allSeconds >= 60 && allSeconds < 60*60) {
			minutes = parseInt(allSeconds/60, 10);
			seconds = allSeconds - minutes*60;
		}

		if (allSeconds >= 60*60) {
			hours = parseInt(allSeconds/(60*60), 10);
			minutes = parseInt((allSeconds - hours*60*60)/60, 10);
			seconds = allSeconds - hours*60*60 - minutes*60;
		}

		this.update(hours, minutes, seconds, allSeconds);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
		this.setState({
			running: false
		});
	}

	handleStart = (props) => {
		if (!this.state.running) {
			this.interval = setInterval(() => {
				this.tick();
				props.onTick();
			}, 1000);

			this.setState({
				running: true
			});

			props.onStart();
		}
	};

	handlePause = () => {
		if (this.state.running) {
			clearInterval(this.interval);
			this.setState({
				running: false
			});
		}
	};

	handleStop = () => {
		this.handlePause();
		this.openStopDialog();
	};

	openStopDialog = () => {
		this.setState({
			openStopDialog: true,
		});
	};

	closeStopDialog = () => {
		this.setState({
			openStopDialog: false,
		});
	};

	finishExecution = () => {
		this.update(0, 0, 0, 0);
		this.props.onStop();
	};

	tick = () => {
		let allSeconds = this.state.allSeconds;
		let seconds = this.state.seconds + 1;
		let minutes = this.state.minutes;
		let hours = this.state.hours;

		if (seconds === 60) {
			seconds = 0;
			minutes = minutes + 1;
		}

		if (minutes === 60) {
			seconds = 0;
			minutes = 0;
			hours = hours + 1;
		}

		this.update(hours, minutes, seconds, allSeconds+1);
	};

	zeroPad = (value) => {
		return value < 10 ? `0${value}` : value;
	};

	update = (hours, minutes, seconds, allSeconds) => {
		this.setState({
			hours: hours,
			minutes: minutes,
			seconds: seconds,
			allSeconds: allSeconds,
		});
	};

	render() {
		let run = this.state.running === true;
		const {classes} = this.props;

		return (
			<div className={classes.container}>
				<div className={classes.stopwatch}>
					{this.zeroPad(this.state.hours)}:{this.zeroPad(this.state.minutes)}:{this.zeroPad(this.state.seconds)}
				</div>

				<div className={classes.buttons}>
					<Button
						variant="contained"
						color="primary"
						className={classes.button + (run ? " " + classes.buttonInactive : "")}
						onClick={() => this.handleStart(this.props)}>
						Старт
					</Button>

					<Button
						variant="contained"
						color="primary"
						className={classes.button + (!run ? " " + classes.buttonInactive : "")}
						onClick={this.handlePause}>
						Пауза
					</Button>

					<Button
						variant="contained"
						color="primary"
						className={classes.button + (this.state.allSeconds > 0 ? "" : " " + classes.buttonInactive)}
						onClick={this.handleStop}>
						Завершить
					</Button>
				</div>

				<StopExecutionDialog
					onClose={this.closeStopDialog}
					open={this.state.openStopDialog}
					onDisagree={() => this.handleStart(this.props)}
					onAgree={this.finishExecution}/>
			</div>
		)
	}
}

export default withRoot(withStyles(styles)(Stopwatch));