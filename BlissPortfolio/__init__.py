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
    # Strip the app.APPLICATION_ROOT from the beginning
    if path.startswith(app.config['APPLICATION_ROOT']):
        path = path[len(app.config['APPLICATION_ROOT']):]
    if path.startswith("static"):
        return flask.send_from_directory(app.static_folder, path)
    if path.startswith("public"):
        return flask.send_from_directory(app.public_folder, path)
    
    return render_template("index.html")


import BlissPortfolio.api
import BlissPortfolio.model

'''
Basically you need to 
sudo systemctl restart blissportfolioTEST

then try to access the website, notice that it just does not work and cannot find bundle.js

Need to find a clean way to incorporate APPLICATION_ROOT so that everything lives above it, and is not considered when resolving paths


'''