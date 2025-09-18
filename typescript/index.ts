import App from './app';
import HomeController from './controllers/HomeController';
import GameController from './controllers/GameController';
import dotenv from 'dotenv';

dotenv.config();
const workshopMode = process.env.WORKSHOP_MODE === 'true';
var basePath = '';

if (workshopMode === true) {
    basePath = "/proxy/8090";
}

const app = new App(
  [
    new HomeController(workshopMode, basePath),
    new GameController(workshopMode, basePath),
  ],
  parseInt(process.env.PORT || '8090', 10),
);
 
app.listen();