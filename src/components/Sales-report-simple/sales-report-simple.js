import React, {PropTypes} from 'react';
import {fetchSalesData} from '../../actionCreators/salesDataActions';
import {connect} from 'react-redux';
import {generateSummary} from '../../common/utils';
import {forOwn, keys, values, sortBy, orderBy} from 'lodash';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export class SalesReport extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			groupBy: ['DeliveryCountry', 'Gender'],
			summaryBy: 'Size'
		};
	}

	componentDidMount () {
		const {fetchSalesData, salesData} = this.props;
		if (!salesData || !salesData.length) {
			fetchSalesData();
		}
	}

	getTableHeaderColumns = (row) => {
		return keys(row).map(i => {
			return <TableHeaderColumn>{ i }</TableHeaderColumn>;
		});
	};

	getTableRow = (row) => {
		return values(row).map(i => {
			return <TableRowColumn>{ i }</TableRowColumn>;
		});
	};

	getTableRows = (arr) => {
		return arr.map(row => {
			return (
				<TableRow>
					{ this.getTableRow(row) }
				</TableRow>);
		});
	};

	createTable = (arr) => {
		return (
			<Table>
				<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
					<TableRow>
						{ this.getTableHeaderColumns(arr[0]) }
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={ false }>
					{ this.getTableRows(arr)}
				</TableBody>
			</Table>);
	};

	addSummaryProp = (obj, summaryFieldValues) => {
		const maxField = orderBy(summaryFieldValues, ['count'], ['desc'])[0];
		const summaryFieldKey = maxField.key;
		const keySplit = summaryFieldKey.split('//');
		obj[keySplit[0]] = keySplit[1];
		obj.Count = maxField.count;
	};

	getSummary = () => {
		const summary = generateSummary(this.props.salesData,
			this.state.groupBy, this.state.summaryBy);

		const arr = [];
		forOwn(summary, (value, key) => {
			const obj = {};
			const keys = key.split('.');
			keys.forEach(k => {
				const keySplit = k.split('//');
				obj[keySplit[0]] = keySplit[1];
			});

			this.addSummaryProp(obj, value);
			arr.push(obj);
		});
		return this.createTable(
			sortBy(arr, [...this.state.groupBy])
		);
	};

	render () {
		console.log(this.props);

		const summary = this.getSummary();

		return (
			<div style={ {padding: '20px'} }>
				{ summary }
			</div>
		);
	}
}
SalesReport.propTypes = {
	fetchSalesData: PropTypes.func,
	salesData: PropTypes.array
};
const mapDispatchToProps = {fetchSalesData};
const mapStateToProps = ({salesData}) => ({salesData});
export default connect(mapStateToProps, mapDispatchToProps)(SalesReport);
