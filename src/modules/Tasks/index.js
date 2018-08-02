import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';

import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {addTask, deleteTasks, fetchTasks} from './actionCreator';
import withRoot from "../../utils/withRoot";
import store from '../../store';
import AddTaskDialog from "./dialogs/AddTaskDialog";

const styles = theme => ({
	wrapper: {
		maxWidth: 360,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	listItem: {
		background: "#FFF"
	},
	title: {
		flex: 1
	},
	buttons: {
		marginRight: -12
	}
});

class Tasks extends Component {
	constructor() {
		super();

		this.state = {
			tasks: null,
			visibleCheckboxes: false,
			checked: [],
			openDialog: false,
		};

		this.pressTimer = null;
	}

	componentDidMount() {
		fetchTasks();

		this.unsubscibe = store.subscribe(() => {
			this.setState({
				tasks: store.getState().tasks
			});
		});
	}

	componentWillUnmount() {
		this.unsubscibe();
	}

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

	addTask = task => {
		this.props.addTask(task);
	};

	openAddTaskDialog = () => {
		this.setState({
			openDialog: true,
		});
	};

	closeAddTaskDialog = () => {
		this.setState({
			openDialog: false,
		});
	};

	toggleCheckboxes = () => {
		if (this.state.visibleCheckboxes) {
			this.props.deleteTasks(this.state.checked);
			this.setState({
				checked: []
			});
		}

		this.setState({
			visibleCheckboxes: !this.state.visibleCheckboxes
		});
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

	handleMouseup = () => {
		clearTimeout(this.pressTimer);

		return false;
	};

	handleMousedown = (id) => {
		this.pressTimer = window.setTimeout(() => {
			this.showCheckboxes();
			this.checkItem(id);
		}, 400);

		return false;
	};

	render() {
		const { classes } = this.props;

		return (
			<Grid className={classes.wrapper}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="title" color="inherit" className={classes.title}>
							Задачи
						</Typography>
						<div className={classes.buttons}>
							{this.state.tasks === null || this.state.tasks.length === 0 ? null : (
								<IconButton
									aria-haspopup="true"
									color="inherit"
									onClick={this.toggleCheckboxes}>
									{this.state.visibleCheckboxes ? (
										this.state.checked.length === 0 ? <DoneIcon /> : <DeleteIcon />
									) : <EditIcon />}
								</IconButton>
							)}

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
					{this.state.tasks === null ? (
						"Загрузка"
					) : (
						this.state.tasks.length === 0 ? (
							"Нет задач"
						) : (
							this.state.tasks.map((item) => {
								const checked = this.state.checked.indexOf(item.id) !== -1;

								return (
									<ListItem
										button
										key={item.id}
										className={classes.listItem}
										onMouseUp={this.handleMouseup}
										onMouseDown={() => this.handleMousedown(item.id)}>
										<ListItemText primary={item.title}/>

										{this.state.visibleCheckboxes ? (
											<ListItemSecondaryAction>
												<Checkbox
													checked={checked}
													onChange={() => this.handleCheckboxChange(item.id)}/>
											</ListItemSecondaryAction>
										) : null}
									</ListItem>
								)
							})
						)
					)}
				</List>

				<AddTaskDialog
					onClose={this.closeAddTaskDialog}
					open={this.state.openDialog}
					add={this.addTask}/>
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
	return bindActionCreators({fetchTasks: fetchTasks, addTask: addTask, deleteTasks: deleteTasks}, dispatch);
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(Tasks))));
