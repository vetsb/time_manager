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
import formDataEntries from 'form-data-entries/index';

import dateformat from 'dateformat';
import styles from './styles';

class AddTaskDialog extends Component {
	form = React.createRef();
	state = {
		task: undefined,
	};

	componentDidMount() {
		this.setState({
			task: this.props.task
		});
	}

	handleMeasure = event => {
		this.setState({
			task: {
				...this.state.task,
				measure: MEASURES.indexOf(event.target.value),
			}
		});
	};

	submit = () => {
		let task = Object.assign({}, this.state.task);

		for (const [name, value] of formDataEntries(this.form.current)) {
			task[name] = value;
		}

		task.time = parseInt(task.time, 10) || 0;
		task.measure = MEASURES.indexOf(task.measure);
		task.deadline = parseInt(Date.parse(task.deadline)/1000, 10) || 0;

		if (task.title.trim().length !== 0) {
			this.setState({
				task: this.props.task === undefined ? undefined : task
			});

			this.props.onSubmit(task);
			this.props.onClose();
		}
	};

	handleEnter = (task) => {
		this.setState({
			task: task
		});
	};

	render() {
		const {classes} = this.props;
		const {task} = this.state;
		const isEdit = task !== undefined;

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

						<Grid container spacing={24}>
							<Grid item xs={12} sm={9}>
								<TextField
									name="time"
									label="Время выполнения"
									margin="normal"
									fullWidth
									defaultValue={isEdit ? task.time : ""}/>
							</Grid>

							<Grid item xs={12} sm={3}>
								<TextField
									select
									name="measure"
									label="Ед. измерения"
									margin="normal"
									value={isEdit ? MEASURES[task.measure] : MEASURES[2]}
									onChange={this.handleMeasure}
									fullWidth>
									{MEASURES.map(item => {
										return (
											<MenuItem key={item} value={item}>
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
							defaultValue={task === undefined || task.deadline === 0 ? null : dateformat(new Date(parseInt(task.deadline, 10)*1000), 'yyyy-mm-dd"T"HH:MM')}/>
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

export default withStyles(styles)(AddTaskDialog);