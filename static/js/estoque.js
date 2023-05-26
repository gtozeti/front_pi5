/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.getElementById("openside").setAttribute("onClick", "javascript: closeNav();");
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("openside").setAttribute("onClick", "javascript: openNav();");
}

// <!-- Script para exibir o nome do arquivo -->
function showFileName(event) {

  var infoArea = document.getElementById('file-upload-filename');

  // the change event gives us the input it occurred in 
  var input = event.srcElement;

  // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
  var fileName = input.files[0].name;


  // use fileName however fits your app best, i.e. add it into a div
  infoArea.textContent = 'Arquivo: ' + fileName;
  infoArea.classList.add("border")
  infoArea.classList.add("border-primary")
  infoArea.classList.add("rounded")
}

// function clearLabel() {
//   var infoArea = document.getElementById('file-upload-filename');
//   infoArea.textContent = '';
//   infoArea.classList.remove("border")
//   infoArea.classList.remove("border-primary")
//   infoArea.classList.remove("rounded")
// }



//  Função de cadastro de peça 
let form = document.getElementById("dadosForm")
form.addEventListener("submit", (e) => {

  e.preventDefault()

  const form = e.currentTarget;
  const url = 'http://127.0.0.1:8000'
  const endpoint = '/cadastro'
  // const formData = new FormData(form);

  let desc_peca = document.getElementById("desc_peca").value
  let part_number = document.getElementById("part_number").value
  let locacao = document.getElementById("locacao").value
  let modelo_carro = document.getElementById("modelo_carro").value
  let sublocacao = document.getElementById("sublocacao").value
  let estado = document.getElementById("estado").value
  let peso = document.getElementById("peso").value
  let subsistema = document.getElementById("subsistema").value
  let fabricante = document.getElementById("fabricante").value
  let eixo = document.getElementById("eixo").value
  let lado = document.getElementById("lado").value



  let obj = {
    "desc_peca": desc_peca,
    "part_number": part_number,
    "locacao": locacao,
    "modelo_carro": modelo_carro,
    "sublocacao": sublocacao,
    "estado": estado,
    "peso": peso,
    "subsistema": subsistema,
    "fabricante": fabricante,
    "eixo": eixo,
    "lado": lado
  }


  const fetchOption = {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      "content-type": "application/json",
    },
    mode: "cors",
  }


  fetch(url + endpoint, fetchOption)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao fazer a requisição: ' + response.status);
      }
      return response.json();
    })
    .then(data => {

      window.alert("Item cadastrado com sucesso")
      $('#exampleModal').modal('hide');
      var tabela = $('#myTable').DataTable();
      location.reload()

    })
    .catch(error => {
      // Lide com o erro ocorrido
      console.error('Ocorreu um erro:', error);
    });




  // console.log(obj)

})

// Função de entrada peça
let form_info_in = document.getElementById("moviment_dadosForm_in")
form_info_in.addEventListener("submit", (e) => {
  e.preventDefault()

  const url = 'http://127.0.0.1:8000'
  const endpoint = '/moviment/in/'

  // elementos de entrada
  let acao_in = document.getElementById("moviment_action_in").value
  let qtd_in = document.getElementById("moviment_qtd_in").value


  let obj_in = {
    "acao": acao_in,
    "qtd": qtd_in
  }


  const fetchOption = {
    method: 'PUT',
    body: JSON.stringify(obj_in),
    headers: {
      "content-type": "application/json",
    },
    mode: "cors",
  }


  fetch(url + endpoint + localStorage.getItem("id"), fetchOption)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao fazer a requisição: ' + response.status);
      }
      return response.json();
    })
    .then(data => {

      window.alert("Item registrado com sucesso")
      $('#modal-info').modal('hide');
      document.getElementById('moviment_dadosForm_in').setAttribute("hidden", true)
      location.reload()

    })
    .catch(error => {
      // Lide com o erro ocorrido
      console.error('Ocorreu um erro:', error);
    });

})

// Função de saída peça
let form_info_out = document.getElementById("moviment_dadosForm_out")
form_info_out.addEventListener("submit", (e) => {
  e.preventDefault()

  const url = 'http://127.0.0.1:8000'
  const endpoint = '/moviment/out/'

  // elementos de saída
  let action_out = document.getElementById("moviment_action_out").value
  let qtd_out = document.getElementById("moviment_qtd_out").value
  let chassis_out = document.getElementById("moviment_chassis_out").value
  let eixo_out = document.getElementById("moviment_eixo_out").value
  let lado_out = document.getElementById("moviment_lado_out").value
  let etapa_out = document.getElementById("moviment_etapa_out").value
  let sessao_out = document.getElementById("moviment_sessao_out").value
  let peca_out = document.getElementById("moviment_peca_out").value
  let est_peca_out = document.getElementById("moviment_est_peca_out").value
  let motivo_out = document.getElementById("moviment_motivo_out").value

  let obj_out = {
    "action_out": action_out,
    "qtd_out": qtd_out,
    "chassis_out": chassis_out,
    "eixo_out": eixo_out,
    "lado_out": lado_out,
    "etapa_out": etapa_out,
    "sessao_out": sessao_out,
    "peca_out": peca_out,
    "est_peca_out": est_peca_out,
    "motivo_out": motivo_out
  }

  const fetchOption = {
    method: 'PUT',
    body: JSON.stringify(obj_out),
    headers: {
      "content-type": "application/json",
    },
    mode: "cors",
  }


  fetch(url + endpoint + localStorage.getItem("id"), fetchOption)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao fazer a requisição: ' + response.status);
      }
      return response.json();
    })
    .then(data => {

      window.alert("Item registrado com sucesso")
      $('#modal-info').modal('hide');
      document.getElementById('moviment_dadosForm_out').setAttribute("hidden", true)
      location.reload()

    })
    .catch(error => {
      // Lide com o erro ocorrido
      console.error('Ocorreu um erro:', error);
    });

})

function get_info(id) {

  fetch('http://127.0.0.1:8000' + '/estoque/' + id, { method: 'GET', mode: "cors" })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao fazer a requisição: ' + response.status);
      }
      return response.json();
    })
    .then(data => {

      document.getElementById("info_desc_peca").value = data.desc_peca
      document.getElementById("info_part_number").value = data.part_number
      document.getElementById("info_locacao").value = ""
      document.getElementById("info_modelo_carro").value = ""
      document.getElementById("info_sublocacao").value = ""
      document.getElementById("info_estado").value = "New ou Old"
      document.getElementById("info_peso").value = ""
      document.getElementById("info_subsistema").value = ""
      document.getElementById("info_fabricante").value = ""
      document.getElementById("info_eixo").value = ""
      document.getElementById("info_lado").value = "R ou L"

    })
    .catch(error => {
      // Lide com o erro ocorrido
      console.error('Ocorreu um erro:', error);
    });
}

function att(e) {


  let entrada = document.getElementById('moviment_dadosForm_in')
  let saida = document.getElementById('moviment_dadosForm_out')



  if (e.textContent == "Entrada") {
    if (!entrada.hasAttribute('hidden')) {
      entrada.setAttribute("hidden", true)
    }
    else {


      entrada.removeAttribute("hidden")
      saida.setAttribute("hidden", true)
    }


  }
  else {
    if (!saida.hasAttribute('hidden')) {
      saida.setAttribute("hidden", true)
    }
    else {


      saida.removeAttribute("hidden")
      entrada.setAttribute("hidden", true)
    }

  }


}


