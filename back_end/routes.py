# BackEnd/routes.py
from flask import Blueprint, render_template, request, jsonify

bp = Blueprint('main', __name__)

# PAGE RENDERING
@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/instruction.html')
def instruction():
    return render_template('instruction.html')

#FUNCTIONALITY

@bp.route('/project_searching', methods=['POST'])
def search_project_process():
    data = request.get_json()

    input_text = data.get('input_text') #PULL input_text from JS
    skill_level = data.get('skill_level') #PULL skill_level from JS
    project_list = ["APPLE","BANANA","ORANGE","AVOCADO"] #A list of Projects

    project_info = {"input_text": input_text,"skill_level":skill_level,"project_list":project_list} #Data for JS
    return jsonify(project_info)