import React, {Component} from 'react';

import List from "@material-ui/core/List";

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';

import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {addTask, deleteTasks, editTask, fetchTasks} from './store/actionCreator';
import store from '../../store';
import AddTaskDialog from "./dialogs/AddTaskDialog";

import EmptyListLabel from '../../components/EmptyListLabel';
import DeleteTasksDialog from "./dialogs/DeleteTasksDialog";
import TaskItem from "./components/TaskItem";

import MAppBar from '../../components/MAppBar';
import Progress from '../../components/Progress';

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
		editTaskId: 0,
	};

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
			editTaskId: 0
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



	handleEdit = (id) => {
		this.setState({
			editTaskId: id,
		}, this.openEditTaskDialog);
	};

	renderAppBar = () => {
		return (
			<MAppBar
				title="Задачи"
				history={this.props.history}
				buttons={[
					{
						onClick: this.toggleCheckboxes,
						icon: this.state.visibleCheckboxes ? (
							this.state.checked.length === 0 ? <DoneIcon /> : <DeleteIcon />
						) : <EditIcon />
					},
					{
						onClick: this.openAddTaskDialog,
						icon: <AddIcon />
					}
				]}/>
		);
	};

	render() {
		if (this.state.loading) {
			return (
				<React.Fragment>
					{this.renderAppBar()}
					<Progress />
				</React.Fragment>
			)
		}

		return (
			<React.Fragment>
				{this.renderAppBar()}

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

				{this.state.editTaskId !== 0 ? (
					<AddTaskDialog
						task={this.state.tasks.filter(item => item.id === this.state.editTaskId)[0]}
						onClose={this.closeEditTaskDialog}
						open={this.state.openDialogs.editTask}
						onSubmit={this.editTask}/>
				) : null}

				<DeleteTasksDialog
					onClose={this.closeDeleteTasksDialog}
					open={this.state.openDialogs.deleteTasks}
					onAgree={this.deleteTasks}/>
			</React.Fragment>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tasks));
