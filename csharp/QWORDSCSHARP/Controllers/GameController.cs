using Microsoft.AspNetCore.Mvc;
using QWORDSCSHARP.Models;

public class GameController : Controller
{
    private WordSelectionService wordBank;
    private string selected;
    private Word word;

    [HttpGet]
    public ActionResult Index(string user)
    {
        wordBank = new WordSelectionService();
        selected = wordBank.GetWord();
        word = new Word(selected);
        System.Console.WriteLine("Word selected : " + selected);
        System.Console.WriteLine("Word : " + word.GetWord());


        int attempts = GetAttempts();

        string result = "";

        var viewModel = new GameViewModel
        {
            Word = word.GetWord(),
            Message = "Make your first guess!",
            Attempts = attempts,
            Result = result,
            Status = GameStatus.InProgress
        };

        return View(viewModel);
    }

    [HttpPost]
    public ActionResult MakeGuess(string guess, int attempts, string selectedWord)
    {

        word = new Word(selectedWord);
        string result = word.GetInfo(guess);
        attempts += 1;

        var viewModel = new GameViewModel
        {
            Result = result,
            Attempts = attempts,
            Guess = guess,
            Word = selectedWord
        };

        if (word.IsCorrect(guess.ToCharArray()))
        {
            viewModel.Message = "Congratulations! You guessed correctly";
            viewModel.Status = GameStatus.Success;
        }
        else
        {
            if (attempts >= 5)
            {
                viewModel.Message = "Sorry, you've reached the maximum number of attempts.";
                viewModel.Status = GameStatus.Failed;
            }
            else
            {
                viewModel.Message = "Try again. Your next guess:";
                viewModel.Status = GameStatus.InProgress;
            }
        }

        return View(viewModel);
    }

    private int GetAttempts()
    {
        int attempts = 0;
        object attemptsObj = TempData["Attempts"];
        if (attemptsObj != null)
        {
            attempts = (int)attemptsObj;
        }
        return attempts;
    }
}

