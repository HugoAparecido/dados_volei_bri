// Conexão com o banco de dados
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
const appSettings = {
    databaseURL: "https://voleibri-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const jogadorInDB = ref(database, "jogador")
const timeInDB = ref(database, "time")
// transformando os campos em variáveis
const localGrafico = document.getElementById("graficos")
const jogadorSelecionado = document.getElementById("nome")
const selecionarTime = document.getElementById("time")
const selecionarJogador = document.getElementById("nome")
// popular select times
onValue(timeInDB, function (snapshot) {
    selecionarTime.innerHTML = "";
    let timesArray = Object.values(snapshot.val())
    for (let i = 0; i < timesArray.length; i++) {
        let timeAtual = timesArray[i]
        selecionarTime.innerHTML += `<option value="${timeAtual.nome}">${timeAtual.nome}</option>`
    }
})
// popular select time
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
            selecionarJogador.innerHTML += `<option value="${jogadorAtual.nome}">${jogadorAtual.posicao}: ${jogadorAtual.nome} ${jogadorAtual.numero}</option>`
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
                selecionarJogador.innerHTML += `<option value="${jogadorAtual.nome}">${jogadorAtual.nome}</option>`
            }
        }
    })
})