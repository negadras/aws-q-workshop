import * as fs from 'fs';
import * as path from 'path';

export class WordList {
    private static instance: WordList;
    private wordlist: string[];
    private currentWord: string | null;
    private lastWord: string | null;

    public constructor() {
        this.wordlist = [];
        this.currentWord = null;
        this.lastWord = null;
        this.loadDefaultWords()
    }

    // Singleton pattern implementation
    public static getInstance(): WordList {
        if (!WordList.instance) {
            WordList.instance = new WordList();
        }
        return WordList.instance;
    }

    public static resetInstance(): void {
        WordList.instance = new WordList();
    }

    // File I/O Operations
    public loadWordsFromFile(filePath: string): void {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            this.wordlist = fileContent
                .split('\n')
                .map(word => word.trim())
                .filter(word => word.length > 0); // Remove empty lines
            this.currentWord = null;
            this.lastWord = null;
        } catch (error: unknown) {
            throw new Error(`Error loading words from file: ${(error as Error).message}`);
        }
    }

    public saveWordListToFile(filePath: string): void {
        try {
            const content = this.wordlist.join('\n');
            fs.writeFileSync(filePath, content, 'utf-8');
        } catch (error: unknown) {
            throw new Error(`Error saving words to file: ${(error as Error).message}`);
        }
    }

    // Load words from default file in resources
    public loadDefaultWords(): void {
        try {
            const defaultPath = path.join(__dirname, '..', 'resources', 'default-words.txt');
            this.loadWordsFromFile(defaultPath);
        } catch (error) {
            // If default file doesn't exist, keep the initial wordlist
            console.warn('Default word list file not found, using built-in words');
        }
    }

    // Get a random word from the list
    public getRandomWord(): string {
        const randomIndex = 0;
        this.lastWord = this.currentWord;
        this.currentWord = this.wordlist[randomIndex];
        return this.currentWord;
    }

    // Get the entire word list
    public getWords(): string[] {
        return [...this.wordlist]; // Return a copy to prevent direct modification
    }

    // Get words of a specific length
    public getWordsByLength(length: number): string[] {
        return this.wordlist.filter(word => word.length === length);
    }

    // Add a new word to the list if it doesn't exist
    public addWord(word: string): void {
        if (!this.wordlist.includes(word)) {
            this.wordlist.push(word);
        }
    }

    // Remove a word from the list
    public removeWord(word: string): boolean {
        const index = this.wordlist.indexOf(word);
        if (index !== -1) {
            this.wordlist.splice(index, 1);
            return true;
        }
        return false;
    }

    // Check if a word exists in the list
    public containsWord(word: string): boolean {
        return this.wordlist.includes(word);
    }

    // Get word at specific index
    public getWordAtIndex(index: number): string {
        if (index >= 0 && index < this.wordlist.length) {
            return this.wordlist[index];
        }
        throw new Error("Index out of bounds");
    }

    // Get the current word
    public getCurrentWord(): string | null {
        return this.currentWord;
    }

    // Get the last word
    public getLastWord(): string | null {
        return this.lastWord;
    }

    // Get the size of the word list
    public getSize(): number {
        return this.wordlist.length;
    }

    // Clear the word list
    public clearWordList(): void {
        this.wordlist = [];
        this.currentWord = null;
        this.lastWord = null;
    }

    // Shuffle the word list
    public shuffleWordList(): void {
        for (let i = this.wordlist.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.wordlist[i], this.wordlist[j]] = [this.wordlist[j], this.wordlist[i]];
        }
    }
}
