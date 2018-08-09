import React from 'react';
import SimpleDialog from "../../../../components/SimpleDialog/index";

const DeleteTasksDialog = (props) => {
	return <SimpleDialog
		onClose={props.onClose}
		open={props.open}
		title="Удаление задач"
		text="Вы уверены, что хотите удалить выбранные задачи?"
		onClickNegativeButton={props.onClose}
		onClickPositiveButton={() => {props.onAgree(); props.onClose()}}
	/>
};

export default DeleteTasksDialog;