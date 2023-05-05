from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/home/<user>')
def user(user):
    return render_template("usuario.html", user=user)

if __name__ == "__main__":
    app.run(debug=True)