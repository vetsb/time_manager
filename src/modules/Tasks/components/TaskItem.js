import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import {secondsToTimeWithMeasure} from "../../../utils/timeFormatter";
import {getDeadlineSeconds, getLeftSeconds, getSpendSeconds} from "../../Task/js/secondsFormatter";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';

const handleMouseup = () => {
	clearTimeout(this.pressTimer);

	return false;
};

const handleMousedown = (props, id) => {
	this.pressTimer = window.setTimeout(() => {
		props.onLongPress(id);
	}, 400);

	return false;
};

const handleClick = (props, id) => {
	if (props.visibleCheckbox) {
		props.onChange(id);
	} else {
		props.onClick(id);
	}
};

const renderSecondaryText = (item) => {
	const leftSeconds = getLeftSeconds(item);
	const spendSeconds = getSpendSeconds(item);
	const deadlineSeconds = getDeadlineSeconds(item);

	if (spendSeconds === 0) {
		return "Ещё не начиналось";
	}

	if (leftSeconds === 0) {
		const overtime = spendSeconds - deadlineSeconds;

		if (overtime === 0) {
			return "Завершено";
		}

		return (
			<React.Fragment>
				Завершено
				&nbsp;
				<i>(Переработка {secondsToTimeWithMeasure(overtime)})</i>
			</React.Fragment>
		);
	}

	return secondsToTimeWithMeasure(leftSeconds);
};

const TaskItem = (props) => {
	const {item, checked, visibleCheckbox} = props;

	return (
		<ListItem
			button
			key={item.id}
			onMouseUp={handleMouseup}
			onMouseDown={() => handleMousedown(props, item.id)}
			onClick={() => handleClick(props, item.id)}>
			<ListItemText primary={item.title} secondary={renderSecondaryText(item)}/>

			<ListItemSecondaryAction>
				{visibleCheckbox ? (
					<Checkbox
						checked={checked}
						onChange={() => props.onChange(item.id)}/>
				) : (
					<IconButton
						onClick={() => props.onEdit(item)}>
						<EditIcon />
					</IconButton>
				)}
			</ListItemSecondaryAction>

		</ListItem>
	)
};

export default TaskItem;