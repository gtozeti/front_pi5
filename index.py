from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/cadastro')
def cadastro():
    return render_template("cadastro.html")

# @app.route('/template')
# def template():
#     return render_template("template.html")

@app.route('/estoque')
def estoque():
    return render_template("estoque.html")

@app.route('/cadastro_peca')
def cadastro_peca():
    return render_template("cadastro_peca.html")

@app.route('/relatorio')
def relatorio():
    return render_template("relatorio.html")

@app.route('/home/<user>')
def user(user):
    return render_template("usuario.html", user=user)

if __name__ == "__main__":
    app.run(debug=True)