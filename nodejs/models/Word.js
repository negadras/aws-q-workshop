class Word {
    constructor(word) {
      this.word = word;
    }
  
    getWord() {
      return this.word;
    }
  
    contains(c) {
      return this.word.includes(c);
    }
  
    isCorrect(guess) {
      return this.word === guess;
    }
  
    getInfo(guess) {
      // Add validation
      if (!guess) {
        throw new Error('Guess cannot be undefined or null');
        // Or handle it another way, such as returning an empty string or error code
      }
    
      const result = [];
    
      for (let i = 0; i < guess.length; i++) {
        const c = guess[i];
        if (this.contains(c)) {
          if (c === this.word[i]) {
            result.push('+');
          } else {
            result.push('?');
          }
        } else {
          result.push('X');
        }
      }
    
      return result.join('');
    }
    
  }
  
module.exports = Word;