import { WordList } from '../repositories/WordList';

export class WordSelectionService {
    private wordlist: WordList;
    private selectedWord: string;

    constructor() {
        this.wordlist = new WordList();
        this.selectedWord = this.wordlist.getRandomWord();
    }

    getWord(): string {
        return this.selectedWord;
    }
}
