import React, {Component} from 'react';

import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import MAppBar from '../../components/MAppBar';
import Progress from '../../components/Progress';
import EmptyListLabel from '../../components/EmptyListLabel';

import store from '../../store';
import styles from './styles';
import {deleteCategory, deleteTasks, getCategory} from "./store/actionCreator";
import TaskItem from "../Tasks/components/TaskItem";
import AddCategoryDialog from "../Categories/dialogs/AddCategoryDialog";
import DeleteTasksDialog from "../Tasks/dialogs/DeleteTasksDialog";
import DeleteCategoryDialog from "./dialogs/DeleteCategoryDialog/index";
import {editCategory} from "../Categories/store/actionCreator";

class Category extends Component {
	state = {
		category: {},
		loading: true,
		checked: [],
		visibleCheckbox: false,
		openDialogs: {
			deleteTasks: false,
			deleteCategory: false,
			editCategory: false,
		}
	};

	componentDidMount() {
		this.props.getCategory(this.props.match.params.id);

		this.unsubscribe = store.subscribe(() => {
			this.setState({
				category: store.getState().category,
				loading: false,
			});
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	openDeleteTasksDialog = () => {
		this.setState({
			openDialogs: {
				...this.state.openDialogs,
				deleteTasks: true,
			}
		})
	};

	closeDeleteTasksDialog = () => {
		this.setState({
			openDialogs: {
				...this.state.openDialogs,
				deleteTasks: false,
			}
		})
	};

	openEditCategoryDialog = () => {
		this.setState({
			openDialogs: {
				...this.state.openDialogs,
				editCategory: true,
			}
		})
	};

	closeEditCategoryDialog = () => {
		this.setState({
			openDialogs: {
				...this.state.openDialogs,
				editCategory: false,
			},
		})
	};

	openDeleteCategoryDialog = () => {
		this.setState({
			openDialogs: {
				...this.state.openDialogs,
				deleteCategory: true,
			}
		})
	};

	closeDeleteCategoryDialog = () => {
		this.setState({
			openDialogs: {
				...this.state.openDialogs,
				deleteCategory: false,
			},
		})
	};

	renderAppBar = () => {
		return (
			<MAppBar
				hasBackArrow={true}
				title="Категория"
				history={this.props.history}
				buttons={[
					{
						onClick: this.openEditCategoryDialog,
						icon: <EditIcon />
					},
					{
						onClick: this.openDeleteCategoryDialog,
						icon: <DeleteIcon />
					},
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

	onClickDelete = () => {
		this.openDeleteTasksDialog();
	};

	editCategory = (category) => {
		this.props.editCategory(category);
	};

	deleteCategory = () => {
		this.props.deleteCategory(this.state.category.id);
	};

	deleteTasks = () => {
		this.props.deleteTasks(this.state.checked);
		this.setState({
			checked: [],
			visibleCheckboxes: false,
		});
	};

	render() {
		const {classes} = this.props;
		const {category} = this.state;
		const categoryFound = category.id !== undefined;

		if (this.state.loading) {
			return (
				<React.Fragment>
					{this.renderAppBar()}
					<Progress />
				</React.Fragment>
			)
		}

		if (categoryFound) {
			return (
				<React.Fragment>
					{this.renderAppBar()}

					<div className={classes.inner}>
						<div className={classes.container}>
							<Typography variant="headline">
								{category.title}
							</Typography>
						</div>

						<List>
							<ListItem>
								<ListItemText
									primary="Описание"
									secondary={category.description.length > 0 ? category.description : "Отсутствует"}/>
							</ListItem>

							<ListItem>
								<ListItemText
									primary="Стоимость часа работы"
									secondary={category.rate ? category.rate : "Не указана"}/>
							</ListItem>
						</List>

						<div className={classes.container}>
							<Typography
								variant="title"
								className={classes.title}>
								<span className={classes.titleSpan}>Задачи в данной категории</span>

								{this.state.checked.length > 0 ? (
									<IconButton
										onClick={this.onClickDelete}>
										<DeleteIcon />
									</IconButton>
								) : null}
							</Typography>
						</div>

						{category.tasks.length > 0 ? (
							<List>
								{category.tasks.map(item => {
									return (
										<TaskItem
											key={item.id}
											item={item}
											visibleCheckbox={this.state.visibleCheckboxes}
											visibleSecondaryText={false}
											checked={this.state.checked.indexOf(item.id) !== -1}
											onLongPress={this.handleTaskLongPress}
											onClick={this.linkToTask}
											onChange={this.handleCheckboxChange}/>
									)
								})}
							</List>
						) : (
							<List>
								<EmptyListLabel style={{textAlign: 'left'}}/>
							</List>
						)}
					</div>

					<AddCategoryDialog
						category={category}
						onClose={this.closeEditCategoryDialog}
						open={this.state.openDialogs.editCategory}
						onSubmit={this.editCategory}/>

					<DeleteCategoryDialog
						onClose={this.closeDeleteCategoryDialog}
						open={this.state.openDialogs.deleteCategory}
						onAgree={this.deleteCategory}/>

					<DeleteTasksDialog
						onClose={this.closeDeleteTasksDialog}
						open={this.state.openDialogs.deleteTasks}
						onAgree={this.deleteTasks}/>
				</React.Fragment>
			)
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
		category: state.category
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getCategory: getCategory,
		deleteTasks: deleteTasks,
		editCategory: editCategory,
		deleteCategory: deleteCategory
	}, dispatch);
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Category)));