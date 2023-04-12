# blueprintsapi.py

from flask import Blueprint, jsonify

from BlissPortfolio.model import get_db

api_bp = Blueprint('api', __name__)




class User:
    def __init__(self, id, name, email, password):
        self.id = id
        self.name = name
        self.email = email
        self.password = password

def __get_users():
    db = get_db()
    cur = db.connection.cursor()
    cur.execute("SELECT * FROM users")
    rows = cur.fetchall()
    users = [User(id=row[0], name=row[1], email=row[2], password=row[3]) for row in rows]
    cur.close()
    return users
    

@api_bp.route("/", defaults={"path": ""})
@api_bp.route("/")
def get_services():
    return "NO SERVICES HAHAHA"


@api_bp.route('/piper')
def piper():
    return 'piper dog'


@api_bp.route('/users')
def get_users():
    users = __get_users()
    print('Yes')
    print(users)
    return jsonify([{'id': user.id, 'name': user.name, 'email': user.email} for user in users])


