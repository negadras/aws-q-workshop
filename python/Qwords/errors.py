from flask import jsonify, render_template
from werkzeug.exceptions import HTTPException

class GameError(Exception):
    """Base exception class for game-related errors."""
    status_code = 500

    def __init__(self, message, status_code=None, payload=None):
        super().__init__()
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

class InvalidWordError(GameError):
    """Exception raised for invalid word inputs."""
    def __init__(self, message="Invalid word provided"):
        super().__init__(message, status_code=400)

class GameSessionError(GameError):
    """Exception raised for game session related errors."""
    def __init__(self, message="Game session error"):
        super().__init__(message, status_code=400)

def init_error_handlers(app):
    @app.errorhandler(GameError)
    def handle_game_error(error):
        """Handle custom game exceptions."""
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

    @app.errorhandler(404)
    def not_found_error(error):
        """Handle 404 errors."""
        return render_template('errors/404.html'), 404

    @app.errorhandler(500)
    def internal_error(error):
        """Handle 500 errors."""
        return render_template('errors/500.html'), 500

    @app.errorhandler(Exception)
    def handle_unexpected_error(error):
        """Handle any unexpected errors."""
        app.logger.error(f'An unexpected error occurred: {error}')
        return render_template('errors/500.html'), 500