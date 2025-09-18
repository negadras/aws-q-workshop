const express = require('express');
const WordSelectionService = require('../services/WordSelectionService');
const GameStatus = require('../models/GameStatus');
const Word = require('../models/Word');

class GameController {
    constructor(workshopMode, basePath) {
        this.path = '/game';
        this.router = express.Router();
        this.basePath = basePath || '';
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(this.path, (req, res) => {
            const WORD = new Word(new WordSelectionService().getWord());
            const attempts = 0;
            const user = req.query.user;

            if (!user) {
                res.redirect(`${this.basePath}/`);
                return;
            }

            res.render('game.ejs', {
                message: 'Make your first guess!',
                attempts,
                status: GameStatus.INPROGRESS,
                user,
                basePath: this.basePath
            });
        });

        this.router.post(this.path, (req, res) => {
            const WORD = new Word(new WordSelectionService().getWord());
            let attempts = this.getAttempts(req);
            const guess = req.body.guess;
            const user = req.body.user || 'Default';
            attempts++;
            const result = WORD.getInfo(guess);

            if (WORD.isCorrect(guess)) {
                const message = 'Congratulations! You guessed correctly.';
                const status = GameStatus.SUCCESS;
                res.render('game.ejs', { message, attempts, guess, result, status, user, basePath: this.basePath });
            } else if (attempts >= 5) {
                const message = 'Game Over! You have used all your attempts.';
                const status = GameStatus.FAILED;
                res.render('game.ejs', { message, attempts, guess, result, status, user, basePath: this.basePath });
            } else {
                const message = 'Try again. Your next guess:';
                const status = GameStatus.INPROGRESS;
                res.render('game.ejs', { message, attempts, guess, result, status, user, basePath: this.basePath });
            }
        });
    }

    getAttempts(req) {
        try {
            const attempts = req.body.attempts;
            if (attempts === undefined) {
                return 0;
            } else {
                return parseInt(attempts);
            }
        } catch (e) {
            console.log(e);
            return 0;
        }
    }
}

module.exports = GameController;
