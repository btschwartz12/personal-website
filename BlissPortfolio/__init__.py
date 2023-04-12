import os
import pathlib
import flask
from flask import url_for, render_template
from flask_mysqldb import MySQL

app = flask.Flask(__name__)

app.config.from_object('BlissPortfolio.config')

app.public_folder = 'public'
app.static_folder = 'static'

mysql = MySQL(app)

SUPPORTED_ENDPOINTS = [
    'projects',
    'education',
    'experience',
    'about'
]

# PREFIX = ''
PREFIX = '/portfolio'

app.template_folder = 'templates'

@app.route(f"{PREFIX}/static/<path:path>")
def serve_static(path):
    return flask.send_from_directory(app.static_folder, path)

@app.route(f"{PREFIX}/public/<path:path>")
def serve_public(path):
    return flask.send_from_directory(app.public_folder, path)

@app.route(f"{PREFIX}/", defaults={"path": ""})
@app.route(f"{PREFIX}/<path:path>")
def serve_react_app(path: str):



    if path in SUPPORTED_ENDPOINTS:
        return render_template("index.html")
    else:
        return render_template("404.html")


import BlissPortfolio.api
import BlissPortfolio.model

