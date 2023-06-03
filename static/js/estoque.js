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

  let name = document.getElementById("desc_peca").value
  let partnumber = document.getElementById("part_number").value
  // let locacao = document.getElementById("locacao").value
  let carModel = document.getElementById("modelo_carro").value
  // let sublocacao = document.getElementById("sublocacao").value
  let state = document.getElementById("estado").value
  let weight = document.getElementById("peso").value
  let subsystem = document.getElementById("subsistema").value
  let manufacturer = document.getElementById("fabricante").value
  let axleSide = document.getElementById("eixo").value
  // let lado = document.getElementById("lado").value

  let obj = {
    "name": name,
    "partnumber": partnumber,
    // "locacao": locacao,
    "carModel": carModel,
    // "sublocacao": sublocacao,
    "state": state,
    "weight": weight,
    "subsystem": subsystem,
    "manufacturer": manufacturer,
    "axleSide": axleSide,
    // "lado": lado
  }

  const url = 'http://179.209.195.115:157/api/v1/part/create'
  let auth = localStorage.getItem('auth')

  const fetchOption = {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
      'Accept': '*/*',
      "Authorization": `Bearer ${auth}`
    },
    mode: "cors",
  }


  fetch(url, fetchOption)
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
      window.alert("Erro ao cadastrar o item!")
      console.error('Ocorreu um erro:', error);
    });


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

function get_info(id, auth) {

  const url = `http://179.209.195.115:157/api/v1/part/find?id=${id}`

  const fetchOption = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Accept': '*/*',
      "Authorization": `Bearer ${auth}`
    },
    mode: "cors",
  }

  fetch(url, fetchOption)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao fazer a requisição: ' + response.status);
      }
      return response.json();
    })
    .then(data => {

      document.getElementById("info_desc_peca").value = data.name
      document.getElementById("info_part_number").value = data.partnumber
      document.getElementById("info_locacao").value = ""
      document.getElementById("info_modelo_carro").value = data.carModel
      document.getElementById("info_sublocacao").value = ""
      document.getElementById("info_estado").value = data.state
      document.getElementById("info_peso").value = data.weight
      document.getElementById("info_subsistema").value = data.subsystem
      document.getElementById("info_fabricante").value = data.manufacturer
      document.getElementById("info_eixo").value = data.axleSide
      document.getElementById("info_lado").value = "R ou L"

    })
    .catch(error => {
      window.alert("Erro na busca de informações da peça!")
      console.error('Ocorreu um erro:', error);
    });
}

function get_att() {

  let id = localStorage.getItem('id')
  let auth = localStorage.getItem('auth')

  const url = `http://179.209.195.115:157/api/v1/part/find?id=${id}`

  const fetchOption = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Accept': '*/*',
      "Authorization": `Bearer ${auth}`
    },
    mode: "cors",
  }

  fetch(url, fetchOption)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao fazer a requisição: ' + response.status);
      }
      return response.json();
    })
    .then(data => {

      document.getElementById("att_info_desc_peca").value = data.name
      document.getElementById("att_info_part_number").value = data.partnumber
      document.getElementById("att_info_locacao").value = "ççç"
      document.getElementById("att_info_modelo_carro").value = data.carModel
      document.getElementById("att_info_sublocacao").value = "ççç"
      document.getElementById("att_info_estado").value = data.state
      document.getElementById("att_info_peso").value = data.weight
      document.getElementById("att_info_subsistema").value = data.subsystem
      document.getElementById("att_info_fabricante").value = data.manufacturer
      document.getElementById("att_info_eixo").value = data.axleSide
      document.getElementById("att_info_lado").value = "R"

    })
    .catch(error => {
      window.alert("Erro na busca de informações da peça!")
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

function hide() {

  let entrada = document.getElementById('moviment_dadosForm_in')
  let saida = document.getElementById('moviment_dadosForm_out')
  saida.setAttribute("hidden", true)
  entrada.setAttribute("hidden", true)
}

