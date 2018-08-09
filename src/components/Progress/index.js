import React from 'react';
import styles from './styles';
import CircularProgress from "@material-ui/core/CircularProgress";
import {withStyles} from "@material-ui/core/styles";

const Progress = (props) => {
	const {classes} = props;

	return (
		<div className={classes.container}>
			<CircularProgress size={60}/>
		</div>
	);
};

export default withStyles(styles)(Progress);