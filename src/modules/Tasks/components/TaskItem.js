import React from 'react';
import {secondsToTimeWithMeasure} from "../../../utils/timeFormatter";
import {getDeadlineSeconds, getLeftSeconds, getSpendSeconds} from "../../Task/js/secondsFormatter";
import MListItem from "../../../components/MListItem/index";

const renderSecondaryText = (item) => {
	const leftSeconds = getLeftSeconds(item);
	const spendSeconds = getSpendSeconds(item);
	const deadlineSeconds = getDeadlineSeconds(item);

	if (spendSeconds === 0) {
		return "Ещё не начиналось";
	}

	if (leftSeconds === 0) {
		const overtime = spendSeconds - deadlineSeconds;

		if (overtime === 0) {
			return "Завершено";
		}

		return (
			<React.Fragment>
				Завершено
				&nbsp;
				<i>(Переработка {secondsToTimeWithMeasure(overtime)})</i>
			</React.Fragment>
		);
	}

	return secondsToTimeWithMeasure(leftSeconds);
};

const TaskItem = (props) => {
	const {item} = props;

	return (
		<MListItem
			id={item.id}
			primaryText={item.title}
			secondaryText={renderSecondaryText(item)}
			{...props}/>
	)
};

export default TaskItem;