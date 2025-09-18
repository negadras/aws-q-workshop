import express from 'express';
import path from 'path';
import 'dotenv';
const dotenv = require('dotenv');



class App {
  public app: express.Application;
  public port: number
 
  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use(express.static(path.join(__dirname, 'static')));
    this.app.use(express.json()); 
    this.app.use(express.urlencoded());     

     
    // Set global template variables    
    this.app.locals.basePath = process.env.WORKSHOP_MODE === 'true' ? '/proxy/8090' : '';
  }
 
  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use(controller.router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;