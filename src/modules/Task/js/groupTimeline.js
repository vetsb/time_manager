import groupByTimePeriod from "../../../utils/groupByTimePeriod";

const groupTimeline = (timeline) => {
	timeline.sort((a, b) => {
		if (a.createdAt > b.createdAt) {
			return 1;
		}

		if (a.createdAt < b.createdAt) {
			return -1;
		}

		return 0;
	});

	const groupedTimeline = groupByTimePeriod(timeline, 'createdAt', 'day');
	let newTimeline = [];

	Object.values(groupedTimeline).forEach(element => {
		let el = Object.assign({}, element[0]);
		el.seconds = 0;
		el.description = [];

		element.forEach(item => {
			el.seconds += item.seconds;

			el.description.push({
				id: item.id,
				description: item.description,
				seconds: item.seconds,
				createdAt: item.createdAt,
			});
		});

		newTimeline.push(el);
	});

	return newTimeline;
};

export default groupTimeline;