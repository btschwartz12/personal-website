import os
import pathlib
import flask
from flask_mysqldb import MySQL
from BlissPortfolio.blueprints.main import main_bp

app = flask.Flask(__name__)
app.config.from_object('BlissPortfolio.config')


app.register_blueprint(main_bp, url_prefix='/portfolio')
# app.register_blueprint(api_bp, url_prefix='/portfolio/api')

app.static_folder = 'static'
app.template_folder = 'templates'

mysql = MySQL(app)



if __name__ == "__main__":
    app.run()
