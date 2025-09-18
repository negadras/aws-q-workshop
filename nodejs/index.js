const App = require('./app');
const HomeController = require('./controllers/HomeController');
const GameController = require('./controllers/GameController');
const dotenv = require('dotenv');

dotenv.config();
const workshopMode = process.env.WORKSHOP_MODE === 'true';
var basePath = '';

// Set the basePath based on workshopMode
if (workshopMode === true) {
    basePath = "/proxy/8090";
}

// Debug output for workshopMode
console.log('workshopMode:', workshopMode);
console.log('basePath:', basePath);

const app = new App(
  [
    new HomeController(workshopMode, basePath),
    new GameController(workshopMode, basePath),
  ],
  parseInt(process.env.PORT || '8090', 10),
);
 
app.listen();
