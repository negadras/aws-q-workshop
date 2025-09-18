const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

class App {
  constructor(controllers, port) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  initializeMiddlewares() {
    // Set global template variables first
    const basePath = process.env.WORKSHOP_MODE === 'true' ? '/proxy/8090' : '';
    this.app.locals.basePath = basePath;
    
    // Serve static files with the correct prefix in workshop mode
    if (process.env.WORKSHOP_MODE === 'true') {
      this.app.use('/proxy/8090', express.static(path.join(__dirname, 'static')));
    }
    
    // Always serve static files at root path for backward compatibility
    this.app.use(express.static(path.join(__dirname, 'static')));
    
    this.app.use(express.json()); 
    this.app.use(express.urlencoded());
  }
 
  initializeControllers(controllers) {
    controllers.forEach(controller => {
      this.app.use(controller.router);
    });
  }
 
  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
module.exports = App;
