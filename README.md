# README - Projeto de Gerenciamento de Estoque

Este é o README do projeto PI-V SENAC de gerenciamento de estoque que utiliza Flask para o desenvolvimento do front-end. Neste documento, você encontrará informações importantes sobre o projeto, requisitos, configuração, execução e outras considerações relevantes. Siga as instruções abaixo para começar.

## Descrição do Projeto

O projeto de gerenciamento de estoque é uma aplicação web que permite o controle de estoque de produtos de uma empresa. Através da interface web desenvolvida com Flask, os usuários poderão adicionar novos produtos, visualizar o estoque atual e realizar operações de busca. A aplicação também oferece recursos de autenticação para garantir que apenas usuários autorizados possam acessar e modificar os dados do estoque.

## Requisitos

Certifique-se de ter as seguintes ferramentas e tecnologias instaladas em seu ambiente de desenvolvimento:

- Python 3 (versão 3.6 ou superior)
- Flask (versão 2.0.1 ou superior)

## Configuração

1. Clone este repositório em seu ambiente de desenvolvimento:

```
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

2. Navegue até o diretório do projeto:

```
cd nome-do-repositorio
```

3. Crie e ative um ambiente virtual (opcional, mas recomendado):

```
python3 -m venv venv
source venv/bin/activate
```

4. Instale as dependências do projeto:

```
pip install -r requirements.txt
```

5. Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e defina a seguinte variável:

```
SECRET_KEY=sua_chave_secreta
```

Certifique-se de substituir `sua_chave_secreta` por uma sequência de caracteres aleatórios.

6. Execute a aplicação:

```
flask run
```

Acesse a URL fornecida no terminal para visualizar a aplicação em funcionamento.

## Utilização

Após executar a aplicação e acessar a URL no navegador, você será redirecionado para a página de login. Caso seja a primeira execução, você precisará que o administrador do sistema tenha criado a sua conta de usuário.

Após fazer login, você terá acesso à página principal do sistema de gerenciamento de estoque. A partir daqui, você poderá adicionar novos produtos, atualizar informações existentes e visualizar o estoque atual de acordo com os sues níveis de permissão. A aplicação oferece recursos de busca para facilitar a localização de produtos específicos.

## Contribuição

Se você deseja contribuir para este projeto, siga as etapas abaixo:

1. Faça um fork deste repositório.
2. Crie uma nova branch com a sua contribuição:

```
git checkout -b minha-nova-feature
```

3. Faça as alterações necessárias e adicione os commits.

4. Envie as alterações para o seu repositório fork:

```
git push origin minha-nova-feature
```

5. Abra

 um Pull Request neste repositório.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Grupo

Obrigado por usar o nosso sistema de gerenciamento de estoque! Esperamos que seja útil para suas necessidades.

Grupo 7 - Gustavo Tozeti Herculano | Matheus Cavalcanti de Arruda | Bruno Filipe Sousa | Natan Camargo | Ruy Silva Menezes | Joao Vitor Richard | Matheus Pereira 