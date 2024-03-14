let tokenDeAcesso = localStorage.getItem("token");
const url = "http://localhost:3400/produtos";
let nome = document.getElementsByClassName("nome");
let preco = document.getElementsByClassName("preco");
let qtd = document.getElementsByClassName("qtd-estoque");
let dataDeCadastro = document.getElementsByClassName("data");
let bodyDaLista = document.getElementById("bodyDalista");

let btn_de_add = document.getElementById("adicionar");
let btn_de_remover = document.getElementById("remover");

let pagina_de_cadastro = document.getElementById("idPaginaCadastro");
let btn_de_confirmar = document.getElementById("botaoDeConfirmarDoADD");
let inputDeNome = document.getElementById("nome_input");
let inputDevalor = document.getElementById("valor_input");
let inputDeQtd = document.getElementById("qtd_em_estoque_input");

let pagina_de_deletar = document.getElementById("idPaginaDelete");
let btn_de_DELETAR = document.getElementById("botaoDeConfirmarDoREMOVER");
let input_de_deletar = document.getElementById("delete_input");

function VerificarnumeroDeObjetos() {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenDeAcesso,
    },
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
        console.log(Resposta)
      }
      btn_de_remover.addEventListener("click", () => {
        fetch("http://localhost:3400/produtos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenDeAcesso,
          },
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
                Resposta.id = Resposta.id - 1
              })
              .then(() => {
                window.location.reload()
                console.log(Resposta)
              })
            })
          })
          
      })
    })
}

btn_de_add.addEventListener("click", () => {
  pagina_de_cadastro.classList.remove("Desaparecer");
});
btn_de_confirmar.addEventListener("click", () => {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenDeAcesso,
    },
  })
    .then((response) => response.json())
    .then((response) => {
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

VerificarnumeroDeObjetos()


      // btn_de_remover.addEventListener("click", () => {
      //       fetch("http://localhost:3400/produtos", {
      //         method: "GET",
      //         headers: {
      //           "Content-Type": "application/json",
      //           Authorization: tokenDeAcesso
      //         },
      //       })
      //       .then((Resposta) => Resposta.json())
      //       .then((Resposta) => {
      //         const ultimoProduto = Resposta[Resposta.length - 1]
      //         const URL3 = "http://localhost:3400/produtos" + "/" + ultimoProduto.id;
      //         fetch(URL3, {
      //           method: "DELETE",
      //           headers: {
      //             "Content-Type": "application/json",
      //             Authorization: tokenDeAcesso},
      //         }).then(() => {
      //           window.location.reload()
      //         })
      //       })
      //     })
      
