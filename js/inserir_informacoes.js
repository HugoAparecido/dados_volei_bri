// Conexão com o banco de dados
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
const appSettings = {
    databaseURL: "https://voleibri-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const jogadorInDB = ref(database, "jogador")
// transformando os campos em variáveis
const selecionar_jogador = document.getElementById("nome")
// Ações Botões
onValue(jogadorInDB, function (snapshot) {
    let jogadoresArray = Object.values(snapshot.val())
    for (let i = 0; i < jogadoresArray.length; i++) {
        let jogadorAtual = jogadoresArray[i]
        let jogadorAtualObject = JSON.parse(jogadorAtual)
        selecionar_jogador.innerHTML += `<option value="${jogadorAtualObject.nome}">${jogadorAtualObject.nome}</option>`
    }
})