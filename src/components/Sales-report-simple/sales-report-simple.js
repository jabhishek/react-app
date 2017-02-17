import React from 'react';
import {fetchSalesData} from '../../actionCreators/salesDataActions';
import {connect} from 'react-redux';

export class SalesReport extends React.Component {
	componentDidMount() {
		const { fetchSalesData, salesData } = this.props;
		if (!salesData || !salesData.length) {
			fetchSalesData();
		}
	}
	render() {
		console.log(this.props);
		return (
			<div style={ {padding: '20px'} }>
				Sales Report
			</div>
		);
	}
}
const mapDispatchToProps = {fetchSalesData};
const mapStateToProps = ({salesData}) => ({salesData});
export default connect(mapStateToProps, mapDispatchToProps)(SalesReport);
