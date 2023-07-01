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





### Step 3: Set up uWSGI

1. Create a WSGI file for your Flask app: 
```python
# wsgi.py (root of your app)
from MyProject import app

if __name__ == "__main__":
    app.run()
```

2. Try to run your Flask app with uWSGI.
```bash
(env) $ pwd
path/to/your/repo
(env) $ ls
...
MyProject/  # or whatever yours is called
...
...
uwsgi.py
...
(env) $ echo $VIRTUAL_ENV
path/to/your/repo/env/bin
(env) $ pip install uwsgi
(env) $ uwsgi --socket 0.0.0.0:5000 --protocol=http -w wsgi:app  
```

3. Try to access the app

```bash
$ curl http://localhost:5000
[Your app html should be printed here here]
```

4. Create a ini file
```bash
(env) $ pwd
path/to/your/repo
(env) $ touch MyProject.ini
```
Now, edit your `MyProject.ini` file to look like this:
```python
[uwsgi]
module = wsgi:app

master = true
processes = 5

socket = MyProject.sock
chmod-socket = 660
vacuum = true

die-on-term = true
```
5. You can now deactivate the virtual environment.
```bash
(env) $ deactivate
$ echo $VIRTUAL_ENV
[Nothing should be printed here]
```

### Step 4: Set up Nginx

Before you begin, please ensure that your firewall is set up and you have a sudo user set up on your Ubuntu machine. Please see [this](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-22-04) tutorial for more information.

1. Install Nginx

```bash
$ sudo apt update
$ sudo apt install nginx
```

2. Check the firewall status

```bash
$ sudo ufw app list
Output
Available applications:
  Nginx Full
  Nginx HTTP
  Nginx HTTPS
  OpenSSH
```
Follow the above tutorial to set up your firewall.

3. Check the status of Nginx

```bash
$ sudo systemctl status nginx
[Should say that it is active and running]
$ curl http://localhost
[Should print the default Nginx page html]
```

4. Create a server block file for your domain
    
```bash
$ sudo vim /etc/nginx/sites-available/MyDomain
```
- Now, edit your `MyDomain` file to look like this:
```bash
server {
    listen 80;
    listen [::]:80;

    index index.html index.htm index.nginx-debian.html;

    server_name MyDomain www.MyDomain;

    location / {
        try_files $uri $uri/ =404;
    }
}
```
Now create a symbolic link to the sites-enabled directory:
```bash
$ sudo ln -s /etc/nginx/sites-available/MyDomain /etc/nginx/sites-enabled
```
Do not worry about havinga root directory set up for your domain. We will do that later.

### Step 5: Securing with Let's Encrypt

1. Install Certbot

```bash
$ sudo apt update
$ sudo apt install snapd
$ sudo snap install core
$ sudo snap refresh core
$ sudo snap install --classic certbot
$ sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

2. Ensure Nginx is configured correctly

```bash
$ sudo nginx -t
$ sudo systemctl reload nginx
```

3. Ensure the firewall is configured correctly

```bash
$ sudo ufw status
```
Should have the following output:
```bash
Output
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
Nginx Full                 ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6)
Nginx Full (v6)            ALLOW       Anywhere (v6)
```

4. Obtaining a certificate

```bash
$ sudo certbot --nginx -d MyDomain -d www.MyDomain

```

5. Ensure that it modified your Nginx server block file

```bash
$ sudo vim /etc/nginx/sites-available/MyDomain
```
Should look like this:
```bash
server {

        index index.html index.htm index.nginx-debian.html;

        server_name MyDomain www.MyDomain;

        location / {
            proxy_pass http://localhost:8000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

    listen [::]:443 ssl; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/MyDomain/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/MyDomain/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = www.MyDomain) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = MyDomain) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80;
        listen [::]:80;

        server_name MyDomain www.MyDomain;
    return 404; # managed by Certbot
}
```

That should be it for Let's Encrypt, check out [this](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-22-04) tutorial for more information.

### Step 6: Creating a systemd service file

1. Create a systemd service file

```bash
$ sudo vim /etc/systemd/system/MyProject.service
```
Edit the file to look like this:
```bash
[Unit]
Description=uWSGI instance to serve MyProject
After=network.target

[Service]
User=[your username]
Group=www-data
WorkingDirectory=/path/to/your/repo
Environment="PATH=/path/to/your/repo/env/bin"
ExecStart=/path/to/your/repo/env/bin/uwsgi --ini MyProject.ini

[Install]
WantedBy=multi-user.target
```

2. Start the service

```bash
$ sudo systemctl start MyProject
$ sudo systemctl enable MyProject
$ sudo systemctl status MyProject
[Should say that it is active and running]
$ pwd
/path/to/your/repo
$ ls
...
...
MyProject.sock
...
...
```

3. Configure Nginx to proxy requests to uWSGI

```bash
$ sudo vim /etc/nginx/sites-available/MyDomain
```
Edit the location block to look like this:
```bash
location / {
    include uwsgi_params;
    uwsgi_pass unix:/path/to/your/repo/MyProject.sock;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

4. Restart Nginx

```bash
$ sudo ln -s /etc/nginx/sites-available/MyProject /etc/nginx/sites-enabled
$ sudo unlink /etc/nginx/sites-enabled/default
$ sudo nginx -t
$ sudo systemctl restart nginx
```

5. Navigate to your domain

```bash
$ curl http://MyDomain
[Should print your project's html]
```
Or just visit your domain in your browser.

## Conclusion

This is it, please see [this](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uwsgi-and-nginx-on-ubuntu-20-04) tutorial for more information.