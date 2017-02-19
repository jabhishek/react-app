import { reduce } from 'lodash';

export const generateSummary = (data, groupColumns, summaryColumn) => {
	const columns = [...groupColumns];
	const summary = reduce(data, (result, value) => {
		const propName = reduce(columns, (result, col, index) => {
			const columnPath = `${col}//${value[col]}`;
			if (index === 0) {
				return `${columnPath}`;
			}
			return result + `.${columnPath}`;
		}, '');
		const currentObj = result[propName];
		const summaryKey = `${summaryColumn}//${value[summaryColumn]}`;
		if (!currentObj) {
			result[propName] = [{
				key: summaryKey,
				count: value.Count
			}];
		} else {
			const summaryPropInCurrentObj = currentObj.find(i => i.key === summaryKey);
			if (summaryPropInCurrentObj) {
				summaryPropInCurrentObj.count = summaryPropInCurrentObj.count + value.Count;
			} else {
				currentObj.push({
					key: summaryKey,
					count: value.Count
				});
			}
		}
		return result;
	}, {});
	console.log(summary);
	return summary;
};
