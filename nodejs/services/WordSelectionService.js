const WordList = require('../repositories/WordList');

class WordSelectionService {
  constructor() {
    this.wordlist = new WordList();
    this.selectedWord = this.wordlist.getRandomWord();
  }

  getWord() {
    return this.selectedWord;
  }
}

module.exports = WordSelectionService;
