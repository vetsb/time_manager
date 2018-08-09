import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';

import CircularProgress from "@material-ui/core/CircularProgress";

import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {addTask, deleteTasks, editTask, fetchTasks} from './actionCreator';
import withRoot from "../../utils/withRoot";
import store from '../../store';
import AddTaskDialog from "./dialogs/AddTaskDialog/index";

import EmptyListLabel from '../../components/EmptyListLabel/index';
import DeleteTasksDialog from "./dialogs/DeleteTasksDialog/index";
import TaskItem from "./components/TaskItem";
import styles from './styles';

class Tasks extends Component {
	state = {
		tasks: [],
		loading: true,
		visibleCheckboxes: false,
		checked: [],
		openDialogs: {
			addTask: false,
			editTask: false,
			deleteTasks: false,
		},
		editTask: {},
	};

	pressTimer = null;

	componentDidMount() {
		this.props.fetchTasks();

		this.unsubscibe = store.subscribe(() => {
			this.setState({
				tasks: store.getState().tasks,
				loading: false,
			});
		});
	}

	componentWillUnmount() {
		this.unsubscibe();
	}



	addTask = task => {
		this.props.addTask(task);
	};

	editTask = task => {
		this.props.editTask(task);
	};

	deleteTasks = () => {
		this.props.deleteTasks(this.state.checked);
		this.setState({
			checked: [],
			visibleCheckboxes: false,
		});
	};



	openAddTaskDialog = () => {
		this.setState({
			openDialogs: {
				...this.state.openDialogs,
				addTask: true,
			}
		});
	};

	closeAddTaskDialog = () => {
		this.setState({
			openDialogs: {
				...this.state.openDialogs,
				addTask: false,
			}
		});
	};

	openDeleteTasksDialog = () => {
		this.setState({
			openDialogs: {
				...this.state.openDialogs,
				deleteTasks: true,
			}
		});
	};

	closeDeleteTasksDialog = () => {
		this.setState({
			openDialogs: {
				...this.state.openDialogs,
				deleteTasks: false,
			}
		});
	};

	openEditTaskDialog = () => {
		this.setState({
			openDialogs: {
				...this.state.openDialogs,
				editTask: true,
			}
		});
	};

	closeEditTaskDialog = () => {
		this.setState({
			openDialogs: {
				...this.state.openDialogs,
				editTask: false,
			},
			editTask: {}
		});
	};



	handleCheckboxChange = (id) => {
		const {checked} = this.state;
		const newChecked = [...checked];
		const currentIndex = checked.indexOf(id);

		if (currentIndex === -1) {
			newChecked.push(id);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		this.setState({
			checked: newChecked
		});
	};

	toggleCheckboxes = () => {
		if (this.state.visibleCheckboxes) {
			if (this.state.checked.length > 0) {
				this.openDeleteTasksDialog();
			} else {
				this.setState({
					visibleCheckboxes: false
				});
			}
		} else {
			this.setState({
				visibleCheckboxes: !this.state.visibleCheckboxes
			});
		}
	};

	linkToTask = (id) => {
		this.props.history.push('/' + id);
	};



	handleTaskLongPress = (id) => {
		this.showCheckboxes();
		this.checkItem(id);
	};

	showCheckboxes = () => {
		this.setState({
			visibleCheckboxes: true
		});
	};

	checkItem = (id) => {
		this.setState({
			checked: [
				...this.state.checked,
				id
			]
		})
	};



	handleEdit = (task) => {
		this.setState({
			editTask: task,
		}, this.openEditTaskDialog);
	};


	render() {
		const { classes } = this.props;

		if (this.state.loading) {
			return (
				<div className={classes.progressContainer}>
					<CircularProgress size={60} />
				</div>
			);
		}

		return (
			<Grid className={classes.wrapper}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="title" color="inherit" className={classes.toolbarTitle}>
							Задачи
						</Typography>
						<div className={classes.toolbarButtons}>
							<IconButton
								aria-haspopup="true"
								color="inherit"
								onClick={this.toggleCheckboxes}>
								{this.state.visibleCheckboxes ? (
									this.state.checked.length === 0 ? <DoneIcon /> : <DeleteIcon />
								) : <EditIcon />}
							</IconButton>

							<IconButton
								aria-haspopup="true"
								color="inherit"
								onClick={this.openAddTaskDialog}>
								<AddIcon />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>

				<List>
					{this.state.tasks.length === 0 ? (
						<EmptyListLabel/>
					) : (
						this.state.tasks.map((item) => {
							return (
								<TaskItem
									key={item.id}
									item={item}
									visibleCheckbox={this.state.visibleCheckboxes}
									checked={this.state.checked.indexOf(item.id) !== -1}
									onLongPress={this.handleTaskLongPress}
									onClick={this.linkToTask}
									onChange={this.handleCheckboxChange}
									onEdit={this.handleEdit}/>
							);
						})
					)}
				</List>

				<AddTaskDialog
					onClose={this.closeAddTaskDialog}
					open={this.state.openDialogs.addTask}
					onSubmit={this.addTask}/>

				{this.state.editTask.id !== undefined ? (
					<AddTaskDialog
						task={this.state.editTask}
						onClose={this.closeEditTaskDialog}
						open={this.state.openDialogs.editTask}
						onSubmit={this.editTask}/>
				) : null}

				<DeleteTasksDialog
					onClose={this.closeDeleteTasksDialog}
					open={this.state.openDialogs.deleteTasks}
					onAgree={this.deleteTasks}/>
			</Grid>
		);
	}
}

function mapStateToProps(state) {
	return {
		tasks: state.tasks
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchTasks: fetchTasks,
		addTask: addTask,
		deleteTasks: deleteTasks,
		editTask: editTask
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(Tasks))));
