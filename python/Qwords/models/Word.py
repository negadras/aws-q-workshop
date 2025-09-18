import logging
logger = logging.getLogger(__name__)

class Word(object):
    def __init__(self, word: str) -> None:
        self.value = word.strip().lower()

    def get_word(self) -> str:
        return self.value
    
    def contains(self, c: str) -> bool:
        return c in self.word
    
    def is_correct(self, guess:list) -> bool:
        return self.word == guess
    
    def get_info(self, guess: str) -> str:
        if not guess:
            return ""
        
        info = []
        guess = guess.lower()
        word = self.value
        
        logger.debug(f"Word: {word}")
        logger.debug(f"Guess: {guess}")
        
        for i, c in enumerate(guess):
            if i >= len(word):
                info.append('X')  # Invalid position
            elif c == word[i]:
                info.append('+')  # Correct position
            elif c in word:
                info.append('?')  # Wrong position but in word
            else:
                info.append('✗')  # Not in word
        
        result = ''.join(info)
        logger.debug(f"Info: {result}")            
        return result
