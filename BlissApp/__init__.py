import os
import flask
from flask_mysqldb import MySQL

app = flask.Flask(__name__)

app.config.from_object('BlissApp.config')

app.public_folder = 'public'
app.static_folder = 'static'

mysql = MySQL(app)

@app.route('/public/<path:filename>')
def public_files(filename):
    return flask.send_from_directory(app.public_folder, filename)

@app.route('/')
def index():
    return flask.send_from_directory(app.static_folder, 'index.html')

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react_app(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return flask.send_from_directory(app.static_folder, path)
    else:
        return flask.send_from_directory(app.static_folder, "index.html")


@app.route('/piper/dog')
def a():
    return "dog"


import BlissApp.api
import BlissApp.model
import BlissApp.views
