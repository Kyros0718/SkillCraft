from flask import Flask, render_template

app = Flask(__name__)
enable_script = False
if enable_script:
    @app.route("/")
    def index():
        return render_template("index.html")
