from flask import Flask
import hashlib
import getpass
import re

app = Flask(__name__)
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

if __name__ == "__main__":
    app.run(host='0.0.0.0')
