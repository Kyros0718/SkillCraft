# BackEnd/routes.py
"""
Renders the html pages
Tells the website browser to go to this "route" and render these html files
"""

from flask import Blueprint, render_template

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/instruction.html')
def instruction():
    return render_template('instruction.html')