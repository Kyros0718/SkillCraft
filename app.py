from flask import Flask, render_template, request
import openai
import json
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")
@app.route("/instruction.html")
def instruction():
    return render_template("instruction.html")