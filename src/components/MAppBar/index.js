import React from 'react';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import {withStyles} from "@material-ui/core/styles";

import styles from './styles';
import withRoot from "../../utils/withRoot";

import PropTypes from 'prop-types';

const MAppBar = (props) => {
	const {classes} = props;

	return (
		<AppBar
			position="fixed"
			className={classes.appBar}>
			<Toolbar>
				{props.hasBackArrow ? (
					<IconButton
						color="inherit"
						className={classes.toolbarArrowBack}
						onClick={() => {
							if (typeof props.onClickBackArrow === "function") {
								props.onClickBackArrow();
							} else {
								props.history.push('/');
							}}}>
						<ArrowBackIcon />
					</IconButton>
				) : null}
				<Typography variant="title" color="inherit" className={classes.toolbarTitle}>{props.title}</Typography>
				<div className={classes.toolbarButtons}>
					{props.buttons.map((item, key) => {
						return (
							<IconButton
								key={key}
								color="inherit"
								onClick={item.onClick}>
								{item.icon}
							</IconButton>
						);
					})}
				</div>
			</Toolbar>
		</AppBar>
	);
};

MAppBar.defaultProps = {
	hasBackArrow: false,
	buttons: [],
};

MAppBar.propTypes = {
	hasBackArrow: PropTypes.bool,
	history: PropTypes.any.isRequired,
	title: PropTypes.string.isRequired,
	buttons: PropTypes.array,
	onClickBackArrow: PropTypes.func
};

export default withRoot(withStyles(styles)(MAppBar));