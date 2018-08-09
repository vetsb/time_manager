import React from 'react';

import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/core/styles";

import menu from './menu';
import styles from './styles';

import PropTypes from 'prop-types';

const Menu = (props) => {
	const {classes} = props;

	return (
		<React.Fragment>
			<div className={classes.logotype}>Time Manager</div>

			<MenuList>
				{menu.map((item, key) => {
					return (
						<MenuItem
							className={classes.menuItem}
							onClick={() => props.history.push(item.path)}
							key={key}>
							{item.label}
						</MenuItem>
					)
				})}
			</MenuList>
		</React.Fragment>
	);
};

Menu.propTypes = {
	history: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);