using System.Text;

public class Word
{
    private string word;
    private char[] characters;

    public Word(string word)
    {
        this.word = word;
        this.characters = word.ToCharArray();
    }

    public string GetWord()
    {
        return word;
    }

    public bool Contains(char c)
    {
        return characters.Contains(c);
    }

    public bool IsCorrect(char[] guess)
    {
        return new string(guess).Equals(word, StringComparison.OrdinalIgnoreCase);
    }

    public string GetInfo(string guess)
    {
        var guessArray = guess.ToCharArray();
        var result = new StringBuilder();

        for (int i = 0; i < guessArray.Length; i++)
        {
            char currentGuess = guessArray[i];
            if (Contains(currentGuess))
            {
                if (characters[i] == currentGuess)
                {
                    result.Append('+');
                }
                else
                {
                    result.Append('?');
                }
            }
            else
            {
                result.Append('X');
            }
        }

        return result.ToString();
    }
}
