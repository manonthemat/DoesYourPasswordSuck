from flask import Flask
import hashlib, getpass, re, os

app = Flask(__name__, static_url_path='/static')

@app.route('/secret/<pw>')
def check_password(pw):
    h = hashlib.sha1(pw).hexdigest()
    hexshort = h[6:]

    with open('cracked.txt') as f:
        for password in f:
            if re.search(h,password):
                # not cracked yet, but in the db
                return "50"
            if re.search(hexshort,password):
                # cracked
                return "66"
        return "pw not found"

@app.route('/')
def serve_index():
    return app.send_static_file('index.html')

@app.route('/app/<path:path>')
def static_files(path):
    return app.send_static_file(os.path.join('', path))

if __name__ == "__main__":
    app.run(host='0.0.0.0')
