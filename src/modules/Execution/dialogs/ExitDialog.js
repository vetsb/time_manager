import React from 'react';
import SimpleDialog from "../../../components/SimpleDialog";

const ExitDialog = (props) => {
	return <SimpleDialog
		onClose={props.onClose}
		open={props.open}
		title="Внимание!"
		text="Вы покидаете страницу выполнения задачи. Выполнение будет поставлено на паузу. Если вам необходимо перейти на другую страницу, откройте ее в новой вкладке.<br /><br />Вы уверены, что хотите покинуть страницу?"
		onClickNegativeButton={props.onClose}
		onClickPositiveButton={() => {props.onAgree(); props.onClose()}}
	/>
};

export default ExitDialog;