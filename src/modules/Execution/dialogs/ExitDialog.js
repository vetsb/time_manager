import React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import Button from "@material-ui/core/Button";

const ExitDialog = (props) => {
	return (
		<Dialog
			onClose={props.onClose}
			open={props.open}>
			<DialogTitle>Внимание!</DialogTitle>

			<DialogContent>
				<DialogContentText>
					Вы покидаете страницу выполнения задачи. Выполнение будет поставлено на паузу. Если вам необходимо перейти на другую страницу, откройте ее в новой вкладке.
					<br /><br />
					Вы уверены, что хотите покинуть страницу?
				</DialogContentText>
			</DialogContent>

			<DialogActions>
				<Button onClick={props.onClose} color="primary">Нет</Button>
				<Button onClick={() => {props.onAgree(); props.onClose();}} color="primary" autoFocus>Да</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ExitDialog;