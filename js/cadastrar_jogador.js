// Conexão com o banco de dados
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
const appSettings = {
    databaseURL: "https://voleibri-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const jogadorInDB = ref(database, "jogador")
// transformando os campos em variáveis
const nomeJogador = document.getElementById("nome_jogador")
const numCamisaJogador = document.getElementById("num_camisa_jogador")
const posicaoJogador = document.getElementById("posicao_jogador")
const sexoJogador = document.getElementById("sexo_jogador")
const alturaJogador = document.getElementById("altura_jogador")
const pesoJogador = document.getElementById("peso_jogador")
const botaoCadastrarJogador = document.getElementById("cadastrar_jogador")
const divRetorno = document.getElementById("retorno")
botaoCadastrarJogador.addEventListener("click", function () {
    let valorCadastar = `nome: ${nomeJogador.value}, numero_camisa: ${numCamisaJogador.value}, posicao: ${posicaoJogador.value}, sexo: ${sexoJogador.value}, altura: ${alturaJogador.value}, peso: ${pesoJogador.value}, saque_fora: 0, saque dentro: 0`
    if (posicaoJogador.value === "Oposto") {
        valorCadastar += ", ataques_acertados: 0, ataques_errados: 0"
    }
    push(jogadorInDB, valorCadastar)
    divRetorno.innerHTML += "<p>Jogador cadastrado com sucesso</p>"
})