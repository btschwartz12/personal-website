import flask

import BlissApp


@BlissApp.app.route('/')
def show_index():
    print('yes')
    context = {
        "title": "YES"
    }

    return flask.render_template("index.html", **context)