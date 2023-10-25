# BackEnd/routes.py

from flask import Blueprint, render_template

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/instruction.html')
def instruction():
    return render_template('instruction.html')