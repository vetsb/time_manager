import * as types from './actionTypes';
import Api from "../../../utils/Api";
import store from '../../../store';

export const increaseSecondsByTaskId = (id) => {
	new Api('timeline', {
		taskId: id,
		finished: false,
		_limit: 1,
	}, {}, json => {
		if (json.length === 0) {
			const postTime = {
				taskId: id,
				seconds: 1,
				finished: false,
				createdAt: parseInt(Date.now()/1000, 10),
				description: "",
			};

			new Api("timeline", {}, {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(postTime)
			}, execution => {
				store.dispatch(setExecution(execution))
			});
		} else {
			json[0].seconds = json[0].seconds + 1;

			new Api('timeline/' + json[0].id, {}, {
				method: "PATCH",
				headers: {
					'Accept': 'application/json',
					"Content-Type": "application/json"
				},
				body: JSON.stringify(json[0]),
			}, execution => {
				store.dispatch(setExecution(execution))
			})
		}
	});

	return {
		type: types.INCREASE_SECONDS,
	}
};

export const getNotFinishedExecutionByTaskId = (id) => {
	new Api('timeline', {
		taskId: id,
		finished: false,
		_limit: 1,
	}, {}, json => {
		if (json.length === 0) {
			store.dispatch(setExecution({}));
		} else {
			store.dispatch(setExecution(json[0]));
		}
	});

	return {
		type: types.GET_NOT_FINISHED_EXECUTION
	}
};

export const setExecution = (execution) => {
	return {
		type: types.SET_EXECUTION,
		execution: execution
	}
};

export const finishExecution = (execution) => {
	execution.finished = true;

	new Api('timeline/' + execution.id, {}, {
		method: "PATCH",
		headers: {
			'Accept': 'application/json',
			"Content-Type": "application/json"
		},
		body: JSON.stringify(execution),
	}, json => {
		store.dispatch(setExecution(json))
	});

	return {
		type: types.UPDATE_EXECUTION
	}
};
