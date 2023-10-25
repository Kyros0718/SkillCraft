<<<<<<< HEAD
# BackEnd/routes.py

from flask import Blueprint, render_template

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/instruction.html')
def instruction():
    return render_template('instruction.html')
||||||| 4839ac8
=======
# BackEnd/routes.py

from flask import Blueprint, render_template

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/instruction.html')
def instruction():
    return render_template('instruction.html')
>>>>>>> 36e7eb6f155ed7b210ba9294c6ac761e4efe5f6a
