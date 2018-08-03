import * as types from './actionTypes';
import store from '../../store';
import Api from '../../utils/Api';

export const getTask = (id) => {
	new Api('tasks/' + id, {
		"_embed": "timeline"
	}, {}, json => {
		store.dispatch(getTaskResult(json));
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
	new Api('tasks/' + task.id, {}, {
		method: "PATCH",
		headers: {
			'Accept': 'application/json',
			"Content-Type": "application/json"
		},
		body: JSON.stringify(task),
	}, () => {
		store.dispatch(getTaskResult(task));
	});

	return {
		type: types.EDIT_TASK
	}
};

export const editTaskResult = (id) => {
	store.dispatch(getTask(id));

	return {
		type: types.EDIT_TASK_RESULT
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