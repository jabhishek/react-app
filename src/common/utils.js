import { reduce } from 'lodash';

const getDateSummaryKey = (rowData, col) => {
	if (col === 'OrderDate') {
		const month = rowData[col].split('/')[1];
		return `month//${month}`;
	} else {
		return `${col}//${rowData[col]}`;
	}

};

export const generateSummary = (data, groupColumns, summaryColumn) => {
	const columns = [...groupColumns];
	const summary = reduce(data, (result, rowData) => {
		const groupPropName = reduce(columns, (result, col, index) => {
			let columnPath = getDateSummaryKey(rowData, col);
			if (index === 0) {
				return `${columnPath}`;
			}
			return result + `.${columnPath}`;
		}, '');
		const currentObj = result[groupPropName];
		// const summaryKey = `${summaryColumn}//${rowData[summaryColumn]}`;
		let summaryKey = getDateSummaryKey(rowData, summaryColumn);

		if (!currentObj) {
			result[groupPropName] = [{
				key: summaryKey,
				count: rowData.Count
			}];
		} else {
			const summaryPropInCurrentObj = currentObj.find(i => i.key === summaryKey);
			if (summaryPropInCurrentObj) {
				summaryPropInCurrentObj.count = summaryPropInCurrentObj.count + rowData.Count;
			} else {
				currentObj.push({
					key: summaryKey,
					count: rowData.Count
				});
			}
		}
		return result;
	}, {});
	console.log(summary);
	return summary;
};
