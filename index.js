let EMAIL = "admin@admin.com"
let SENHA = "123456"

let btnDeEntrar = document.getElementById("botaodeentrar")
let CampoDoemail = document.getElementById("email")
let CampoDaSenha = document.getElementById("senha")

btnDeEntrar.addEventListener("click", () =>{
    let emailDigitado = CampoDoemail.value.toLowerCase()
    let senhaDigitada = CampoDaSenha.value
    /*
    if(emailDigitado != EMAIL || senhaDigitada != SENHA){
        alert("Email ou senha incorretos! Tente novamente")
        return
    }
    */
   Autenticar(emailDigitado, senhaDigitada)
})

function Autenticar(email, senha){
    const URL = "http://localhost:3400/login"
    fetch(URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, senha})
    }).then(response => response = response.json())
    .then(response => {
        console.log(response.token)
        localStorage.setItem("token", response.token)
        window.open("testeDeHome.html", "_self")

    })
    .catch(erro => {
        console.log(erro)
    })
}
/* */