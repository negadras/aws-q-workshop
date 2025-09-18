from flask import Blueprint, render_template, request, session, url_for, redirect

from Qwords.services.WordSelectionService import WordSelectionService
from Qwords.models.GameStatus import GameStatus
from Qwords.models.Word import Word
from Qwords.errors import InvalidWordError, GameSessionError
from Qwords.utils.url_utils import get_prefixed_url

game_page = Blueprint('game_page', __name__, template_folder='../templates')

def get_attempts(request: request) -> int: # type: ignore
    try:
        attempts = int(request.form.get('attempts', 0))
        return attempts
    except (ValueError, KeyError):
        return 0

@game_page.route('/game', methods=['GET', 'POST'])
def load_game():
    """
    Handle game load and gameplay logic.
    
    GET:
        Returns the game page with current state.
    POST:
        Process a word guess and update game state.
        
    Returns:
        Rendered game template with updated state.
        
    Raises:
        GameSessionError: If max attempts reached or username not set
        InvalidWordError: If invalid word provided
    """
    
    # Print out all request args
    print(request.args)
    print (request.form)
    print(dir(game_page))

    user=request.args.get('user', 'Guest')
    game_url = get_prefixed_url('game')
    home_url = get_prefixed_url('')
    
    # Handle GET request
    if request.method == 'GET':
        return render_game_state(
            message="Make your first guess!",
            attempts=0,
            user=user,
            status=GameStatus.INPROGRESS
        )
    
    attempts = get_attempts(request)
    
    # Check max attempts
    if attempts >= 5:
        raise GameSessionError("Sorry, you've reached the maximum number of attempts.")

    # Initialize word if not exists
    if not hasattr(load_game, 'current_word') or load_game.current_word is None:
        #debug log word
        print("Initializing word")
        load_game.current_word = WordSelectionService().get_random_word()
        print(load_game.current_word.value)

    # Handle POST request
    guess = request.form.get('guess', '').strip().lower()
    if not guess:
        raise InvalidWordError("Please enter a guess!")

    # Process guess
    attempts += 1
    print("Current word: " + load_game.current_word.value)
    if guess == load_game.current_word.value.lower():
        load_game.current_word = None  # Reset for next game
        return render_game_state(
            message="Congratulations! You've guessed the word!",
            attempts=attempts,
            user=user,
            status=GameStatus.SUCCESS
        )

    # Handle incorrect guess
    info = load_game.current_word.get_info(guess)
    if attempts >= 5:
        return render_game_state(
            message="Sorry, you've reached the maximum number of attempts.",
            attempts=attempts,
            user=user,
            status=GameStatus.FAILED
        )

    return render_game_state(
        message=f"Wrong guess! Try again.",
        attempts=attempts,
        guess=guess,
        result=[*info],
        user=user,
        status=GameStatus.INPROGRESS
    )

def render_game_state(message, attempts, status, guess=None, result=None, user="Guest"):
    """Helper function to render game template with consistent parameters."""
    return render_template(
        'game.html',
        message=message,
        attempts=attempts,
        guess=guess,
        result=result,
        status=status,
        home_url=get_prefixed_url(''),
        game_url=get_prefixed_url('game'),
        user=user
    )

    
@game_page.route('/new_game', methods=['POST'])
def new_game():
    """
    Start a new game session.
    
    POST Parameters:
        user (str): Username for the game session
        
    Returns:
        Redirect to the game page
    """
    user = request.form.get('user')
    if not user:
        raise GameSessionError("Username is required")
    return redirect(url_for('game_page.load_game', user=user))

