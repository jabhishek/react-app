import { reduce } from 'lodash';

export const generateSummary = (data, groupColumns, summaryColumn) => {
	const columns = [...groupColumns, summaryColumn];
	const summary = reduce(data, (result, value) => {
		const propName = reduce(columns, (result, col, index) => {
			const columnPath = `${col}//${value[col]}`;
			if (index === 0) {
				return `${columnPath}`;
			}
			return result + `.${columnPath}`;
		}, '');
		result[propName] = value.Count + (result[propName] || 0);
		return result;
	}, {});
	console.log(summary);
	return summary;
};
