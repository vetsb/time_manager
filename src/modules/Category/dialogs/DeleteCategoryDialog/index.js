import React from 'react';
import SimpleDialog from "../../../../components/SimpleDialog";

const DeleteCategoryDialog = (props) => {
	return <SimpleDialog
		onClose={props.onClose}
		open={props.open}
		title="Удаление категории"
		text="Вы уверены, что хотите удалить данную категории?<br /><br />Все задачи, содержащиеся в этой категории, будут удалены."
		onClickNegativeButton={props.onClose}
		onClickPositiveButton={() => {props.onAgree(); props.onClose()}}
	/>
};

export default DeleteCategoryDialog;