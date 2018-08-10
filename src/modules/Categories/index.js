import React, {Component} from 'react';

import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {withStyles} from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';

import withRoot from "../../utils/withRoot";
import styles from './styles';
import MAppBar from '../../components/MAppBar';

import EmptyListLabel from '../../components/EmptyListLabel';
import Progress from '../../components/Progress';
import CategoryItem from "./components/CategoryItem";

import store from '../../store';
import {addCategory, deleteCategories, editCategory, fetchCategories} from "./store/actionCreator";
import AddCategoryDialog from "./dialogs/AddCategoryDialog";
import DeleteCategoriesDialog from "./dialogs/DeleteCategoriesDialog";

class Categories extends Component {
	state = {
		categories: [],
		loading: true,
		openDialogs: {
			addCategory: false,
			editCategory: false,
			deleteCategories: false,
		},
		visibleCheckboxes: false,
		checked: [],
		editCategoryId: 0,
	};

	componentDidMount() {
		this.props.fetchCategories();

		this.unsubscibe = store.subscribe(() => {
			this.setState({
				categories: store.getState().categories,
				loading: false,
			});
		});
	}

	componentWillUnmount() {
		this.unsubscibe();
	}

	renderAppBar = () => {
		return (
			<MAppBar
				title="Категории"
				history={this.props.history}
				buttons={[
					{
						onClick: this.toggleCheckboxes,
						icon: this.state.visibleCheckboxes ? (
							this.state.checked.length === 0 ? <DoneIcon /> : <DeleteIcon />
						) : <EditIcon />
					},
					{
						onClick: this.openAddCategoryDialog,
						icon: <AddIcon />
					}
				]}/>
		)
	};

	addCategory = category => {
		this.props.addCategory(category);
	};

	editCategory = category => {
		this.props.editCategory(category);
	};

	deleteCategories = () => {
		this.props.deleteCategories(this.state.checked);
		this.setState({
			checked: [],
			visibleCheckboxes: false,
		});
	};

	openAddCategoryDialog = () => {
		this.setState({
			openDialogs: {
				...this.state.openDialogs,
				addCategory: true,
			}
		})
	};

	closeAddCategoryDialog = () => {
		this.setState({
			openDialogs: {
				...this.state.openDialogs,
				addCategory: false,
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
			editCategoryId: 0,
		})
	};

	openDeleteCategoriesDialog = () => {
		this.setState({
			openDialogs: {
				...this.state.openDialogs,
				deleteCategories: true,
			}
		})
	};

	closeDeleteCategoriesDialog = () => {
		this.setState({
			openDialogs: {
				...this.state.openDialogs,
				deleteCategories: false,
			}
		})
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
				this.openDeleteCategoriesDialog();
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
		this.props.history.push('/categories/' + id);
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
			editCategoryId: id,
		}, this.openEditCategoryDialog);
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
					{this.state.categories.length === 0 ? (
						<EmptyListLabel/>
					) : (
						this.state.categories.map((item) => {
							return (
								<CategoryItem
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

				<AddCategoryDialog
					onClose={this.closeAddCategoryDialog}
					open={this.state.openDialogs.addCategory}
					onSubmit={this.addCategory}/>

				{this.state.editCategoryId !== 0 ? (
					<AddCategoryDialog
						category={this.state.categories.filter(item => item.id === this.state.editCategoryId)[0]}
						onClose={this.closeEditCategoryDialog}
						open={this.state.openDialogs.editCategory}
						onSubmit={this.editCategory}/>
				) : null}

				<DeleteCategoriesDialog
					onClose={this.closeDeleteCategoriesDialog}
					open={this.state.openDialogs.deleteCategories}
					onAgree={this.deleteCategories}/>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		categories: state.categories
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchCategories: fetchCategories,
		addCategory: addCategory,
		deleteCategories: deleteCategories,
		editCategory: editCategory,
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(Categories))));