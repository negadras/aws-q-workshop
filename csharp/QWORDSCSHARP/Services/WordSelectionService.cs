public class WordSelectionService
{
    private WordList wordlist;
    private string selectedWord;

    public WordSelectionService()
    {
        this.wordlist = new WordList();
        this.selectedWord = wordlist.GetRandomWord();
    }

    public string GetWord()
    {
        return this.selectedWord;
    }
}
