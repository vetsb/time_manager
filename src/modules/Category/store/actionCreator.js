import * as types from './actionTypes';
import store from '../../../store';
import Api from "../../../utils/Api";

export const getCategory = (id) => {
	new Api('categories/' + id, {
		"_embed": "tasks",
	}, {}, category => {
		// const {tasks} = category;
		//
		// tasks.forEach(item => {
		// 	item.timeline = [];
		//
		// 	new Api('timeline', {
		// 		"taskId": item.id
		// 	}, {}, timeline => {
		// 		item.timeline = timeline;
		// 		item.groupTimeline = groupTimeline(Object.create(timeline));
		//
		// 		// store.dispatch(getCategoryResult(category));
		// 	});
		// });

		store.dispatch(getCategoryResult(category));
	});

	return {
		type: types.GET_CATEGORY
	}
};

export const getCategoryResult = (category) => {
	return {
		type: types.GET_CATEGORY_RESULT,
		category: category
	}
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
		type: types.DELETE_TASKS_FROM_CATEGORY
	};
};

export const deleteTask = (id) =>  {
	return {
		type: types.DELETE_TASK_FROM_CATEGORY,
		id: id
	};
};

export const deleteCategory = (id) => {
	new Api("categories/" + id, {}, {
		method: "DELETE"
	}, () => {
		store.dispatch(deleteCategoryResult(id))
	});

	return {
		type: types.DELETE_CATEGORY,
		id: id,
	};
};

export const deleteCategoryResult = (id) => {
	return {
		type: types.DELETE_CATEGORY_RESULT,
		id: id,
	}
};