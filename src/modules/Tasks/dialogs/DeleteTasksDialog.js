import React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import Button from "@material-ui/core/Button";

const DeleteTasksDialog = (props) => {
	return (
		<Dialog
			onClose={props.onClose}
			open={props.open}>
			<DialogTitle>Удаление задач</DialogTitle>

			<DialogContent>
				<DialogContentText>
					Вы уверены, что хотите удалить выбранные задачи?
				</DialogContentText>
			</DialogContent>

			<DialogActions>
				<Button onClick={props.onClose} color="primary">Нет</Button>
				<Button onClick={() => {props.onAgree(); props.onClose();}} color="primary" autoFocus>Да</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteTasksDialog;