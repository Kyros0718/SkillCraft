# BackEnd/__init__.py

from flask import Flask, request, render_template
from back_end.routes import bp
from back_end import backend
import os
import json

app = Flask(__name__, template_folder='../front_end/templates') #Help Flask Locate templates folder

# Other configurations and imports can go here

current_directory = os.path.dirname(os.path.abspath(__file__))

#unwrapping the json files from the front end into something that can be used for the backend
@app.route('/generate_walkthroughs', methods=['POST'])
def generate_walkthroughs() -> str:
    """
    Takes in a JSON of the website and then uses the project data to create a walkthrough on how to do the steps within a project.

    Returns:
        A JSON response as a String.
    """
    # Parse the JSON payload
    data = json.loads(request.data)
    project = data['project']

    # Generate project ideas using OpenAI's GPT-3 API
    ideas = backend.generate_walkthroughs(project)

    # Return the project ideas as a JSON response
    return json.dumps(ideas)


@app.route('/generate_project_ideas', methods=['POST'])
def generate_project_ideas() -> str:
    """
    Takes in a JSON of the website and then uses the project data to create 10 project ideas.

    Returns:
        A JSON response as a String.
    """
    # Parse the JSON payload
    data = json.loads(request.data)
    skill = data['skill']
    level = data['level']

    ideas = backend.generate_project_ideas(skill, level)

    # Return the project ideas as a JSON response
    return json.dumps(ideas)

app.static_folder = '../front_end/static' #Help Flask Locate static folder
app.register_blueprint(bp) #Regester Blueprint to Render html pages

