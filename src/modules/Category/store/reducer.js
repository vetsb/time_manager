import * as types from './actionTypes';
import * as categoriesTypes from '../../Categories/store/actionTypes';

export default (state = {}, action) => {
	switch(action.type) {
		case types.GET_CATEGORY_RESULT:
			return action.category;

		case types.DELETE_TASK_FROM_CATEGORY:
			return {
				...state,
				tasks: state.tasks.filter(item => item.id !== action.id)
			};

		case types.DELETE_CATEGORY_RESULT:
			return {};

		case categoriesTypes.EDIT_CATEGORY_RESULT:
			return Object.assign({}, state, action.category);

		case types.GET_CATEGORY:
		case types.DELETE_TASKS_FROM_CATEGORY:
		case types.DELETE_CATEGORY:
		case categoriesTypes.EDIT_CATEGORY:
		default:
			return state;
	}
};