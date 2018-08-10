import React, {Component} from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import {withStyles} from "@material-ui/core/styles";
import formDataEntries from 'form-data-entries';
import styles from './styles';
import PropTypes from 'prop-types';

class AddCategoryDialog extends Component {
	form = React.createRef();
	state = {
		category: undefined,
	};

	componentDidMount() {
		this.setState({
			category: this.props.category
		});
	}

	submit = () => {
		let category = Object.assign({}, this.state.category);

		for (const [name, value] of formDataEntries(this.form.current)) {
			category[name] = value;
		}

		category.rate = parseInt(category.rate, 10);

		if (category.title.trim().length !== 0) {
			this.setState({
				category: this.props.category === undefined ? undefined : category
			});

			this.props.onSubmit(category);
			this.props.onClose();
		}
	};

	handleEnter = (category) => {
		this.setState({
			category: category
		});
	};

	render() {
		const {classes} = this.props;
		const {category} = this.state;
		const isEdit = category !== undefined;

		return (
			<Dialog
				onClose={this.props.onClose}
				open={this.props.open}
				onEntering={() => this.handleEnter(this.props.category)}
				classes={{
					paper: classes.paper
				}}>
				<DialogTitle>
					{isEdit ? "Редактирование категории" : "Новая категория"}
				</DialogTitle>

				<DialogContent
					className={classes.dialogContent}>
					<form ref={this.form}>
						<TextField
							name="title"
							label="Название"
							margin="normal"
							fullWidth
							autoFocus
							defaultValue={isEdit ? category.title : ""}/>

						<TextField
							name="rate"
							label="Стоимость часа работы"
							margin="normal"
							fullWidth
							defaultValue={isEdit && category.rate !== 0 ? category.rate : ""}/>

						<TextField
							name="description"
							label="Описание"
							margin="normal"
							fullWidth
							multiline
							rows="4"
							defaultValue={isEdit ? category.description : ""}/>
					</form>
				</DialogContent>

				<DialogActions>
					<Button onClick={this.props.onClose} color="primary">Отмена</Button>

					<Button onClick={this.submit} color="primary">
						{isEdit ? "Сохранить" : "Добавить"}
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

AddCategoryDialog.propTypes = {
	category: PropTypes.object,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(AddCategoryDialog);