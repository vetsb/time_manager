import * as types from './actionTypes';

export default (state = {}, action) => {
	switch(action.type) {
		case types.GET_TASK_RESULT:
			return action.task;

		case types.DELETE_CURRENT_TASK_RESULT:
			return {};

		case types.GET_TASK:
		case types.EDIT_TASK:
		case types.DELETE_CURRENT_TASK:
		default:
			return state;
	}
}