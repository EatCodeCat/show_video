from flask import Flask
from flask import render_template
from flask import request
from flask import make_response
import uuid

app = Flask(__name__)

@app.route("/")
def index():
    resp = make_response(render_template('index.html', data={'name':'hello world'}))
    userId = request.cookies.get('userId')
    if userId is None:
        resp.set_cookie('userId', str(uuid.uuid1()))
    return resp

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
