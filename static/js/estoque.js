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
  // let state = document.getElementById("estado").value
  let weight = document.getElementById("peso").value
  let subsystem = document.getElementById("subsistema").value
  let manufacturer = document.getElementById("fabricante").value
  let axleSide = document.getElementById("eixo").value
  // let lado = document.getElementById("lado").value
  // let qtd = document.getElementById("quantidade").value

  let obj = {
    "name": name,
    "partnumber": partnumber,
    // "locacao": locacao,
    "carModel": carModel,
    // "sublocacao": sublocacao,
    // "state": state,
    "weight": weight,
    "subsystem": subsystem,
    "manufacturer": manufacturer,
    "axleSide": axleSide,
    // "lado": lado,
    "minimumStock": {
      "threeStages": 2,
      "sixStages": 2,
      "nineStages": 2
    }
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

//  Função de cadastro de locação 
let form_loc = document.getElementById("dadosFormSubLoc")
form_loc.addEventListener("submit", (e) => {

  e.preventDefault()

  let loc = document.getElementById("meuSelect").value
  let subloc = document.getElementById("desc_subloc").value
  let nova = document.getElementById("inputPersonalizado").value


  if (loc == 'new') {

    let obj = {
      "name": nova
    }

    const url = 'http://179.209.195.115:157/api/v1/location/create'
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

        window.alert("Locação cadastrada com sucesso")
        $('#modal_subloc').modal('hide');
        location.reload()

      })
      .catch(error => {
        window.alert("Erro ao cadastrar a locação!")
        console.error('Ocorreu um erro:', error);
      });
  }
  else {

    let obj = {
      "name": subloc
    }

    const url = `http://179.209.195.115:157/api/v1/sublocation/create?id=${loc}`
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

        window.alert("Sublocação cadastrada com sucesso")
        $('#modal_subloc').modal('hide');
        location.reload()

      })
      .catch(error => {
        window.alert("Erro ao cadastrar a sublocação!")
        console.error('Ocorreu um erro:', error);
      });
  }







})

// Função de entrada peça
let form_info_in = document.getElementById("dadosFormPartEntry")
form_info_in.addEventListener("submit", (e) => {
  e.preventDefault()

  let qtd =  document.getElementById("qtd_part_entry").value

  const url = `http://179.209.195.115:157/api/v1/part-entry/create?amount=${qtd}` 



  let userId = localStorage.getItem('user')
  let partId = document.getElementById("desc_part_entry").value
  
  let locationId = document.getElementById("subloc_part_entry").value == '' ? document.getElementById("loc_part_entry").value :  document.getElementById("subloc_part_entry").value 

  let type = document.getElementById("tipo_part_entry").value
  let state = document.getElementById("estado_part_entry").value
  let reason = document.getElementById("motivo_part_entry").value

  

  let obj = {
    "userId": userId,
    "partId": partId,
    "locationId": locationId,
    "type": type,
    "reason": reason,
    "partRequest": {
      "state": state,
      "timeInUse": 0
    }
  }

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

      window.alert("Entrada registrada com sucesso")
      $('#modal_entrada-info').modal('hide');
      // document.getElementById('moviment_dadosForm_in').setAttribute("hidden", true)
      location.reload()

    })
    .catch(error => {
      // Lide com o erro ocorrido
      console.error('Ocorreu um erro ao dar entrada na peça:', error);
    });

})

// Função de saída peça
let form_info_out = document.getElementById("moviment_dadosForm_out")
form_info_out.addEventListener("submit", (e) => {
  e.preventDefault()

  let userControl = localStorage.getItem('user')
  let userWidhdrawal = document.getElementById('moviment_action_out').value
  let partId = localStorage.getItem('id')
  let carId = document.getElementById('moviment_qtd_out').value
  let type = document.getElementById('moviment_chassis_out').value
  let reason = document.getElementById('moviment_motivo_out').value
  let stage = document.getElementById('moviment_etapa_out').value
  let session = document.getElementById('moviment_session_out').value


  let obj = {
    "userControl": userControl,
    "userWidhdrawal": userWidhdrawal,
    "partId": partId,
    "carId": carId,
    "type": type,
    "reason": reason,
    "stage": stage,
    "session": session
  }

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


  const url = 'http://179.209.195.115:157/api/v1/partout/create'


  fetch(url, fetchOption)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao fazer a requisição: ' + response.status);
      }
      return response.json();
    })
    .then(data => {

      window.alert("Saída registrada com sucesso")
      $('#modal-info').modal('hide');
      document.getElementById('moviment_dadosForm_out').setAttribute("hidden", true)
      location.reload()

    })
    .catch(error => {
      // Lide com o erro ocorrido
      console.error('Ocorreu um erro:', error);
    });

})

//  Função de atualização de peça 
let form_edit = document.getElementById("dadosFormEdit")
form_edit.addEventListener("submit", (e) => {

  e.preventDefault()

  let name = document.getElementById("att_info_desc_peca").value
  let partnumber = document.getElementById("att_info_part_number").value
  // let locacao = document.getElementById("att_info_locacao").value
  let carModel = document.getElementById("att_info_modelo_carro").value
  // let sublocacao = document.getElementById("att_info_sublocacao").value
  let state = document.getElementById("att_info_estado").value
  let weight = document.getElementById("att_info_peso").value
  // let ncm = document.getElementById("att_info_ncm").value
  let subsystem = document.getElementById("att_info_subsistema").value
  let manufacturer = document.getElementById("att_info_fabricante").value
  let axleSide = document.getElementById("att_info_eixo").value
  // let lado = document.getElementById("att_lado").value

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

  console.log('sdjkahfg')

  let id = localStorage.getItem('id')

  const url = `http://179.209.195.115:157/api/v1/part/update?id=${id}`
  let auth = localStorage.getItem('auth')

  const fetchOption = {
    method: 'PUT',
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

      window.alert("Item atualizado com sucesso")
      $('#exampleModalEdit').modal('hide');
      location.reload()

    })
    .catch(error => {
      window.alert("Erro ao atualizar o item!")
      console.error('Ocorreu um erro:', error);
    });


})

//  Função de delete de peça 
let form_delete = document.getElementById("dadosFormDelete")
form_delete.addEventListener("submit", (e) => {

  let id = localStorage.getItem('id')

  const url = `http://179.209.195.115:157/api/v1/part/delete?id=${id}`
  let auth = localStorage.getItem('auth')

  const fetchOption = {
    method: 'DELETE',
    headers: {
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

      window.alert("Item deletado com sucesso")
      $('#exampleModalDelete').modal('hide');
      location.reload()

    })
    .catch(error => {
      window.alert("Erro ao deletar o item!")
      console.error('Ocorreu um erro:', error);
    });


})

//  Função de informações de peça 
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
      document.getElementById("info_quantidade").value = data.minimumStock.threeStages
      document.getElementById("info_peso").value = data.weight
      document.getElementById("info_subsistema").value = data.subsystem
      document.getElementById("info_fabricante").value = data.manufacturer
      document.getElementById("info_eixo").value = data.axleSide
      document.getElementById("info_lado").value = "Esquerdo"

    })
    .catch(error => {
      window.alert("Erro na busca de informações da peça!")
      console.error('Ocorreu um erro:', error);
    });
}

function get_att(id) {

  console.log('iuadgfuklasdf')
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

      document.getElementById("info_delete").innerHTML = `${data.partnumber} - ${data.name} - ${data.manufacturer}`


      document.getElementById("att_info_desc_peca").value = data.name
      document.getElementById("att_info_part_number").value = data.partnumber
      document.getElementById("att_info_locacao").value = "ççç"
      document.getElementById("att_info_modelo_carro").value = data.carModel
      document.getElementById("att_info_sublocacao").value = "ççç"
      document.getElementById("att_info_estado").value = data.state
      document.getElementById("att_info_peso").value = data.weight
      document.getElementById("att_info_subsistema").value = data.subsystem
      document.getElementById("att_info_fabricante").value = data.manufacturer
      document.getElementById("att_info_quantidade").value = data.minimumStock.threeStages
      document.getElementById("att_info_eixo").value = data.axleSide
      document.getElementById("att_info_lado").value = "R"

      get_sub_loc()



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

  get_users()

}

function hide() {

  let entrada = document.getElementById('moviment_dadosForm_in')
  let saida = document.getElementById('moviment_dadosForm_out')
  saida.setAttribute("hidden", true)
  entrada.setAttribute("hidden", true)
}

// Função para trazer as locações
function get_loc() {

  const url = `http://179.209.195.115:157/api/v1/location/all`
  let auth = localStorage.getItem('auth')

  const fetchOption = {
    method: 'GET',
    headers: {
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

      loc = document.getElementById('locacao')

      while (loc.options.length > 1) {
        loc.remove(loc.options.length - 1);
      }

      data.forEach(element => {
        var novaOpcao = document.createElement('option');
        novaOpcao.value = element.id;
        novaOpcao.text = element.name;

        // Adicionar a nova opção ao <select>
        loc.appendChild(novaOpcao);
      })



    })
    .catch(error => {
      console.error('Ocorreu ao buscar as locações:', error);
    });


}

// Função para trazer as locações
function get_loc2() {

  const url = `http://179.209.195.115:157/api/v1/location/all`
  let auth = localStorage.getItem('auth')

  const fetchOption = {
    method: 'GET',
    headers: {
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

      loc = document.getElementById('meuSelect')
      var optionsToKeep = ['new', ''];
      var options = loc.options;

      // Remover todas as opções, exceto as duas desejadas
      for (var i = options.length - 1; i >= 0; i--) {
        var option = options[i];
        if (optionsToKeep.indexOf(option.value) === -1) {
          loc.remove(i);
        }
      }
      loc.selectedIndex = 0
      mostrarCampoPersonalizado(loc)

      data.forEach(element => {
        var novaOpcao = document.createElement('option');
        novaOpcao.value = element.id;
        novaOpcao.text = element.name;

        // Adicionar a nova opção ao <select>
        loc.appendChild(novaOpcao);
      })



    })
    .catch(error => {
      console.error('Ocorreu ao buscar as locações:', error);
    });


}

// Função para trazer as locações
function get_loc3() {

  const url1 = `http://179.209.195.115:157/api/v1/location/all`
  const url2 = `http://179.209.195.115:157/api/v1/part/all`
  const url3 = `http://179.209.195.115:157/api/v1/part/all`
  let auth = localStorage.getItem('auth')

  const fetchOption = {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${auth}`
    },
    mode: "cors",
  }

  desc_part_entry = document.getElementById('desc_part_entry')
  loc_part_entry = document.getElementById('loc_part_entry')

  fetch(url1, fetchOption)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao fazer a requisição: ' + response.status);
      }
      return response.json();
    })
    .then(data => {


      while (loc_part_entry.options.length > 1) {
        loc_part_entry.remove(loc.options.length - 1);
      }

      data.forEach(element => {
        var novaOpcao = document.createElement('option');
        novaOpcao.value = element.id;
        novaOpcao.text = element.name;

        // Adicionar a nova opção ao <select>
        loc_part_entry.appendChild(novaOpcao);
      })

    })
    .catch(error => {
      console.error('Ocorreu ao buscar as locações:', error);
    });


  fetch(url2, fetchOption)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao fazer a requisição: ' + response.status);
      }
      return response.json();
    })
    .then(data => {


      while (desc_part_entry.options.length > 1) {
        desc_part_entry.remove(loc.options.length - 1);
      }

      data.content.forEach(element => {
        var novaOpcao = document.createElement('option');
        novaOpcao.value = element.id;
        novaOpcao.text = element.partnumber + ' - ' + element.name;

        // Adicionar a nova opção ao <select>
        desc_part_entry.appendChild(novaOpcao);
      })

    })
    .catch(error => {
      console.error('Ocorreu ao buscar as locações:', error);
    });


}

// Função para trazer as locações
function get_users() {

  const url1 = `http://179.209.195.115:157/api/v1/user/all`
  const url2 = `http://179.209.195.115:157/api/v1/car/all`

  let auth = localStorage.getItem('auth')

  const fetchOption = {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${auth}`
    },
    mode: "cors",
  }

  moviment_action_out = document.getElementById('moviment_action_out')
  moviment_qtd_out = document.getElementById('moviment_qtd_out')

  fetch(url1, fetchOption)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao fazer a requisição: ' + response.status);
      }
      return response.json();
    })
    .then(data => {


      while (moviment_action_out.options.length > 1) {
        moviment_action_out.remove(moviment_action_out.options.length - 1);
      }

      data.content.forEach(element => {
        var novaOpcao = document.createElement('option');
        novaOpcao.value = element.id;
        novaOpcao.text = element.name;

        // Adicionar a nova opção ao <select>
        moviment_action_out.appendChild(novaOpcao);
      })

    })
    .catch(error => {
      console.error('Ocorreu ao buscar as funcionários:', error);
    });


  fetch(url2, fetchOption)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao fazer a requisição: ' + response.status);
      }
      return response.json();
    })
    .then(data => {


      while (moviment_qtd_out.options.length > 1) {
        moviment_qtd_out.remove(moviment_qtd_out.options.length - 1);
      }

      data.forEach(element => {
        var novaOpcao = document.createElement('option');
        novaOpcao.value = element.id;
        novaOpcao.text = element.model;

        // Adicionar a nova opção ao <select>
        moviment_qtd_out.appendChild(novaOpcao);
      })

    })
    .catch(error => {
      console.error('Ocorreu ao buscar as funcionários:', error);
    });



}


// Função para setar as sublocações
function get_sub(info) {


  let subloc = document.getElementById('sublocacao')
  let subloc2 = document.getElementById('subloc_part_entry')
  
  let id = info
  const url = `http://179.209.195.115:157/api/v1/location/all`
  let auth = localStorage.getItem('auth')

  const fetchOption = {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${auth}`
    },
    mode: "cors",
  }


  while (subloc.options.length > 1) {
    subloc.remove(subloc.options.length - 1);
  }
  while (subloc2.options.length > 1) {
    subloc2.remove(subloc2.options.length - 1);
  }

  fetch(url, fetchOption)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao fazer a requisição: ' + response.status);
      }
      return response.json();
    })
    .then(data => {

      data.forEach(element => {
        // console.log(element, id)
        if (element.id == id) {

          if (element.sublocations.length >= 1) {

            element.sublocations.forEach(sl => {

              var novaOpcao = document.createElement('option');
              novaOpcao.value = sl.id;
              novaOpcao.text = sl.name;

              // Adicionar a nova opção ao <select>
              subloc.appendChild(novaOpcao);
              subloc2.appendChild(novaOpcao);

            })
            subloc.removeAttribute('disabled', '')
            subloc2.removeAttribute('disabled', '')
          }
          else {
            subloc.setAttribute('disabled', 'true')
            subloc.selectedIndex = 0
            subloc2.setAttribute('disabled', 'true')
            subloc2.selectedIndex = 0
          }
        }
      });



    })
    .catch(error => {
      console.error('Ocorreu ao buscar a sublocação:', error);
    });

}

// Função para bloqueio de sublocação sem preencher a locação
function block_sub() {
  let loc = document.getElementById("desc_loc")
  let subloc = document.getElementById("desc_subloc")

  if (loc.value != '') {
    subloc.removeAttribute('disabled')
  }
  else {
    subloc.setAttribute('disabled', '')
    subloc.value = ''
  }

}

function mostrarCampoPersonalizado(selectElement) {
  var campoPersonalizado = document.getElementById('campoPersonalizado');
  var inputPersonalizado = document.getElementById('inputPersonalizado');
  let subloc = document.getElementById("desc_subloc")

  if (selectElement.value === 'new') {
    campoPersonalizado.style.display = 'block';
    inputPersonalizado.value = '';
    subloc.setAttribute('disabled', '')
    subloc.value = ''
  }
  else if (selectElement.value === '') {
    campoPersonalizado.style.display = 'none';
    inputPersonalizado.value = '';
    subloc.setAttribute('disabled', '')
    subloc.value = ''
  }
  else {
    campoPersonalizado.style.display = 'none';
    subloc.removeAttribute('disabled')

  }



}