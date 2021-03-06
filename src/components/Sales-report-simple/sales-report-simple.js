import React, {PropTypes} from 'react';
import {fetchSalesData} from '../../actionCreators/salesDataActions';
import {connect} from 'react-redux';
import {generateSummary} from '../../common/utils';
import {forOwn, keys, values, sortBy, orderBy} from 'lodash';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Select from 'antd/lib/select';
const Option = Select.Option;

export class SalesReport extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			groupBy: ['Gender'],
			summaryBy: 'Size'
		};
		this.columns = [
			'Month',
			'DeliveryCountry',
			'Manufacturer',
			'Gender',
			'Size',
			'Colour',
			'Style'
		];
	}

	componentDidMount () {
		const {fetchSalesData, salesData} = this.props;
		if (!salesData || !salesData.length) {
			fetchSalesData();
		}
	}

	getTableHeaderColumns = (row) => {
		return keys(row).map((val, i) => {
			return <TableHeaderColumn key={i}>{ val }</TableHeaderColumn>;
		});
	};

	getTableRow = (row) => {
		return values(row).map((val, i) => {
			return <TableRowColumn key={i}>{ val }</TableRowColumn>;
		});
	};

	getTableRows = (arr) => {
		return arr.map((row, i) => {
			return (
				<TableRow key={i}>
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
		obj[`Top Selling ${keySplit[0]}`] = keySplit[1];
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

	handleGroupByChange = (value) => {
		this.setState({
			groupBy: value
		});
	};

	handleSummaryByChange = (value) => {
		this.setState({
			summaryBy: value
		});
	};

	getColumns = () => {
		return this.columns.map((col) => {
			return <Option key={col}>{col}</Option>
		})
	};

	render () {
		const summary = this.getSummary();

		const columns = this.getColumns();

		return (
			<div style={ {padding: '20px'} }>
				<Paper style={ {padding: '10px', marginBottom: '10px'} }>
					<div>Group by:</div>
					<Select
						multiple
						style={{ width: '50%', marginBottom: '10px' }}
						placeholder="Please select grouping columns"
						value={ this.state.groupBy }
						onChange={this.handleGroupByChange}
					>
						{columns}
					</Select>
					<div>Top Selling:</div>
					<Select
						style={{ width: '50%', marginBottom: '10px' }}
						placeholder="Please select top selling category"
						value={ this.state.summaryBy }
						onChange={this.handleSummaryByChange}
					>
						{columns}
					</Select>
				</Paper>
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
