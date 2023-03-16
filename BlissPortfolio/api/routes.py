from flask import jsonify

import BlissPortfolio

class User:
    def __init__(self, id, name, email, password):
        self.id = id
        self.name = name
        self.email = email
        self.password = password

def __get_users():
    cur = BlissPortfolio.mysql.connection.cursor()
    cur.execute("SELECT * FROM users")
    rows = cur.fetchall()
    users = [User(id=row[0], name=row[1], email=row[2], password=row[3]) for row in rows]
    cur.close()
    return users



@BlissPortfolio.app.route('/api/users')
def get_users():
    users = __get_users()
    print('Yes')
    print(users)
    return jsonify([{'id': user.id, 'name': user.name, 'email': user.email} for user in users])


@BlissPortfolio.app.route('/api/piper')
def piper():
    users = {
        "dog": "frog",
        "cheese": [2, 234, 234]
    }
    return jsonify(users)