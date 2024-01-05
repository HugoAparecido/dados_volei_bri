// Conexão com o banco de dados
import { jogadorInDB, timeInDB } from "./acesso_banco.js";
import { onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
// transformando os campos em variáveis
const selecionarTime = document.getElementById("time")
const selecionarJogador = document.getElementById("nome")
// popular select times
onValue(timeInDB, function (snapshot) {
    selecionarTime.innerHTML = "";
    let timesArray = Object.entries(snapshot.val())
    for (let i = 0; i < timesArray.length; i++) {
        let timeAtual = timesArray[i]
        selecionarTime.innerHTML += `<option value="${timeAtual[0]}">${timeAtual[1].nome}</option>`
    }
})
// popular select time
onValue(jogadorInDB, function (snapshot) {
    selecionarJogador.innerHTML = "";
    let jogadoresArray = Object.entries(snapshot.val())
    for (let i = 0; i < jogadoresArray.length; i++) {
        let jogadorAtual = jogadoresArray[i]
        if (Object.values(jogadorAtual).includes(timeSelecionado.levantador) || Object.values(jogadorAtual).includes(timeSelecionado.oposto) || Object.values(jogadorAtual).includes(timeSelecionado.central) || Object.values(jogadorAtual).includes(timeSelecionado.ponteiro_passador1) || Object.values(jogadorAtual).includes(timeSelecionado.ponteiro_passador2) || Object.values(jogadorAtual).includes(timeSelecionado.libero)) {
            selecionarJogador.innerHTML += `<option value="${jogadorAtual.nome}">${jogadorAtual.posicao}: ${jogadorAtual.nome} ${jogadorAtual.numero_camisa}</option>`
        }
    }
})
// popular select jogador
selecionarTime.addEventListener("change", function () {
    onValue(jogadorInDB, function (snapshot) {
        var idTime = {}
        var timeSelecionado = {}
        onValue(timeInDB, function (snapshot) {
            let timesArray = Object.entries(snapshot.val())
            for (let i = 0; i < timesArray.length; i++) {
                let timeAtual = timesArray[i]
                if (timeAtual[1].nome === selecionarTime.value) {
                    idTime = timeAtual[0]
                    timeSelecionado = timeAtual[1]
                }
            }
        })
        selecionarJogador.innerHTML = "";
        let jogadoresArray = Object.values(snapshot.val())
        for (let i = 0; i < jogadoresArray.length; i++) {
            let jogadorAtual = jogadoresArray[i]
            if (Object.values(jogadorAtual).includes(timeSelecionado.levantador) || Object.values(jogadorAtual).includes(timeSelecionado.oposto) || Object.values(jogadorAtual).includes(timeSelecionado.central) || Object.values(jogadorAtual).includes(timeSelecionado.ponteiro_passador1) || Object.values(jogadorAtual).includes(timeSelecionado.ponteiro_passador2) || Object.values(jogadorAtual).includes(timeSelecionado.libero)) {
                selecionarJogador.innerHTML += `<option value="${jogadorAtual.nome}">${jogadorAtual.posicao}: ${jogadorAtual.nome} ${jogadorAtual.numero_camisa}</option>`
            }
        }
    })
})