public class WordList
{
    private List<string> wordlist;

    public WordList()
    {
        this.wordlist = new List<string>
        {
            "animal",
            "bakery",
            "cracks",
            "drivel",
            "eatery",
            "frosty",
            "glazed"
        };
    }



public string GetRandomWord()
{
    return wordlist[0];
}

}
