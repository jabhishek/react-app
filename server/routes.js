const data = require('./mock-data');
const _ = require('lodash');

module.exports = function (app) {
	app.get('/api/sales-data', (req, res) => {
		res.send(data);
	});
	app.route('/*')
    .get((req, res) => {
        res.sendFile(app.get('appPath') + '/index.html');
    });
};
