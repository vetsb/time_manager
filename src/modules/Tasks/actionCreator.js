import * as types from './actionTypes';
import Api from "../../utils/Api";
import store from '../../store';

export const fetchTasks = () => {
	new Api("tasks", {}, {}, json => {
		store.dispatch(fetchTasksResult(json))
	});

	return {
		type: types.FETCH_TASKS
	};
};

export const fetchTasksResult = (tasks) =>  {
	return {
		type: types.FETCH_TASKS_RESULT,
		tasks: tasks
	};
};

export const deleteTasks = (ids) =>  {
	ids.forEach(id => {
		new Api("tasks/" + id, {}, {
			method: "DELETE"
		}, () => {
			store.dispatch(deleteTask(id))
		});
	});

	return {
		type: types.DELETE_TASKS
	};
};

export const deleteTask = (id) =>  {
	return {
		type: types.DELETE_TASK,
		id: id
	};
};

export const addTask = (task) =>  {
	new Api("tasks", {}, {
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(task)
	}, json => {
		store.dispatch(addTaskResult(json))
	});

	return {
		type: types.ADD_TASK
	};
};

export const addTaskResult = (task) =>  {
	return {
		type: types.ADD_TASK_RESULT,
		task: task
	};
};