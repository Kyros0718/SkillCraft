# BackEnd/routes.py
from flask import Blueprint, render_template, request, jsonify
import openai, os

bp = Blueprint('main', __name__)
openai.api_key = os.environ.get("API_KEY")

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
    
    data = request.get_json() #PULL JS file from client side

    input_text = data.get('input_text') #PULL input_text from JS
    skill_level = data.get('skill_level') #PULL skill_level from JS
    project_list = [] #A list of Projects

    input_response = openai.Completion.create( #AI Response to a prompt
        engine="text-davinci-003",
        prompt = f"Generate 10 project ideas that involve {input_text} at a {skill_level} level",
        max_tokens=500,
        n=1,
        stop=None,
        temperature=0.5,
    )

    raw_response = input_response['choices'][0]['text'].split('\n') #AI raw response split up
    main_response = list(filter(lambda x: x!='', raw_response)) #response without unnecessary spaces
    cut_response = list(map(lambda x: x[x.find(" ")+1:], main_response)) #non-numbered response

    project_list = cut_response

    project_info = {"input_text": input_text,"skill_level":skill_level,"project_list":project_list} #Data for JS
    return jsonify(project_info)