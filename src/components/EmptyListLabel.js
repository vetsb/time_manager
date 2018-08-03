import React from 'react';

import {withStyles} from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";

const styles = theme => ({
	label: {
		textAlign: "center"
	}
});

const EmptyListLabel = (props) => {
	const {classes, text} = props;

	return (
		<ListSubheader className={classes.label}>
			{typeof text === "undefined" ? "Список пуст" : text}
		</ListSubheader>
	);
};

export default withStyles(styles)(EmptyListLabel);