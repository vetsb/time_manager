import {timeToSeconds} from "../../../utils/timeFormatter";

export const getDeadlineSeconds = (task) => {
	return timeToSeconds(task.time, task.measure);
};

export const getSpendSeconds = (task) => {
	let spendSeconds = 0;

	task.timeline.forEach(item => spendSeconds += item.seconds);

	return spendSeconds;
};

export const getLeftSeconds = (task) => {
	let leftSeconds = getDeadlineSeconds(task) - getSpendSeconds(task);

	if (leftSeconds < 0) {
		leftSeconds = 0;
	}

	return leftSeconds;
};

