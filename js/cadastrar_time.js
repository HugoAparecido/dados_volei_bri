// Conexão com o banco de dados
import { timeInDB } from "./acesso_banco.js";
import { push, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
// transformando campos em variáveis
const nomeTime = document.getElementById("nome_time")
const sexotime = document.getElementById("sexo_time")
const botaoCadastrarTime = document.getElementById("cadastrar_time")
const exibicaoTimes = document.getElementById("times_cadastrados")
const mostrarTimes = document.getElementById("mostrar_times")
// cadastrar o time
botaoCadastrarTime.addEventListener("click", function () {
    let valorCadastar = {
        nome: nomeTime.value,
        sexo: sexotime.value,
        jogadores: ""
    }
    push(timeInDB, valorCadastar)
    alert("Time Cadastrado com Sucesso!!")
})
mostrarTimes.addEventListener("click", function () {
    onValue(timeInDB, function (snapshot) {
        let timesArray = Object.values(snapshot.val())
        for (let i = 0; i < timesArray.length; i++) {
            let timeAtual = timesArray[i]
            exibicaoTimes.innerHTML += `<tr><td>${timeAtual.nome}</td><td>${timeAtual.sexo}</td></tr>`
        }
    })
})