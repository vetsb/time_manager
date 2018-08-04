import React from 'react';

import {withStyles} from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/es/TextField/TextField";

import formDataEntries from 'form-data-entries/index';

const styles = () => ({
	paper: {
		width: '100%',
	}
});

const agree = (props, form) => {
	let data = {};

	for (const [name, value] of formDataEntries(form.current)) {
		data[name] = value;
	}

	props.onAgree(data);
	props.onClose();
};

const StopExecutionDialog = (props) => {
	const form = React.createRef();
	const {classes} = props;

	return (
		<Dialog
			onClose={props.onClose}
			open={props.open}
			classes={{
				paper: classes.paper
			}}>
			<DialogTitle>Завершение выполнения</DialogTitle>

			<DialogContent>
				<form ref={form}>
					<TextField
						multiline
						name="description"
						label="Что вы сделали за это время?"
						rows={6}
						fullWidth
						autoFocus/>
				</form>
			</DialogContent>

			<DialogActions>
				<Button onClick={() => {props.onClose()}} color="primary">Отмена</Button>
				<Button onClick={() => {agree(props, form)}} color="primary">Завершить</Button>
			</DialogActions>
		</Dialog>
	);
};

export default withStyles(styles)(StopExecutionDialog);