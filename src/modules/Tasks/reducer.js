import * as types from './actionTypes';

export default (state = [], action) => {
	switch(action.type) {
		case types.FETCH_TASKS_RESULT:
			return action.tasks;

		case types.DELETE_TASK:
			return state.filter(item => item.id !== action.id);

		case types.ADD_TASK_RESULT:
			return [
				...state,
				action.task,
			];

		case types.FETCH_TASKS:
		case types.DELETE_TASKS:
		case types.ADD_TASK:
		default:
			return state;
	}
};