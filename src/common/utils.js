import { reduce } from 'lodash';
const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];

const getDateSummaryKey = (rowData, col) => {
	if (col === 'Month') {
		const month = rowData['OrderDate'].split('/')[1];
		return `Month//${monthNames[month - 1]}`;
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
