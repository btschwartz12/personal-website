# Deploying a Flask App on an Ubuntu Machine with WSGI

## Introduction

This tutorial will guide you through the process of deploying a Flask app on an Ubuntu machine using WSGI.

This has been adapted from a [tutorial](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uwsgi-and-nginx-on-ubuntu-20-04) by [Digital Ocean](https://www.digitalocean.com/).

## Prerequisites

Before you begin, make sure you have the following:

- An Ubuntu machine (I did this with Ubuntu 20.04)
- Python installed on your Ubuntu machine
- A Flask app ready to deploy

### Step 1: Setup Machine and Virtual Environment

1. Install Ubuntu packages.
```bash
$ sudo apt update
$ sudo apt install python3-pip python3-dev build-essential libssl-dev libffi-dev python3-setuptools
```
2. Clone your Flask app to your Ubuntu machine and `cd` to it.
```bash
$ git clone [your repo url]
$ cd path/to/your/repo
$ pwd
path/to/your/repo
```
3. Create and activate a virtual environment.
```bash
$ pwd
path/to/your/repo
$ python3 -m venv env  # 'python' works too
$ source env/bin/activate
(env) $ echo $VIRTUAL_ENV
path/to/your/repo/env/bin
```

### Step 2: Setup Flask application

1. Install required Python packages.
```bash
(env) $ pwd
path/to/your/repo
(env) $ echo $VIRTUAL_ENV
path/to/your/repo/env/bin
(env) $ pip install wheel
(env) $ pip install uwsgi flask
```
2. Make sure your custom Flask package is setup correctly
```bash
(env) $ pwd
path/to/your/repo
(env) $ ls
...
MyProject/  # or whatever yours is called
...
(env) $ ls MyProject
...
__init__.py
...
(env) $ cat MyProject/__init__.py
```
- Your `__init__.py` should have some structure like this, to start:
```python
from flask import Flask
app = Flask(__name__)

# Defined routes, other functions, etc

if __name__ == "__main__":
    app.run(host='0.0.0.0')
```



```
3. Create a `pyproject.toml` file for your Flask app
```bash
(env) $ touch pyproject.toml
```
- Now, edit your `pyproject.toml` file to look like this:
```python
[build-system]
requires = ["setuptools>=64.0.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "MyFlaskApp"
version = "1.0.0"
dependencies = [
    # Add dependencies if needed
]
requires-python = ">=3.8"

[tool.setuptools]
packages = ["MyFlaskApp"]
```
- NOTE: replace `MyFlaskApp` with the name of the folder inside your repository whose __init__.py file instantiates the Flask app.
4. Install your custom Flask package.
```bash
(env) $ echo $VIRTUAL_ENV
path/to/your/repo/env/bin
(env) $ pip install -e .
...
MyProject 1.0.0 sucessfully installed
```



3. Create a WSGI file for your Flask app: 
```python
# wsgi.py (root of your app)
from MyProject import app

if __name__ == "__main__":
    app.run()
```

### Step 3: Follow Digital Ocean's tutorial

Follow the rest of the tutorial [here](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uwsgi-and-nginx-on-ubuntu-20-04), starting at step 4.