# BackEnd/__init__.py

from flask import Flask, request, render_template
from back_end.routes import bp

app = Flask(__name__, template_folder='../front_end/templates') #Help Flask Locate templates folder



app.static_folder = '../front_end/static' #Help Flask Locate static folder
app.register_blueprint(bp) #Regester Blueprint to Render html pages

