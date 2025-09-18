const fs = require('fs');
const path = require('path');
const readline = require('readline');

class WordList {
    static #instance = null;

    constructor() {
        if (WordList.#instance) {
            throw new Error('Use WordList.getInstance() instead of new constructor');
        }
        this.wordlist = [];
        this.currentWord = null;
        this.lastWord = null;
        this.loadDefaultWords();
    }

    static getInstance(filePath) {
        if (!WordList.#instance) {
            WordList.#instance = new WordList();
            if (filePath) {
                WordList.#instance.loadWordsFromFile(filePath);
            }
        }
        return WordList.#instance;
    }

    static resetInstance() {
        WordList.#instance = new WordList();
    }

    async loadWordsFromReader(reader) {
        this.clearWordList();
        for await (const line of reader) {
            const word = line.trim();
            if (word.length > 0) {
                this.addWord(word);
            }
        }
    }

    loadWordsFromFile(filePath) {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            this.wordlist = fileContent
                .split('\n')
                .map(word => word.trim())
                .filter(word => word.length > 0);
            this.currentWord = null;
            this.lastWord = null;
        } catch (error) {
            throw new Error(`Error loading words from file: ${error.message}`);
        }
    }

    saveWordListToFile(filePath) {
        try {
            const content = this.getWordListAsString();
            fs.writeFileSync(filePath, content, 'utf-8');
        } catch (error) {
            throw new Error(`Error saving words to file: ${error.message}`);
        }
    }

    loadDefaultWords() {
        try {
            const defaultPath = path.join(__dirname, '..', 'resources', 'default-words.txt');
            this.loadWordsFromFile(defaultPath);
        } catch (error) {
            console.warn('Default word list file not found, using built-in words');
        }
    }

    getWordListAsString(separator = '\n') {
        return this.wordlist.join(separator);
    }

    loadWordsFromString(content) {
        this.clearWordList();
        const words = content.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        words.forEach(word => this.addWord(word));
    }

    getRandomWord() {
        const randomIndex = 0;
        this.lastWord = this.currentWord;
        this.currentWord = this.wordlist[randomIndex];
        return this.currentWord;
    }

    getRandomWords(count) {
        const shuffled = [...this.wordlist];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }

    getWords() {
        return [...this.wordlist];
    }

    getWordsByLength(length) {
        return this.wordlist.filter(word => word.length === length);
    }

    addWord(word) {
        if (!this.wordlist.includes(word)) {
            this.wordlist.push(word);
        }
    }

    addWords(words) {
        words.forEach(word => this.addWord(word));
    }

    removeWord(word) {
        const index = this.wordlist.indexOf(word);
        if (index !== -1) {
            this.wordlist.splice(index, 1);
            return true;
        }
        return false;
    }

    removeWords(words) {
        words.forEach(word => this.removeWord(word));
    }

    containsWord(word) {
        return this.wordlist.includes(word);
    }

    getWordAtIndex(index) {
        if (index >= 0 && index < this.wordlist.length) {
            return this.wordlist[index];
        }
        throw new Error("Index out of bounds");
    }

    getCurrentWord() {
        return this.currentWord;
    }

    getLastWord() {
        return this.lastWord;
    }

    getSize() {
        return this.wordlist.length;
    }

    clearWordList() {
        this.wordlist = [];
        this.currentWord = null;
        this.lastWord = null;
    }

    shuffleWordList() {
        for (let i = this.wordlist.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.wordlist[i], this.wordlist[j]] = [this.wordlist[j], this.wordlist[i]];
        }
    }

    isEmpty() {
        return this.wordlist.length === 0;
    }

    getWordsContaining(substring) {
        return this.wordlist.filter(word => word.includes(substring));
    }

    getWordsMatchingPattern(pattern) {
        try {
            const regex = new RegExp(pattern);
            return this.wordlist.filter(word => regex.test(word));
        } catch (error) {
            throw new Error(`Invalid regular expression pattern: ${error.message}`);
        }
    }
}

module.exports = WordList;
