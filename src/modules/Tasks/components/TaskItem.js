import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/es/ListItemSecondaryAction/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";

const styles = () => ({
	item: {
		background: "#FFF"
	},
});

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

export default withStyles(styles)(TaskItem);