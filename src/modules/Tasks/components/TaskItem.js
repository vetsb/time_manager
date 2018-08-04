import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";

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

const TaskItem = (props) => {
	const {item, checked, visibleCheckbox, classes} = props;

	return (
		<ListItem
			button
			key={item.id}
			className={classes.item}
			onMouseUp={handleMouseup}
			onMouseDown={() => handleMousedown(props, item.id)}
			onClick={() => handleClick(props, item.id)}>
			<ListItemText primary={item.title}/>

			{visibleCheckbox ? (
				<ListItemSecondaryAction>
					<Checkbox
						checked={checked}
						onChange={() => props.onChange(item.id)}/>
				</ListItemSecondaryAction>
			) : null}
		</ListItem>
	)
};

export default TaskItem;