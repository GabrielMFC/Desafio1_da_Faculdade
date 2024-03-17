let tokenDeAcesso = localStorage.getItem("token")
const url = "http://localhost:3400/produtos"
let nome = document.getElementsByClassName("nome")
let preco = document.getElementsByClassName("preco")
let qtd = document.getElementsByClassName("qtd-estoque")
let dataDeCadastro = document.getElementsByClassName("data")
let bodyDaLista = document.getElementById("bodyDalista")

let btn_de_add = document.getElementById("adicionar")
let btn_de_remover = document.getElementById("remover")
let btn_de_editar = document.getElementById("editar")

let pagina_de_cadastro = document.getElementById("idPaginaCadastro")
let btn_de_confirmar = document.getElementById("botaoDeConfirmarDoADD")
let inputDeNome = document.getElementById("nome_input")
let inputDevalor = document.getElementById("valor_input")
let inputDeQtd = document.getElementById("qtd_em_estoque_input")

let pagina_de_deletar = document.getElementById("idPaginaDelete")
let btn_de_DELETAR = document.getElementById("botaoDeConfirmarDoREMOVER")
let input_de_deletar = document.getElementById("delete_input")

let pagina_de_editar = document.getElementById("idPaginaEditar")
let btn_de_redefinir = document.getElementById("botaoDeRedefinir")
let input_do_numero = document.getElementById("numeroParaEditar")
let input_do_nome_editar = document.getElementById("input_de_nomeEditar")
let input_do_valor_editar = document.getElementById("input_de_valorEditar")
let input_da_qtd_editar = document.getElementById("input_de_qtdEditar")

/* Verificar/Deletar produtos */
function VerificarnumeroDeObjetosEdeletar() {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenDeAcesso
    }
  })
    .then((Resposta) => Resposta.json())
    .then((Resposta) => {
      for (var i = 0; i < Resposta.length; i++) {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        let tdnome = document.createElement("td");
        let tdpreco = document.createElement("td");
        let tdqtd = document.createElement("td");
        let tddata = document.createElement("td");
        bodyDaLista.appendChild(tr);
        tr.appendChild(th);
        tr.appendChild(tdnome);
        tr.appendChild(tdpreco);
        tr.appendChild(tdqtd);
        tr.appendChild(tddata);
        th.innerHTML = i + 1;
        tdnome.innerHTML = Resposta[i].nome
        tdpreco.innerHTML = Resposta[i].valor
        tdqtd.innerHTML = Resposta[i].quantidadeEstoque
        tddata.innerHTML = Resposta[i].dataCadastro
      }
      
      btn_de_remover.addEventListener("click", () => {
        
        fetch("http://localhost:3400/produtos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenDeAcesso,
          }
        })
          .then((Resposta) => Resposta.json())
          .then(() => {
            pagina_de_deletar.classList.remove("Desaparecer");
          })
          .then(() => {
            btn_de_DELETAR.addEventListener("click", () => {
              
              const itemAserDeletado = Resposta[input_de_deletar.value - 1]
              const urlParadeletar =
                "http://localhost:3400/produtos"+ "/" + itemAserDeletado.id
              fetch(urlParadeletar, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: tokenDeAcesso,
                }
              }).then(() => {
                window.location.reload()
              })
            })
          })
          
      })
    })
}

/* Adicionar produtos */
btn_de_add.addEventListener("click", () => {
  pagina_de_cadastro.classList.remove("Desaparecer");
});
btn_de_confirmar.addEventListener("click", () => {
  if(!inputDeNome.value || !inputDevalor.value || !inputDeQtd.value){
    alert("Preencha todos os campos")
    pagina_de_cadastro.classList.add("Desaparecer")
    return
  }
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenDeAcesso,
    },
  })
    .then((response) =>  {
      response = response.json()
        let novoObjeto = {
          id: response.length,
          nome: inputDeNome.value,
          valor: inputDevalor.value,
          quantidadeEstoque: inputDeQtd.value,
          observacao: "objeto novo",
          dataCadastro: new Date()
        }
        
        fetch("http://localhost:3400/produtos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: tokenDeAcesso
            },
            body: JSON.stringify(novoObjeto)
          })
          .then(() => {
            window.location.reload()
          })

    })
})

/* Editar de produtos */
btn_de_editar.addEventListener("click", () => {
  pagina_de_editar.classList.remove("Desaparecer")
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenDeAcesso
    }
  })
  .then((Resposta) => Resposta.json())
  .then((Resposta) => {
    btn_de_redefinir.addEventListener("click", () => {
      if(!input_do_numero.value){
        alert("Digite o número do produto")
        return
      }
    var ValoresEditados = {
      nome: input_do_nome_editar.value ? input_do_nome_editar.value : Resposta[input_do_numero.value -1].nome,
      valor: input_do_valor_editar.value ? input_do_valor_editar.value : Resposta[input_do_numero.value -1].valor,
      quantidadeEstoque: input_da_qtd_editar.value ? input_da_qtd_editar.value : Resposta[input_do_numero.value -1].quantidadeEstoque,
      dataCadastro: Resposta[input_do_numero.value -1].dataCadastro
    }

    if(!input_do_nome_editar.value && !input_do_valor_editar.value && !input_da_qtd_editar.value) {
      alert("preencha pelo menos o campo de valor ou o de quantidade")
      return
    }
    const itemAserEditado = Resposta[input_do_numero.value - 1]
    fetch("http://localhost:3400/produtos" + "/" + itemAserEditado.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenDeAcesso,
      },
      body: JSON.stringify(ValoresEditados)
    })
    .then(() => {
       window.location.reload()
    })
  })})
})

VerificarnumeroDeObjetosEdeletar()
