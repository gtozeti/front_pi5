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



//  Função de cadastro de peça 
let form = document.getElementById("dadosForm")
form.addEventListener("submit", (e) => {

  e.preventDefault()

 
  const url = 'http://127.0.0.1:8000'
  const endpoint = '/relat'
  // const formData = new FormData(form);

  let tipo_relat = document.getElementById("tipo_relat").value
  let dt_inicio = document.getElementById("dt_inicio").value
  let dt_fim = document.getElementById("dt_fim").value



  let obj = {
    "tipo_relat": tipo_relat,
    "dt_inicio": dt_inicio,
    "dt_fim": dt_fim
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



