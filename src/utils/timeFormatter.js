import {decWord} from "./decWord";
import {MEASURES_FORMS} from "../constants/measures";

export const timeToSeconds = (time, measure) => {
	let newTime = time;

	switch (measure) {
		case 1:
			newTime = newTime*60;
			break;
		case 2:
			newTime = newTime*60*60;
			break;
		default:
			break;
	}

	return newTime;
};

export const getTimeWithMeasure = (time, measure) => {
	return time + " " + decWord(time, MEASURES_FORMS[measure])
};

export const secondsToTime = (seconds) => {
	let time = seconds;

	if (seconds >= 60 && seconds < 60*60) {
		time = parseInt(seconds/60, 10);
	} else if (seconds >= 60*60) {
		time = parseInt(seconds/60/60, 10);
	}

	return time;
};

export const secondsToTimeWithMeasure = (seconds) => {
	const time = secondsToTime(seconds);

	return time + " " + decWord(time, MEASURES_FORMS[getMeasureBySeconds(seconds)])
};

export const getMeasureBySeconds = (time) => {
	let measure = 0;

	if (time >= 60 && time < 60*60) {
		measure = 1
	} else if (time >= 60*60) {
		measure = 2
	}

	return measure;
};