import os
import pathlib


# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = 'portfolio'


# Secret key for encrypting cookies
SECRET_KEY = os.urandom(24)
SESSION_COOKIE_NAME = 'login'


# File Upload to var/uploads/
# BLISSAPI_ROOT = pathlib.Path(__file__).resolve().parent.parent
# UPLOAD_FOLDER = BLISSAPI_ROOT/'var'/'uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
MAX_CONTENT_LENGTH = 16 * 1024 * 1024

