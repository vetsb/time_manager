import React, {Component} from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import {withStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import {MEASURES} from '../../../../constants/measures';
import formDataEntries from 'form-data-entries';

import dateformat from 'dateformat';
import styles from './styles';
import PropTypes from 'prop-types';
import store from '../../../../store';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import withRoot from "../../../../utils/withRoot";
import {fetchCategories} from "../../../Categories/store/actionCreator";
import {bindActionCreators} from "redux";

class AddTaskDialog extends Component {
	form = React.createRef();
	defaultTask = {
		measure: 2,
		categoryId: 0,
	};
	state = {
		task: this.defaultTask,
		categories: [],
		isEdit: false,
	};

	componentDidMount() {
		const {task} = this.props;

		if (task !== undefined) {
			this.setState({
				task: this.props.task,
				isEdit: true,
			});
		}

		this.props.fetchCategories();

		this.unsubscribe = store.subscribe(() => {
			this.setState({
				categories: store.getState().categories
			});
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	handleMeasure = event => {
		this.setState({
			task: {
				...this.state.task,
				measure: event.target.value,
			}
		});
	};

	handleCategory = event => {
		this.setState({
			task: {
				...this.state.task,
				categoryId: event.target.value,
			}
		});
	};

	submit = () => {
		let task = Object.assign({}, this.state.task);

		for (const [name, value] of formDataEntries(this.form.current)) {
			task[name] = value;
		}

		task.time = parseFloat(task.time) || 0;
		task.deadline = parseInt(Date.parse(task.deadline)/1000, 10) || 0;
		task.measure = parseInt(task.measure, 10);
		task.categoryId = parseInt(task.categoryId, 10);

		if (task.title.trim().length !== 0) {
			this.setState({
				task: this.props.task === undefined ? this.defaultTask : task
			});

			this.props.onSubmit(task);
			this.props.onClose();
		}
	};

	handleEnter = (task) => {
		if (task !== undefined) {
			this.setState({
				task: task,
				isEdit: true,
			});
		}
	};

	render() {
		const {classes} = this.props;
		const {task, isEdit, categories} = this.state;

		return (
			<Dialog
				onClose={this.props.onClose}
				open={this.props.open}
				onEntering={() => this.handleEnter(this.props.task)}
				classes={{
					paper: classes.paper
				}}>
				<DialogTitle>
					{isEdit ? "Редактирование задачи" : "Новая задача"}
				</DialogTitle>

				<DialogContent
					className={classes.dialogContent}>
					<form ref={this.form}>
						<TextField
							name="title"
							label="Название"
							margin="normal"
							fullWidth
							autoFocus
							defaultValue={isEdit ? task.title : ""}/>

						<TextField
							name="description"
							label="Описание"
							margin="normal"
							fullWidth
							multiline
							rows="4"
							defaultValue={isEdit ? task.description : ""}/>

						<TextField
							select
							name="categoryId"
							label="Категория"
							margin="normal"
							fullWidth
							onChange={this.handleCategory}
							value={task.categoryId}>
							<MenuItem value={0} key={0}>Не указана</MenuItem>
							{categories.length > 0 ?
								categories.map(item => {
									return <MenuItem value={item.id} key={item.id}>{item.title}</MenuItem>
								})
								:
								null
							}
						</TextField>

						<Grid container spacing={24}>
							<Grid item xs={12} sm={8}>
								<TextField
									name="time"
									label="Время выполнения"
									margin="normal"
									fullWidth
									defaultValue={isEdit ? task.time : ""}/>
							</Grid>

							<Grid item xs={12} sm={4}>
								<TextField
									select
									name="measure"
									label="Ед. измерения"
									margin="normal"
									value={task.measure}
									onChange={this.handleMeasure}
									fullWidth>
									{MEASURES.map((item, key) => {
										return (
											<MenuItem key={item} value={key}>
												{item}
											</MenuItem>
										)
									})}
								</TextField>
							</Grid>
						</Grid>

						<TextField
							type="datetime-local"
							name="deadline"
							label="Крайний срок"
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
							fullWidth
							defaultValue={task === undefined || task.deadline === undefined || task.deadline === 0 ? null : dateformat(new Date(parseInt(task.deadline, 10)*1000), 'yyyy-mm-dd"T"HH:MM')}/>
					</form>
				</DialogContent>

				<DialogActions>
					<Button onClick={this.props.onClose} color="primary">Отмена</Button>

					<Button onClick={this.submit} color="primary">
						{isEdit ? "Сохранить" : "Добавить"}
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

AddTaskDialog.propTypes = {
	task: PropTypes.object,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
	return {
		categories: state.categories
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchCategories: fetchCategories,
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(AddTaskDialog))));