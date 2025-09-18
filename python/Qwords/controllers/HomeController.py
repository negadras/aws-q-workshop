from flask import Blueprint, render_template, abort, url_for
from jinja2 import TemplateNotFound
from Qwords.utils.url_utils import get_prefixed_url

home_page = Blueprint('home_page', __name__,template_folder='../templates')

@home_page.route('/')
def load_home():
    try:
        return render_template(
            'home.html', 
            home_url=get_prefixed_url(""),
            game_url=get_prefixed_url('game'))
    except TemplateNotFound:
        abort(404, description="Home template not found")
