import React from 'react';

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import {withStyles} from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';

import PropTypes from 'prop-types';
import styles from './styles';

let pressTimer = null;

const handleMouseup = () => {
	clearTimeout(pressTimer);

	return false;
};

const handleMousedown = (props, id) => {
	pressTimer = window.setTimeout(() => {
		if (typeof props.onLongPress !== "undefined") {
			props.onLongPress(id);
		}
	}, 400);

	return false;
};

const handleClick = (props, id) => {
	if (props.visibleCheckbox) {
		if (typeof props.onChange !== "undefined") {
			props.onChange(id);
		}
	} else {
		if (typeof props.onClick !== "undefined") {
			props.onClick(id);
		}
	}
};

const MListItem = (props) => {
	const {id, primaryText, secondaryText, checked, visibleCheckbox, classes} = props;

	return (
		<ListItem
			button
			key={id}
			onMouseUp={handleMouseup}
			onMouseDown={(event) => handleMousedown(props, id)}
			onClick={() => handleClick(props, id)}>

			{visibleCheckbox ? (
				<Checkbox
					className={classes.checkbox}
					checked={checked}
					onChange={() => props.onChange(id)}/>
			) : null}


			<ListItemText primary={primaryText} secondary={secondaryText}/>

			{props.onEdit === undefined ? null : (
				<ListItemSecondaryAction>
					<IconButton
						onClick={() => props.onEdit(id)}>
						<EditIcon />
					</IconButton>
				</ListItemSecondaryAction>
			)}
		</ListItem>
	)
};

MListItem.defaultProps = {
	checked: false,
	visibleCheckbox: false,
};

MListItem.propTypes = {
	id: PropTypes.number.isRequired,
	primaryText: PropTypes.string.isRequired,
	secondaryText: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.node,
	]),
	checked: PropTypes.bool,
	visibleCheckbox: PropTypes.bool,
	onLongPress: PropTypes.func,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	onEdit: PropTypes.func,
};

export default withStyles(styles)(MListItem);