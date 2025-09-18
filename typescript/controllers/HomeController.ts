import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const workshopMode = process.env.WORKSHOP_MODE === 'true';
const basePath = workshopMode ? '/proxy/8090' : '';

// log values of workshopMode and basePath
console.log("workshopMode: " + workshopMode);
console.log("basePath: " + basePath);

class HomeController {

    public path = '/'
    public router = express.Router();
    

    constructor(workshopMode: boolean, basePath: String) { 
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, (req: Request, res: Response) => {
            const user = req.query.user;
            res.render('home.ejs', { user, workshopMode, basePath });
        });
    }
}

export = HomeController;