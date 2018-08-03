import * as types from './actionTypes';

export default (state = {}, action) => {
	switch (action.type) {
		case types.SET_EXECUTION:
			return action.execution;

		case types.GET_NOT_FINISHED_EXECUTION:
		case types.INCREASE_SECONDS:
		case types.FINISH_EXECUTION:
		default:
			return state;
	}
};