import React from 'react';
import SimpleDialog from "../../../components/SimpleDialog";

const DeleteTaskDialog = (props) => {
	return <SimpleDialog
		onClose={props.onClose}
		open={props.open}
		title="Удаление задачи"
		text="Вы уверены, что хотите удалить эту задачу?"
		onClickNegativeButton={props.onClose}
		onClickPositiveButton={props.onAgree}
	/>
};

export default DeleteTaskDialog;