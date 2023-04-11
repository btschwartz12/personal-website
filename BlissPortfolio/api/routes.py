from flask import jsonify, request

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

log_file = '/home/ben/web/personal-website/log.txt'

@BlissPortfolio.app.route('/api/users')
def get_users():
    users = __get_users()
    print('Yes')
    print(users)
    return jsonify([{'id': user.id, 'name': user.name, 'email': user.email} for user in users])


@BlissPortfolio.app.route('/api/piper', methods=['POST'])
def update_log():
    data = request.data.decode('utf-8')
    with open(log_file, 'w+') as f:
        f.write(data.replace('\r\n', '\n'))
    return f'Log updated successfully, size= {len(data)}'


@BlissPortfolio.app.route('/getlog', methods=['GET'])
def get_log():
    with open(log_file, 'r') as f:
        lines = [line.rstrip() for line in f.readlines()]
    return '<br>'.join(lines)