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

import MEASURES from '../../../constants/measures';
import formDataEntries from 'form-data-entries';

const styles = () => ({
	dialogContent: {
		width: 600
	}
});

class AddTaskDialog extends Component {
	state = {
		task: {
			measure: MEASURES[2]
		}
	};
	form = React.createRef();

	handleMeasure = event => {
		this.setState({
			task: {
				measure: event.target.value,
			}
		})
	};

	addTask = () => {
		let task = {};

		for (const [name, value] of formDataEntries(this.form.current)) {
			task[name] = value;
		}

		this.setState({
			task: task
		});

		if (task.title.trim().length !== 0) {
			this.props.add(task);
			this.props.onClose();
		}
	};

	render() {
		const {classes} = this.props;
		const {task} = this.state;

		return (
			<Dialog
				onClose={this.props.onClose}
				open={this.props.open}>
				<DialogTitle>Новая задача</DialogTitle>

				<DialogContent
					className={classes.dialogContent}>
					<form ref={this.form}>
						<TextField
							name="title"
							label="Название"
							margin="normal"
							fullWidth
							autoFocus/>

						<TextField
							name="description"
							label="Описание"
							margin="normal"
							fullWidth
							multiline
							rows="4"/>

						<Grid container spacing={24}>
							<Grid item xs={12} sm={9}>
								<TextField
									name="time"
									label="Время выполнения"
									margin="normal"
									fullWidth/>
							</Grid>

							<Grid item xs={12} sm={3}>
								<TextField
									select
									name="measure"
									label="Ед. измерения"
									margin="normal"
									value={task.measure}
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
							fullWidth/>
					</form>
				</DialogContent>

				<DialogActions>
					<Button onClick={this.props.onClose} color="primary">Отмена</Button>

					<Button onClick={this.addTask} color="primary">Добавить</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

export default withStyles(styles)(AddTaskDialog);