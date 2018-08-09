import React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import Button from "@material-ui/core/Button";

import PropTypes from 'prop-types';

const SimpleDialog = (props) => {
	return (
		<Dialog
			onClose={props.onClose}
			open={props.open}>
			<DialogTitle>{props.title}</DialogTitle>

			<DialogContent>
				<DialogContentText dangerouslySetInnerHTML={{__html: props.text}}/>
			</DialogContent>

			<DialogActions>
				<Button onClick={props.onClickNegativeButton} color="primary">{props.negativeButton}</Button>
				<Button onClick={props.onClickPositiveButton} color="primary" autoFocus>{props.positiveButton}</Button>
			</DialogActions>
		</Dialog>
	);
};

SimpleDialog.defaultProps = {
	negativeButton: "Нет",
	positiveButton: "Да"
};

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	negativeButton: PropTypes.string,
	positiveButton: PropTypes.string,
	onClickNegativeButton: PropTypes.func,
	onClickPositiveButton: PropTypes.func,
};

export default SimpleDialog;