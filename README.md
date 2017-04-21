## Sales Reporting App

### Local Development
1. npm install
2. To run in dev mode, npm start to run in dev mode
3. To run in production mode, run `npm run build:prod`, and then `npm run server` to start the server
4. Go to localhost:9000 
5. To run tests, `npm run test`
6. To lint the project, `npm run eslint:watch`, which watches and checks the files on change

### UI Frameworks/Libraries used
1. React/Redux
2. Material UI and AntD UI Components.
3. Nodejs server for exposing the backend api. 
4. Karma/Mocha/Chai/Enzyme for unit testing

### Providing data for the app
Currently, the app generates a random data set of 200,000 records which are served via a node based api endpoint. 
For real scenarios, the app provides an option to use a real data set provided in the correct format (an example json file is available at server/mock.data.json).
To run the app using real data set, require the data file from 'server/routes.js' (commented code available in the routes.js)  

### About the app
On the home page of the app, there are 2 select inputs to select group by columns, and to select which Top selling category you want to find out. You can select multiple group by columns, but only 1 Top Selling Category.

Currently, the app just lists the top selling value in that category. For example, if one wishes to find the top selling manufacturer by Country, the app will only show the topmost manufacturer for each country, but the data is available for other manufacturers too, and changing it to display all of them should be easy enough.

### Todos
1. More test coverage
2. Using redux for storing the filters too. Redux is a bit of an overkill at the moment, but keeping it will help scale the app well in future.
3. Handle Grouping by Month better
4. Refactor webpack configs to reduce repetitive configs (DRY).

