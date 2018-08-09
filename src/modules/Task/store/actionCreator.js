import * as types from './actionTypes';
import store from '../../../store';
import Api from '../../../utils/Api';
import groupTimeline from "../js/groupTimeline";

export const getTask = (id) => {
	new Api('tasks/' + id, {
		"_embed": "timeline"
	}, {}, task => {
		task.groupTimeline = groupTimeline(Object.create(task.timeline));

		store.dispatch(getTaskResult(task));
	});

	return {
		type: types.GET_TASK
	}
};

export const getTaskResult = (task) => {
	return {
		type: types.GET_TASK_RESULT,
		task: task,
	}
};

export const editTask = (task) => {
	const timeline = Object.assign([], task.timeline);

	task.timeline = undefined;

	new Api('tasks/' + task.id, {}, {
		method: "PATCH",
		headers: {
			'Accept': 'application/json',
			"Content-Type": "application/json"
		},
		body: JSON.stringify(task),
	}, () => {
		task.timeline = timeline;
		store.dispatch(getTaskResult(task));
	});

	return {
		type: types.EDIT_TASK
	}
};

export const deleteCurrentTask = (id) => {
	new Api('tasks/' + id, {}, {
		method: "DELETE",
	}, () => {
		store.dispatch(deleteCurrentTaskResult(id));
	});

	return {
		type: types.DELETE_CURRENT_TASK,
	}
};

export const deleteCurrentTaskResult = (id) => {
	return {
		type: types.DELETE_CURRENT_TASK_RESULT,
		id: id,
	}
};

export const editTimelineElement = (element) => {
	new Api('timeline/' + element.id, {}, {
		method: "PATCH",
		headers: {
			'Accept': 'application/json',
			"Content-Type": "application/json"
		},
		body: JSON.stringify(element),
	}, json => {
		store.dispatch(editTimelineElementResult(Object.assign({}, json, element)));
	});

	return {
		type: types.EDIT_TIMELINE_ELEMENT,
	}
};

export const editTimelineElementResult = (element) => {
	return {
		type: types.EDIT_TIMELINE_ELEMENT_RESULT,
		element: element,
	}
};