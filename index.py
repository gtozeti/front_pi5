import requests as r
from flask import Flask, flash, redirect, render_template, request, session

app = Flask(__name__)

app.secret_key = 'gmbnrjm'


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/login', methods=['POST'])
def login():
    email =  request.form.get('email') 
    pw = request.form.get('password')

    try:
        response = r.post('http://179.209.195.115:157/api/v1/auth/token',
                        json={'login': email, 'password': pw})

        info = response.json()

        if response.status_code == 200:
            session['auth'] = response.headers.get('Authorization')
            session['name'] = info['name']
            session['accessType'] = info['accessType']
            session['id'] = info['id']
            return redirect("/estoque")
        else:
            flash('Usuário não encontrado!')
            return redirect('/')
    except Exception as e:
            flash('Usuário não encontrado!')
            return redirect('/')

@app.route('/get_session_data')
def get_session_data():
    auth = session.get('auth')  # Obter o valor da sessão
    user = session.get('id')  # Obter o valor da sessão
    return {'auth': auth, 'user': user}


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@app.route('/cadastro')
def cadastro():
    if session.get("id"):
        return render_template("cadastro.html")
    else:
        return redirect('/')


@app.route('/estoque')
def estoque():
    if session.get("id"):
        return render_template("estoque.html")
    else:
        return redirect('/')


@app.route('/relatorio')
def relatorio():
    if session.get("id"):
        return render_template("relatorio.html")
    else:
        return redirect('/')


if __name__ == "__main__":
    # app.run(host = '192.168.15.45',debug=True)
    app.run(debug=True)
