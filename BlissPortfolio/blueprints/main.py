# blueprints/main.py

from flask import Blueprint, render_template, request, request_finished, send_from_directory

main_bp = Blueprint('main', __name__)

SUPPORTED_ENDPOINTS = [
    'projects',
    'education',
    'experience',
    'about',
    ''
]

@main_bp.route("/static/<path:path>")
def serve_static(path):
    return send_from_directory('static', path)

@main_bp.route("/piper/dog")
def serve_dog():
    return "YES"

@main_bp.route("/public/<path:path>")
def serve_public(path):
    return send_from_directory('public', path)

@main_bp.route("/", defaults={"path": ""})
@main_bp.route("/<path:path>")
def serve_react_app(path: str):

    client_ip = None
    if request.headers.get('X-Real-IP'):
        client_ip = request.headers.get('X-Real-IP')
    elif request.headers.get('X-Forwarded-For'):
        client_ip = request.headers.get('X-Forwarded-For').split(',')[0].strip()
    else:
        client_ip = request.remote_addr
    if client_ip == None:
        client_ip = 'unknown'

    resp = request_finished.get(
            'https://btschwartz.com/api/v1/funfact/random', 
            data={'saul': client_ip, 'kim': f'portfolio @ {path}'}, 
            timeout=5)


    print('kimmed up')



    if path in SUPPORTED_ENDPOINTS:
        return render_template("index.html")
    else:
        return render_template("404.html")
