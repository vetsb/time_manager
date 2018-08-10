import React from 'react';
import SimpleDialog from "../../../../components/SimpleDialog";

const DeleteCategoriesDialog = (props) => {
	return <SimpleDialog
		onClose={props.onClose}
		open={props.open}
		title="Удаление категорий"
		text="Вы уверены, что хотите удалить выбранные категории?"
		onClickNegativeButton={props.onClose}
		onClickPositiveButton={() => {props.onAgree(); props.onClose()}}
	/>
};

export default DeleteCategoriesDialog;