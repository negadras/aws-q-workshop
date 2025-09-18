# Game Play Flow
[Game Play flow diagram ]
1. The user opens the Q-Words application in their web browser.
2. The HomeController handles the home page request and renders the home view.
3. The user starts a new game providing their name.
4. The GameController is invoked to handle the game logic to start a game.
5. The GameController calls the WordSelectionService to get a random word from the WordList.
6. The WordSelectionService selects a random word from the WordList and returns it to the GameController.
7. The GameController initializes a new Word object with the selected word.
8. The user enters their first guess.
9. The GameController receives the user's guess and passes it to the Word object.
10. The Word object compares the guess with the actual word and generates feedback.
11. The GameController receives the feedback from the Word object and updates the game state.
12. The GameController renders the game view with the updated game state and feedback.
13. Steps 8-12 are repeated until the user correctly guesses the word or runs out of attempts.
14. If the user correctly guesses the word, the GameController renders a success view.
15. If the user runs out of attempts, the GameController renders a failure view.
16. The user can choose to start a new game, which will restart the process from step 3.
[Game Play flow diagram ]
