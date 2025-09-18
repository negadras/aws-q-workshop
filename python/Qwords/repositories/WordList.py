import random
from typing import List, Optional
import os
from flask import current_app
from pathlib import Path

class WordList:
    _instance = None  # Class variable for singleton pattern
    
    def __init__(self, file_path: Optional[str] = None) -> None:
        if WordList._instance is not None:
            raise Exception("This class is a singleton. Use getInstance() instead.")
        
        self.words: List[str] = []
        self.current_word: Optional[str] = None
        self.last_word: Optional[str] = None
        
        # Try loading words in this order:
        # 1. From provided file_path if given
        # 2. From 'words.txt' in static directory
        # 3. From 'words.txt' in data directory
        # 4. Fallback to default word list if all else fails
        
        if file_path and self._try_load_words(file_path):
            return
            
        # Try loading from possible default locations
        possible_paths = [
            os.path.join(current_app.root_path, 'static', 'words.txt'),
            os.path.join(current_app.root_path, 'data', 'words.txt'),
            os.path.join(current_app.root_path, 'resources', 'words.txt')
        ]
        
        for path in possible_paths:
            if self._try_load_words(path):
                return
                
        # If no file was successfully loaded, use default words
        self.words = [
            'python', 'flask', 'web', 'development',
            'coding', 'programming', 'software', 'computer',
            'database', 'network', 'server', 'client',
            'animal', 'bakery', 'cracks', 'drivel', 'eatery', 'frosty', 'glazed'
        ]

    def _try_load_words(self, file_path: str) -> bool:
        """
        Attempts to load words from the given file path.
        Returns True if successful, False otherwise.
        """
        try:
            if os.path.exists(file_path):
                with open(file_path, 'r', encoding='utf-8') as file:
                    words = [word.strip().lower() for word in file.readlines() 
                            if word.strip() and word.strip().isalpha()]
                    if words:  # Only use the file if it contains valid words
                        self.words = words
                        return True
            return False
        except Exception:
            return False

    @classmethod
    def get_instance(cls, file_path: Optional[str] = None) -> 'WordList':
        if cls._instance is None:
            cls._instance = WordList(file_path)
        return cls._instance

    @classmethod
    def reset_instance(cls) -> None:
        cls._instance = None

    def load_words_from_file(self, file_path: str) -> None:
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                words = [word.strip().lower() for word in file.readlines() 
                        if word.strip() and word.strip().isalpha()]
                if not words:
                    raise Exception("No valid words found in file")
                self.words = words
        except Exception as e:
            raise Exception(f"Error loading words from file: {str(e)}")

    def save_word_list_to_file(self, file_path: str) -> None:
        try:
            with open(file_path, 'w', encoding='utf-8') as file:
                for word in self.words:
                    file.write(f"{word}\n")
        except Exception as e:
            raise Exception(f"Error saving words to file: {str(e)}")

    def get_word_list(self) -> List[str]:
        return self.words.copy()

    def clear_word_list(self) -> None:
        self.words.clear()

    def add_word(self, word: str) -> bool:
        if word not in self.words:
            self.words.append(word)
            return True
        return False

    def contains_word(self, word: str) -> bool:
        return word in self.words

    def get_word_at_index(self, index: int) -> str:
        if 0 <= index < len(self.words):
            return self.words[index]
        raise IndexError("Index out of range")

    def remove_word(self, word: str) -> bool:
        if word in self.words:
            self.words.remove(word)
            return True
        return False

    def shuffle_word_list(self) -> None:
        random.shuffle(self.words)

    def get_words_by_length(self, length: int) -> List[str]:
        return [word for word in self.words if len(word) == length]

    def get_random_word(self) -> str:
        self.last_word = self.current_word
        self.current_word = self.words[0]
        return self.current_word

    def get_current_word(self) -> Optional[str]:
        return self.current_word

    def get_last_word(self) -> Optional[str]:
        return self.last_word

    def get_size(self) -> int:
        return len(self.words)
