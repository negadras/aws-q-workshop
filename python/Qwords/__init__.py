from flask import Flask, render_template
from .utils import url_utils
from .controllers.HomeController import home_page
from .controllers.GameController import game_page

def create_app():
    app = Flask(__name__)

    # default to workshop mode.
    app.config.from_object('config.Config')
    
    app.register_blueprint(home_page)
    app.register_blueprint(game_page)

    # Add error handlers
    @app.errorhandler(404)
    def page_not_found(error):
        return render_template('errors/404.html'), 404

    @app.errorhandler(500)
    def internal_server_error(error):
        return render_template('errors/500.html'), 500
    
    return app
