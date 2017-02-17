import { ADD_SALES_DATA } from '../constants';
import request from 'superagent';

export const addSalesData = salesData => ({
  type: ADD_SALES_DATA,
  payload: salesData
});

export const fetchSalesData = () => (dispatch) => {
	return request
		.get(`/api/sales-data/`)
		.accept('application/json')
		.end((err, res) => {
			if (err) {
				console.log(err);
			} else {
                const data = JSON.parse(res.text);
                dispatch(addSalesData(data));
			}
		});
};
