import * as types from './actionTypes';
import groupTimeline from "../js/groupTimeline";

export default (state = {}, action) => {
	switch(action.type) {
		case types.GET_TASK_RESULT:
			return action.task;

		case types.DELETE_CURRENT_TASK_RESULT:
			return {};

		case types.EDIT_TIMELINE_ELEMENT_RESULT:
			const tmpState = state;
			const {timeline} = tmpState;
			const {element} = action;

			let item = timeline.filter(item => item.id === element.id)[0];

			Object.assign(item, element);

			tmpState.groupTimeline = groupTimeline(timeline);

			return tmpState;

		case types.EDIT_TIMELINE_ELEMENT:
		case types.GET_TASK:
		case types.EDIT_TASK:
		case types.DELETE_CURRENT_TASK:
		default:
			return state;
	}
}