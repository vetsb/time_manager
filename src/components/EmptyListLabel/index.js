import React from 'react';

import {withStyles} from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import styles from './styles';

const EmptyListLabel = (props) => {
	const {classes, text, style} = props;

	return (
		<ListSubheader className={classes.label} style={style}>
			{typeof text === "undefined" ? "Список пуст" : text}
		</ListSubheader>
	);
};

export default withStyles(styles)(EmptyListLabel);