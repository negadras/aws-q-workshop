import express, { Request, Response } from 'express';
import path from 'path';
import { WordSelectionService } from '../services/WordSelectionService';
import { GameStatus } from '../models/GameStatus';
import { Word } from '../models/Word';

class GameController {

    public path = '/game'
    public router = express.Router();
    public workshopMode = false;
    public basePath = "";

    constructor(workshopMode: boolean, basePath: string) { 
        this.workshopMode = workshopMode;
        this.basePath = basePath;
        this.initializeRoutes();
    }

    public initializeRoutes() {

        this.router.get(this.path, (req: Request, res: Response) => {
            const WORD = new Word(new WordSelectionService().getWord());
            const attempts = 0;
            const user = req.query.user as string;
            
            if (!user) {
                res.redirect('/');
                return;
            }
        
            res.render('game.ejs', {
                message: 'Make your first guess!',
                attempts,
                status: GameStatus.INPROGRESS,
                user,
                workshopMode: this.workshopMode,
                basePath: this.basePath
            });
        });

        this.router.post(this.path, (req: Request, res: Response) => {
            const WORD = new Word(new WordSelectionService().getWord());
            let attempts = this.getAttempts(req);
            const guess = req.body.guess;
            const user = req.body.user || 'Default';
            attempts++;
            const result = WORD.getInfo(guess);
            var message = '';
            var status = 'UNKNOWN';
            
            // log the value of WORD and guess
            console.log(`Word: ${WORD.getWord()}, Guess: ${guess}`);

            if (WORD.isCorrect(guess)) {
                const message = 'Congratulations! You guessed correctly.';
                const status = GameStatus.SUCCESS;
                
            } else if (attempts >= 5) {
                const message = 'Game Over! You have used all your attempts.';
                const status = GameStatus.FAILED;
            } else {
                const message = 'Try again. Your next guess:';
                const status = GameStatus.INPROGRESS;
            }
            res.render('game.ejs', { message, attempts, guess, result, status, 
                user, 
                workshopMode: this.workshopMode,
                basePath: this.basePath }
            );
        });
    }

    private getAttempts(req: Request): number {
        try {
            const attempts = req.body.attempts;
            if (attempts === undefined) {
                return 0;
            }
            return parseInt(attempts);
        } catch (e) {
            console.log(e);
            return 0;
        }
    }
}

export = GameController;
