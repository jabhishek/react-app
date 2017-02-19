const data = require('./mock-data-generator');
// To run it for an existing data set, paste the data in mock-data.json and
// uncomment this line (and comment the line above)
// const data = require('./mock-data.json');

module.exports = function (app) {
	app.get('/api/sales-data', (req, res) => {
		res.send(data);
	});
	app.route('/*').get((req, res) => {
        res.sendFile(app.get('appPath') + '/index.html');
    });
};
