// Conexão com o banco de dados
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
const appSettings = {
    databaseURL: "https://voleibri-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const jogadorInDB = ref(database, "jogador")
const timeInDB = ref(database, "time")
// transformando campos em variáveis
const nomeTime = document.getElementById("nome_time")
const sexotime = document.getElementById("sexo_time")
const botaoCadastrarTime = document.getElementById("cadastrar_time")
const exibicaoTimes = document.getElementById("times_cadastrados")
const mostrarTimes = document.getElementById("mostrar_times")
// colocando valores nos selects
const idJogador = [document.getElementById("jogador1"), document.getElementById("jogador2"), document.getElementById("jogador3"), document.getElementById("jogador4"), document.getElementById("jogador5"), document.getElementById("jogador6")]
for (let i = 0; i < 6; i++) {
    onValue(jogadorInDB, function (snapshot) {
        let jogadoresArray = Object.values(snapshot.val())
        for (let j = 0; j < jogadoresArray.length; j++) {
            let jogadorAtual = jogadoresArray[j]
            idJogador[i].innerHTML += `<option value="${jogadorAtual.nome}">${jogadorAtual.nome}</option>`
        }
    })
}
// cadastrar o time
botaoCadastrarTime.addEventListener("click", function () {
    let valorCadastar = {
        nome: nomeTime.value,
        sexo: sexotime.value,
        levantador: idJogador[0].value,
        oposto: idJogador[1].value,
        central: idJogador[2].value,
        ponteiro_passador1: idJogador[3].value,
        ponteiro_passador2: idJogador[4].value,
        libero: idJogador[5].value
    }
    push(timeInDB, valorCadastar)
    alert("Time Cadastrado com Sucesso")
})
mostrarTimes.addEventListener("click", function () {
    onValue(timeInDB, function (snapshot) {
        let timesArray = Object.values(snapshot.val())
        for (let i = 0; i < timesArray.length; i++) {
            let timeAtual = timesArray[i]
            exibicaoTimes.innerHTML += `<tr><td>${timeAtual.nome}</td><td>${timeAtual.sexo}</td><td>${timeAtual.levantador}</td><td>${timeAtual.oposto}</td><td>${timeAtual.central}</td><td>${timeAtual.ponteiro_passador1}</td><td>${timeAtual.ponteiro_passador2}</td><td>${timeAtual.libero}</td></tr>`
        }
    })
})