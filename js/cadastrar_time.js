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
const adicionarJogadores = document.getElementById("adicionar_jogadores")
// colocando valores nos selects
for (let i = 0; i < 6; i++) {
    adicionarJogadores.innerHTML += `<select name="jogador${i + 1}" id="jogador${i + 1}"></select>`
    let idJogador = document.getElementById(`jogador${i + 1}`)
    onValue(jogadorInDB, function (snapshot) {
        let jogadoresArray = Object.values(snapshot.val())
        for (let j = 0; j < jogadoresArray.length; j++) {
            let jogadorAtual = jogadoresArray[j]
            idJogador.innerHTML += `<option value="${jogadorAtual.nome}">${jogadorAtual.nome}</option>`
        }
    })
}