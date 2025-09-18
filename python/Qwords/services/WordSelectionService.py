from Qwords.repositories.WordList import WordList
from Qwords.models.Word import Word

class WordSelectionService(object):

    def __init__(self) -> None:
        self.word_list = WordList()

    def get_random_word(self) -> Word:
        random_word = self.word_list.get_random_word()
        return Word(random_word)

    def get_word(self):
        return self.get_random_word()

