import pathlib


# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'


# Secret key for encrypting cookies
SECRET_KEY = b'Lv\xb6\xe7\xfet5-R\xaeH\xa1\x85LU7v\x011<\\x\x83\xb2'
SESSION_COOKIE_NAME = 'login'


# File Upload to var/uploads/
# BLISSAPI_ROOT = pathlib.Path(__file__).resolve().parent.parent
# UPLOAD_FOLDER = BLISSAPI_ROOT/'var'/'uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
MAX_CONTENT_LENGTH = 16 * 1024 * 1024


# MYSQL_HOST = 'localhost'
# MYSQL_USER = 'ben'
# MYSQL_PASSWORD = 'kagxip-xekmUg-1sixte'
# MYSQL_DB = 'mydb'