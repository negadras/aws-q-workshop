const express = require('express');
const path = require('path');

class HomeController {
    constructor(workshopMode, basePath) {
        this.path = '/';
        this.router = express.Router();
        this.basePath = basePath || '';
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(this.path, (req, res) => {
            try {
                const user = req.query.user;
                if (user) {
                    res.redirect(`${this.basePath}/game?user=${user}`);
                    return;
                }
                res.render('home.ejs', { basePath: this.basePath });
            } catch (err) {
                if (err instanceof Error && err.name === 'TemplateNotFound') {
                    res.status(404).send('Template not found');
                } else {
                    throw err;
                }
            }
        });

        this.router.post(this.path, (req, res) => {
            try {
                const user = req.body.user;
                if (!user) {
                    res.render('home.ejs', { error: 'Please enter a username', basePath: this.basePath });
                    return;
                }
                res.redirect(`${this.basePath}/game?user=${user}`);
            } catch (err) {
                if (err instanceof Error && err.name === 'TemplateNotFound') {
                    res.status(404).send('Template not found');
                } else {
                    throw err;
                }
            }
        });
    }
}

module.exports = HomeController;