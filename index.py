from flask import Flask, render_template, request, session, redirect, flash

import requests as r

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
        response = r.post('http://localhost:8080/api/v1/auth/token',
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
            flash('Ocorreu um erro na aplicação!')
            return redirect('/')



@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@app.route('/cadastro')
def cadastro():
    return render_template("cadastro.html")


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
    app.run(debug=True)
