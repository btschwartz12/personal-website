import flask
from flask_mysqldb import MySQL

app = flask.Flask(__name__)

app.config.from_object('BlissApp.config')

app.public_folder = 'public'

mysql = MySQL(app)

@app.route('/public/<path:filename>')
def public_files(filename):
    return flask.send_from_directory(app.public_folder, filename)


import BlissApp.api
import BlissApp.model
import BlissApp.views
