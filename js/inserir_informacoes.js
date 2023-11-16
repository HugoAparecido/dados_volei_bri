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
const selecionarJogador = document.getElementById("nome")
const salvar = document.getElementById("salvar")
const saque = document.getElementById("saque")
const tipoSaque = document.getElementById("tipo_saque")
const ace = document.getElementById("ace")
// Ações Botões
onValue(jogadorInDB, function (snapshot) {
    let jogadoresArray = Object.values(snapshot.val())
    for (let i = 0; i < jogadoresArray.length; i++) {
        let jogadorAtual = jogadoresArray[i]
        selecionarJogador.innerHTML += `<option value="${jogadorAtual.nome}">${jogadorAtual.nome}</option>`
    }
})
salvar.addEventListener("click", function () {
    var idJogador = ""
    var jogadorSelecionado = ""
    onValue(jogadorInDB, function (snapshot) {
        let jogadoresArray = Object.entries(snapshot.val())
        for (let i = 0; i < jogadoresArray.length; i++) {
            let jogadorAtual = jogadoresArray[i]
            if (jogadorAtual[1].nome === selecionarJogador.value) {
                idJogador = jogadorAtual[0]
                jogadorSelecionado = jogadorAtual[1]
            }
        }
    })
    if (document.querySelector('input[name="ace"]:checked').value === "sim") {
        push(ref(database, `jogador/${idJogador}/${document.querySelector('input[name="saque"]:checked').value}/ace/${tipoSaque.value}`), (jogadorSelecionado.saque_dentro.ace[tipoSaque.value] += 1))
    }
})