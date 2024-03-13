let tokenDeAcesso = localStorage.getItem("token")
const url = "http://localhost:3400/produtos"
      let nome = document.getElementsByClassName("nome")
      let preco = document.getElementsByClassName("preco")
      let qtd = document.getElementsByClassName("qtd-estoque")
      let dataDeCadastro = document.getElementsByClassName("data")
      let bodyDaLista = document.getElementById("bodyDalista")

      let btn_de_add = document.getElementById("adicionar")
      let btn_de_remover = document.getElementById("remover")
      let pagina_de_cadastro = document.getElementById("idPaginaCadastro")
      let btn_de_confirmar = document.getElementById("botaoDeConfirmar")
      let inputDeNome = document.getElementById("nome_input")
      let inputDevalor = document.getElementById("valor_input")
      let inputDeQtd = document.getElementById("qtd_em_estoque_input")

      function VerificarnumeroDeObjetos() {
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenDeAcesso,
          },
        })
        .then((batata) => batata.json())
        .then((batata) => {
          for (var i = 0; i < batata.length; i++) {
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
            tdnome.innerHTML = batata[i].nome;
            tdpreco.innerHTML = batata[i].valor;
            tdqtd.innerHTML = batata[i].quantidadeEstoque;
            tddata.innerHTML = batata[i].dataCadastro;
          }
          btn_de_remover.addEventListener("click", () => {
            fetch("http://localhost:3400/produtos", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: tokenDeAcesso,
              },
            })
            .then((batata) => batata.json())
            .then((batata) => {
              const ultimoProduto = batata[batata.length - 1]
              const URL3 = "http://localhost:3400/produtos" + "/" + ultimoProduto.id;
              fetch(URL3, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: tokenDeAcesso},
              }).then(() => {
                window.location.reload()
              })
            })
          })
        })
      }
      

      btn_de_add.addEventListener("click", () => {
        pagina_de_cadastro.classList.remove("Desaparecer")
      })
      btn_de_confirmar.addEventListener("click", () => {
        let novoObjeto = {
            "nome": inputDeNome.value,
            "valor": inputDevalor.value,
            "quantidadeEstoque": inputDeQtd.value,
            "observacao": "objeto novo",
            "dataCadastro": new Date()
        }
        const URL3 = "http://localhost:3400/produtos"
        fetch(URL3, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenDeAcesso},
            body: JSON.stringify(novoObjeto)
        })
        pagina_de_cadastro.classList.add("Desaparecer")
        window.location.reload()
      })
      
      
      VerificarnumeroDeObjetos();
      /*fetch("http://localhost:3400/produtos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenDeAcesso,
          },
        })
        .then((batata) => batata.json()) */