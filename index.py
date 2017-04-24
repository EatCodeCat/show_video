from flask import Flask
from flask import render_template
from flask import request
from flask import make_response
import uuid
from model.recommendData import *

app = Flask(__name__)


def getUserInfo():
    userId = request.cookies.get('userId')
    if userId is None:
        userId = str(uuid.uuid1())
    return userId


@app.route("/")
def index():
    data = {}
    userId = getUserInfo()
    data = fetchData(userId)
    resp = make_response(render_template('index.html', data=data))
    resp.set_cookie('userId', userId)
    return resp


@app.route("/login")
def login():
    return render_template('login.html')

@app.route("/me")
def me():
    return render_template('login.html')

@app.route("/video")
def video():
    return render_template('video.html')

@app.route("/arctile")
def arctile():
    return render_template('arctile.html')

@app.route("/detail/<id>")
def detail(id):
    return render_template('detail.html')



if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
