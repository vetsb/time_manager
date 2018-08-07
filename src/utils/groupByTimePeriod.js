const groupByTimePeriod = (obj, timestamp, period) => {
	let objPeriod = {};
	let oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds

	for (let i = 0; i < obj.length; i++) {
		let d = new Date(obj[i][timestamp] * 1000);
		if (period === 'day') {
			d = Math.floor(d.getTime() / oneDay);
		} else if (period === 'week') {
			d = Math.floor(d.getTime() / (oneDay * 7));
		} else if (period === 'month') {
			d = (d.getFullYear() - 1970) * 12 + d.getMonth();
		} else if (period === 'year') {
			d = d.getFullYear();
		} else {
			console.log('groupByTimePeriod: You have to set a period! day | week | month | year');
		}

		objPeriod[d] = objPeriod[d] || [];
		objPeriod[d].push(obj[i]);
	}
	return objPeriod;
};

export default groupByTimePeriod;