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

function remove() {
  document.getElementById("senha").classList.remove("is-invalid")
  document.getElementById("confirma_senha").classList.remove("is-invalid")


}

//  Função de cadastro de funcionário 
let form = document.getElementById("dadosForm")
form.addEventListener("submit", (e) => {

  e.preventDefault()

  const url = 'http://localhost:8080/api/v1/user/create'

  let name = document.getElementById("nome").value
  let sobrenome = document.getElementById("sobrenome").value
  let login = document.getElementById("email").value
  let accessType = document.getElementById("acesso").value
  var pw1 = document.getElementById("senha")
  var pw2 = document.getElementById("confirma_senha")


  if (pw1.value != pw2.value) {
    pw1.classList.add("is-invalid")
    pw2.classList.add("is-invalid");

  }


})