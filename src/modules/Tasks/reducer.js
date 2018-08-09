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

		case types.EDIT_TASK_RESULT:
			const task = action.task;
			let tmpState = [...state];

			Object.assign(tmpState[state.findIndex(item => item.id === task.id)], task);

			return tmpState;

		case types.FETCH_TASKS:
		case types.DELETE_TASKS:
		case types.ADD_TASK:
		case types.EDIT_TASK:
		default:
			return state;
	}
};