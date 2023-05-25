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
  console.log(e.textContent)
  let modal = document.getElementById("moviment")

  let entrada = "entrada"
  let saida = "saida"

  
  
  modal.insertAdjacentHTML('afterend', e.textContent == "Entrada" ? entrada :saida )
  

}
