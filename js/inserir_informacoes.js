// Conexão com o banco de dados
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
const appSettings = {
    databaseURL: "https://voleibri-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
// conexão com o campo jogador do banco
const jogadorInDB = ref(database, "jogador")
// conexão com o campo time do banco
const timeInDB = ref(database, "time")
// Introduzindo o time à página
const timeExportadoInput = document.getElementById("timeSelecionado")
const urlParams = new URLSearchParams(window.location.search)
if (urlParams.get("timeSelecionado") != null) {
    localStorage.setItem("timeAtual", urlParams.get("timeSelecionado"))
}
// botões para salvar
const salvarSaque = document.getElementById("salvar_saque")
const salvarPasse = document.getElementById("salvar_passe")
const salvarAtaque = document.getElementById("salvar_ataque")
const salvarLevantamento = document.getElementById("salvar_levantamento")
const salvarOutroJogador = document.getElementById("adicionar_jogador_button")
// itens do formilário para pegar dados
const tipoSaque = document.getElementById("tipo_saque")
const timeExportado = document.getElementById("time_exportado")
const timeSexo = document.getElementById("sexo_time")
const selecionarJogador = document.getElementById("nome")
const novoJogadorSelecionar = document.getElementById("novo_jogador")
// Pegando o time selecionado e colocando no h1 o nome
timeExportado.innerHTML = `Time: ${localStorage.getItem("timeAtual")}`
// Colocando o sexo do time
var idTime = ""
var timeSelecionado = {}
onValue(timeInDB, function (snapshot) {
    let timesArray = Object.entries(snapshot.val())
    for (let i = 0; i < timesArray.length; i++) {
        let timeAtual = timesArray[i]
        if (timeAtual[1].nome === localStorage.getItem("timeAtual")) {
            timeSelecionado = timeAtual[1]
            idTime = timeAtual[0]
            timeSexo.innerHTML = `${timeSelecionado.sexo === "M" ? "Sexo: Masculino" : "Sexo: Feminino"}`
        }
    }
})
// Colocar os jogadores
onValue(jogadorInDB, function (snapshot) {
    let jogadoresArray = Object.values(snapshot.val())
    for (let i = 0; i < jogadoresArray.length; i++) {
        let jogadorAtual = jogadoresArray[i]
        if (Object.values(jogadorAtual).includes(timeSelecionado.levantador)) {
            document.getElementById("levantador").innerHTML += `<span>Levantador: ${jogadorAtual.numero_camisa} ${jogadorAtual.nome}</span>
            <div class="passes">
            <span>Passe: </span>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_A" id="${jogadorAtual.nome}_passe_A">
                <label class="form-label" for="${jogadorAtual.nome}_passe_A">A</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_B" id="${jogadorAtual.nome}_passe_B">
                <label class="form-label" for="${jogadorAtual.nome}_passe_B">B</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_C" id="${jogadorAtual.nome}_passe_C">
                <label class="form-label" for="${jogadorAtual.nome}_passe_C">C</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_D" id="${jogadorAtual.nome}_passe_D">
                <label class="form-label" for="${jogadorAtual.nome}_passe_D">D</label>
            </div>`
        }
        if (Object.values(jogadorAtual).includes(timeSelecionado.oposto)) {
            document.getElementById("oposto").innerHTML += `<span>Oposto: ${jogadorAtual.numero_camisa} ${jogadorAtual.nome}</span>
            <div class="passes">
            <span>Passe: </span>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_A" id="${jogadorAtual.nome}_passe_A">
                <label class="form-label" for="${jogadorAtual.nome}_passe_A">A</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_B" id="${jogadorAtual.nome}_passe_B">
                <label class="form-label" for="${jogadorAtual.nome}_passe_B">B</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_C" id="${jogadorAtual.nome}_passe_C">
                <label class="form-label" for="${jogadorAtual.nome}_passe_C">C</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_D" id="${jogadorAtual.nome}_passe_D">
                <label class="form-label" for="${jogadorAtual.nome}_passe_D">D</label>
            </div>`
        }
        if (Object.values(jogadorAtual).includes(timeSelecionado.central)) {
            document.getElementById("central").innerHTML += `<span>Central: ${jogadorAtual.numero_camisa} ${jogadorAtual.nome}</span>
            <div class="passes">
            <span>Passe: </span>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_A" id="${jogadorAtual.nome}_passe_A">
                <label class="form-label" for="${jogadorAtual.nome}_passe_A">A</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_B" id="${jogadorAtual.nome}_passe_B">
                <label class="form-label" for="${jogadorAtual.nome}_passe_B">B</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_C" id="${jogadorAtual.nome}_passe_C">
                <label class="form-label" for="${jogadorAtual.nome}_passe_C">C</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_D" id="${jogadorAtual.nome}_passe_D">
                <label class="form-label" for="${jogadorAtual.nome}_passe_D">D</label>
            </div>`
        }
        if (Object.values(jogadorAtual).includes(timeSelecionado.ponteiro_passador1)) {
            document.getElementById("ponteiro_passador1").innerHTML += `<span>Ponteiro Passsador 1: ${jogadorAtual.numero_camisa} ${jogadorAtual.nome}</span>
            <div class="passes">
            <span>Passe: </span>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_A" id="${jogadorAtual.nome}_passe_A">
                <label class="form-label" for="${jogadorAtual.nome}_passe_A">A</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_B" id="${jogadorAtual.nome}_passe_B">
                <label class="form-label" for="${jogadorAtual.nome}_passe_B">B</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_C" id="${jogadorAtual.nome}_passe_C">
                <label class="form-label" for="${jogadorAtual.nome}_passe_C">C</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_D" id="${jogadorAtual.nome}_passe_D">
                <label class="form-label" for="${jogadorAtual.nome}_passe_D">D</label>
            </div>`
        }
        if (Object.values(jogadorAtual).includes(timeSelecionado.ponteiro_passador2)) {
            document.getElementById("ponteiro_passador2").innerHTML += `<span>Ponteiro Passsador 2: ${jogadorAtual.numero_camisa} ${jogadorAtual.nome}</span>
            <div class="passes">
            <span>Passe: </span>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_A" id="${jogadorAtual.nome}_passe_A">
                <label class="form-label" for="${jogadorAtual.nome}_passe_A">A</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_B" id="${jogadorAtual.nome}_passe_B">
                <label class="form-label" for="${jogadorAtual.nome}_passe_B">B</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_C" id="${jogadorAtual.nome}_passe_C">
                <label class="form-label" for="${jogadorAtual.nome}_passe_C">C</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_D" id="${jogadorAtual.nome}_passe_D">
                <label class="form-label" for="${jogadorAtual.nome}_passe_D">D</label>
            </div>`
        }
        if (Object.values(jogadorAtual).includes(timeSelecionado.libero)) {
            document.getElementById("libero").innerHTML += `<span>Líbero: ${jogadorAtual.numero_camisa} ${jogadorAtual.nome}</span>
            <div class="passes">
            <span>Passe: </span>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_A" id="${jogadorAtual.nome}_passe_A">
                <label class="form-label" for="${jogadorAtual.nome}_passe_A">A</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_B" id="${jogadorAtual.nome}_passe_B">
                <label class="form-label" for="${jogadorAtual.nome}_passe_B">B</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_C" id="${jogadorAtual.nome}_passe_C">
                <label class="form-label" for="${jogadorAtual.nome}_passe_C">C</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_D" id="${jogadorAtual.nome}_passe_D">
                <label class="form-label" for="${jogadorAtual.nome}_passe_D">D</label>
            </div>`
        }
        if (jogadorAtual.nome === timeSelecionado.outros_jogadores.substituicao1) {
            document.getElementById("jogadores_extras").innerHTML += `<span>${jogadorAtual.posicao}: ${jogadorAtual.numero_camisa} ${jogadorAtual.nome}</span>
            <div class="passes">
            <span>Passe: </span>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_A" id="${jogadorAtual.nome}_passe_A">
                <label class="form-label" for="${jogadorAtual.nome}_passe_A">A</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_B" id="${jogadorAtual.nome}_passe_B">
                <label class="form-label" for="${jogadorAtual.nome}_passe_B">B</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_C" id="${jogadorAtual.nome}_passe_C">
                <label class="form-label" for="${jogadorAtual.nome}_passe_C">C</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_D" id="${jogadorAtual.nome}_passe_D">
                <label class="form-label" for="${jogadorAtual.nome}_passe_D">D</label>
            </div>`
        }
        if (jogadorAtual.nome === timeSelecionado.outros_jogadores.substituicao2) {
            document.getElementById("jogadores_extras").innerHTML += `<span>${jogadorAtual.posicao}: ${jogadorAtual.numero_camisa} ${jogadorAtual.nome}</span>
            <div class="passes">
            <span>Passe: </span>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_A" id="${jogadorAtual.nome}_passe_A">
                <label class="form-label" for="${jogadorAtual.nome}_passe_A">A</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_B" id="${jogadorAtual.nome}_passe_B">
                <label class="form-label" for="${jogadorAtual.nome}_passe_B">B</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_C" id="${jogadorAtual.nome}_passe_C">
                <label class="form-label" for="${jogadorAtual.nome}_passe_C">C</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_D" id="${jogadorAtual.nome}_passe_D">
                <label class="form-label" for="${jogadorAtual.nome}_passe_D">D</label>
            </div>`
        }
        if (jogadorAtual.nome === timeSelecionado.outros_jogadores.substituicao3) {
            document.getElementById("jogadores_extras").innerHTML += `<span>${jogadorAtual.posicao}: ${jogadorAtual.numero_camisa} ${jogadorAtual.nome}</span>
            <div class="passes">
            <span>Passe: </span>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_A" id="${jogadorAtual.nome}_passe_A">
                <label class="form-label" for="${jogadorAtual.nome}_passe_A">A</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_B" id="${jogadorAtual.nome}_passe_B">
                <label class="form-label" for="${jogadorAtual.nome}_passe_B">B</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_C" id="${jogadorAtual.nome}_passe_C">
                <label class="form-label" for="${jogadorAtual.nome}_passe_C">C</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_D" id="${jogadorAtual.nome}_passe_D">
                <label class="form-label" for="${jogadorAtual.nome}_passe_D">D</label>
            </div>`
        }
        if (jogadorAtual.nome === timeSelecionado.outros_jogadores.substituicao4) {
            document.getElementById("jogadores_extras").innerHTML += `<span>${jogadorAtual.posicao}: ${jogadorAtual.numero_camisa} ${jogadorAtual.nome}</span>
            <div class="passes">
            <span>Passe: </span>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_A" id="${jogadorAtual.nome}_passe_A">
                <label class="form-label" for="${jogadorAtual.nome}_passe_A">A</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_B" id="${jogadorAtual.nome}_passe_B">
                <label class="form-label" for="${jogadorAtual.nome}_passe_B">B</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_C" id="${jogadorAtual.nome}_passe_C">
                <label class="form-label" for="${jogadorAtual.nome}_passe_C">C</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_D" id="${jogadorAtual.nome}_passe_D">
                <label class="form-label" for="${jogadorAtual.nome}_passe_D">D</label>
            </div>`
        }
        if (jogadorAtual.nome === timeSelecionado.outros_jogadores.substituicao5) {
            document.getElementById("jogadores_extras").innerHTML += `<span>${jogadorAtual.posicao}: ${jogadorAtual.numero_camisa} ${jogadorAtual.nome}</span>
            <div class="passes">
            <span>Passe: </span>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_A" id="${jogadorAtual.nome}_passe_A">
                <label class="form-label" for="${jogadorAtual.nome}_passe_A">A</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_B" id="${jogadorAtual.nome}_passe_B">
                <label class="form-label" for="${jogadorAtual.nome}_passe_B">B</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_C" id="${jogadorAtual.nome}_passe_C">
                <label class="form-label" for="${jogadorAtual.nome}_passe_C">C</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_D" id="${jogadorAtual.nome}_passe_D">
                <label class="form-label" for="${jogadorAtual.nome}_passe_D">D</label>
            </div>`
        }
        if (jogadorAtual.nome === timeSelecionado.outros_jogadores.substituicao6) {
            document.getElementById("jogadores_extras").innerHTML += `<span>${jogadorAtual.posicao}: ${jogadorAtual.numero_camisa} ${jogadorAtual.nome}</span>
            <div class="passes">
            <span>Passe: </span>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_A" id="${jogadorAtual.nome}_passe_A">
                <label class="form-label" for="${jogadorAtual.nome}_passe_A">A</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_B" id="${jogadorAtual.nome}_passe_B">
                <label class="form-label" for="${jogadorAtual.nome}_passe_B">B</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_C" id="${jogadorAtual.nome}_passe_C">
                <label class="form-label" for="${jogadorAtual.nome}_passe_C">C</label>
                <input class="form-control input_number" type="number" min="0" value="0" name="${jogadorAtual.nome}_passe_D" id="${jogadorAtual.nome}_passe_D">
                <label class="form-label" for="${jogadorAtual.nome}_passe_D">D</label>
            </div>`
        }
    }
})
// popular select jogador saque
onValue(jogadorInDB, function (snapshot) {
    selecionarJogador.innerHTML = "";
    let jogadoresArray = Object.values(snapshot.val())
    for (let i = 0; i < jogadoresArray.length; i++) {
        let jogadorAtual = jogadoresArray[i]
        if (Object.values(jogadorAtual).includes(timeSelecionado.levantador) || Object.values(jogadorAtual).includes(timeSelecionado.oposto) || Object.values(jogadorAtual).includes(timeSelecionado.central) || Object.values(jogadorAtual).includes(timeSelecionado.ponteiro_passador1) || Object.values(jogadorAtual).includes(timeSelecionado.ponteiro_passador2) || Object.values(jogadorAtual).includes(timeSelecionado.libero)) {
            selecionarJogador.innerHTML += `<option value="${jogadorAtual.nome}">${jogadorAtual.posicao}: ${jogadorAtual.nome} ${jogadorAtual.numero_camisa}</option>`
        }
    }
})
// Popular novo Jogador
onValue(jogadorInDB, function (snapshot) {
    let jogadoresArray = Object.values(snapshot.val())
    for (let j = 0; j < jogadoresArray.length; j++) {
        let jogadorAtual = jogadoresArray[j]
        novoJogadorSelecionar.innerHTML += `<option value="${jogadorAtual.nome}">${jogadorAtual.nome}</option>`
    }
})
// Salvar novo jogador
salvarOutroJogador.addEventListener("click", function () {
    if (timeSelecionado.outros_jogadores.substituicao1 === "") {
        NovoJogador(idTime, novoJogadorSelecionar.value, "", "", "", "", "")
    }
    else if (timeSelecionado.outros_jogadores.substituicao2 === "") {
        NovoJogador(idTime, timeSelecionado.outros_jogadores.substituicao1, novoJogadorSelecionar.value, "", "", "", "")
    }
    else if (timeSelecionado.outros_jogadores.substituicao3 === "") {
        NovoJogador(idTime, timeSelecionado.outros_jogadores.substituicao1, timeSelecionado.outros_jogadores.substituicao2, novoJogadorSelecionar.value, "", "", "")
    }
    else if (timeSelecionado.outros_jogadores.substituicao4 === "") {
        NovoJogador(idTime, timeSelecionado.outros_jogadores.substituicao1, timeSelecionado.outros_jogadores.substituicao2, timeSelecionado.outros_jogadores.substituicao3, novoJogadorSelecionar.value, "", "")
    }
    else if (timeSelecionado.outros_jogadores.substituicao5 === "") {
        NovoJogador(idTime, timeSelecionado.outros_jogadores.substituicao1, timeSelecionado.outros_jogadores.substituicao2, timeSelecionado.outros_jogadores.substituicao3, timeSelecionado.outros_jogadores.substituicao4, novoJogadorSelecionar.value, "")
    }
    else if (timeSelecionado.outros_jogadores.substituicao6 === "") {
        NovoJogador(idTime, timeSelecionado.outros_jogadores.substituicao1, timeSelecionado.outros_jogadores.substituicao2, timeSelecionado.outros_jogadores.substituicao3, timeSelecionado.outros_jogadores.substituicao4, timeSelecionado.outros_jogadores.substituicao5, novoJogadorSelecionar.value)
    }
    alert("Novo jogador Cadastrado com Sucesso!")
})
// cadastrar saque
salvarSaque.addEventListener("click", function () {
    var idJogador = {}
    var jogadorSelecionado = {}
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
    if (document.querySelector('input[name="saque"]:checked').value === "saque_dentro" && document.querySelector('input[name="ace"]:checked').value === "nao") {
        if (tipoSaque.value === "por_baixo") {
            SaqueDentroNaoAce(idJogador,
                ++jogadorSelecionado.saque_dentro.por_baixo,
                jogadorSelecionado.saque_dentro.lateral_asiatico,
                jogadorSelecionado.saque_dentro.por_cima,
                jogadorSelecionado.saque_dentro.viagem_fundo_do_mar,
                jogadorSelecionado.saque_dentro.flutuante,
                jogadorSelecionado.saque_dentro.hibrido_misto,
                jogadorSelecionado.saque_dentro.ace.por_baixo,
                jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
                jogadorSelecionado.saque_dentro.ace.por_cima,
                jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
                jogadorSelecionado.saque_dentro.ace.flutuante,
                jogadorSelecionado.saque_dentro.ace.hibrido_misto)
        }
        if (tipoSaque.value === "lateral_asiatico") {
            SaqueDentroNaoAce(idJogador,
                jogadorSelecionado.saque_dentro.por_baixo,
                ++jogadorSelecionado.saque_dentro.lateral_asiatico,
                jogadorSelecionado.saque_dentro.por_cima,
                jogadorSelecionado.saque_dentro.viagem_fundo_do_mar,
                jogadorSelecionado.saque_dentro.flutuante,
                jogadorSelecionado.saque_dentro.hibrido_misto,
                jogadorSelecionado.saque_dentro.ace.por_baixo,
                jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
                jogadorSelecionado.saque_dentro.ace.por_cima,
                jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
                jogadorSelecionado.saque_dentro.ace.flutuante,
                jogadorSelecionado.saque_dentro.ace.hibrido_misto)
        }
        if (tipoSaque.value === "por_cima") {
            SaqueDentroNaoAce(idJogador,
                jogadorSelecionado.saque_dentro.por_baixo,
                jogadorSelecionado.saque_dentro.lateral_asiatico,
                ++jogadorSelecionado.saque_dentro.por_cima,
                jogadorSelecionado.saque_dentro.viagem_fundo_do_mar,
                jogadorSelecionado.saque_dentro.flutuante,
                jogadorSelecionado.saque_dentro.hibrido_misto,
                jogadorSelecionado.saque_dentro.ace.por_baixo,
                jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
                jogadorSelecionado.saque_dentro.ace.por_cima,
                jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
                jogadorSelecionado.saque_dentro.ace.flutuante,
                jogadorSelecionado.saque_dentro.ace.hibrido_misto)
        }
        if (tipoSaque.value === "viagem_fundo_do_mar") {
            SaqueDentroNaoAce(idJogador,
                jogadorSelecionado.saque_dentro.por_baixo,
                jogadorSelecionado.saque_dentro.lateral_asiatico,
                jogadorSelecionado.saque_dentro.por_cima,
                ++jogadorSelecionado.saque_dentro.viagem_fundo_do_mar,
                jogadorSelecionado.saque_dentro.flutuante,
                jogadorSelecionado.saque_dentro.hibrido_misto,
                jogadorSelecionado.saque_dentro.ace.por_baixo,
                jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
                jogadorSelecionado.saque_dentro.ace.por_cima,
                jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
                jogadorSelecionado.saque_dentro.ace.flutuante,
                jogadorSelecionado.saque_dentro.ace.hibrido_misto)
        }
        if (tipoSaque.value === "flutuante") {
            SaqueDentroNaoAce(idJogador,
                jogadorSelecionado.saque_dentro.por_baixo,
                jogadorSelecionado.saque_dentro.lateral_asiatico,
                jogadorSelecionado.saque_dentro.por_cima,
                jogadorSelecionado.saque_dentro.viagem_fundo_do_mar,
                ++jogadorSelecionado.saque_dentro.flutuante,
                jogadorSelecionado.saque_dentro.hibrido_misto,
                jogadorSelecionado.saque_dentro.ace.por_baixo,
                jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
                jogadorSelecionado.saque_dentro.ace.por_cima,
                jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
                jogadorSelecionado.saque_dentro.ace.flutuante,
                jogadorSelecionado.saque_dentro.ace.hibrido_misto)
        }
        if (tipoSaque.value === "hibrido_misto") {
            SaqueDentroNaoAce(idJogador,
                jogadorSelecionado.saque_dentro.por_baixo,
                jogadorSelecionado.saque_dentro.lateral_asiatico,
                jogadorSelecionado.saque_dentro.por_cima,
                jogadorSelecionado.saque_dentro.viagem_fundo_do_mar,
                jogadorSelecionado.saque_dentro.flutuante,
                ++jogadorSelecionado.saque_dentro.hibrido_misto,
                jogadorSelecionado.saque_dentro.ace.por_baixo,
                jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
                jogadorSelecionado.saque_dentro.ace.por_cima,
                jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
                jogadorSelecionado.saque_dentro.ace.flutuante,
                jogadorSelecionado.saque_dentro.ace.hibrido_misto)
        }
    }
    else if (document.querySelector('input[name="saque"]:checked').value === "saque_dentro" && document.querySelector('input[name="ace"]:checked').value === "sim") {
        if (tipoSaque.value === "por_baixo") {
            SaqueDentroACE(idJogador,
                ++jogadorSelecionado.saque_dentro.ace.por_baixo,
                jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
                jogadorSelecionado.saque_dentro.ace.por_cima,
                jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
                jogadorSelecionado.saque_dentro.ace.flutuante,
                jogadorSelecionado.saque_dentro.ace.hibrido_misto)
        }
        if (tipoSaque.value === "lateral_asiatico") {
            SaqueDentroACE(idJogador,
                jogadorSelecionado.saque_dentro.ace.por_baixo,
                ++jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
                jogadorSelecionado.saque_dentro.ace.por_cima,
                jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
                jogadorSelecionado.saque_dentro.ace.flutuante,
                jogadorSelecionado.saque_dentro.ace.hibrido_misto)
        }
        if (tipoSaque.value === "por_cima") {
            SaqueDentroACE(idJogador,
                jogadorSelecionado.saque_dentro.ace.por_baixo,
                jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
                ++jogadorSelecionado.saque_dentro.ace.por_cima,
                jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
                jogadorSelecionado.saque_dentro.ace.flutuante,
                jogadorSelecionado.saque_dentro.ace.hibrido_misto)
        }
        if (tipoSaque.value === "viagem_fundo_do_mar") {
            SaqueDentroACE(idJogador,
                jogadorSelecionado.saque_dentro.ace.por_baixo,
                jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
                jogadorSelecionado.saque_dentro.ace.por_cima,
                ++jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
                jogadorSelecionado.saque_dentro.ace.flutuante,
                jogadorSelecionado.saque_dentro.ace.hibrido_misto)
        }
        if (tipoSaque.value === "flutuante") {
            SaqueDentroACE(idJogador,
                jogadorSelecionado.saque_dentro.ace.por_baixo,
                jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
                jogadorSelecionado.saque_dentro.ace.por_cima,
                jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
                ++jogadorSelecionado.saque_dentro.ace.flutuante,
                jogadorSelecionado.saque_dentro.ace.hibrido_misto)
        }
        if (tipoSaque.value === "hibrido_misto") {
            SaqueDentroACE(idJogador,
                jogadorSelecionado.saque_dentro.ace.por_baixo,
                jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
                jogadorSelecionado.saque_dentro.ace.por_cima,
                jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
                jogadorSelecionado.saque_dentro.ace.flutuante,
                ++jogadorSelecionado.saque_dentro.ace.hibrido_misto)
        }
    }
    else if (document.querySelector('input[name="saque"]:checked').value === "saque_fora") {

        if (tipoSaque.value === "por_baixo") {
            SaqueFora(idJogador,
                ++jogadorSelecionado.saque_fora.por_baixo,
                jogadorSelecionado.saque_fora.lateral_asiatico,
                jogadorSelecionado.saque_fora.por_cima,
                jogadorSelecionado.saque_fora.viagem_fundo_do_mar,
                jogadorSelecionado.saque_fora.flutuante,
                jogadorSelecionado.saque_fora.hibrido_misto,)
        }
        if (tipoSaque.value === "lateral_asiatico") {
            SaqueFora(idJogador,
                jogadorSelecionado.saque_fora.por_baixo,
                ++jogadorSelecionado.saque_fora.lateral_asiatico,
                jogadorSelecionado.saque_fora.por_cima,
                jogadorSelecionado.saque_fora.viagem_fundo_do_mar,
                jogadorSelecionado.saque_fora.flutuante,
                jogadorSelecionado.saque_fora.hibrido_misto,)
        }
        if (tipoSaque.value === "por_cima") {
            SaqueFora(idJogador,
                jogadorSelecionado.saque_fora.por_baixo,
                jogadorSelecionado.saque_fora.lateral_asiatico,
                ++jogadorSelecionado.saque_fora.por_cima,
                jogadorSelecionado.saque_fora.viagem_fundo_do_mar,
                jogadorSelecionado.saque_fora.flutuante,
                jogadorSelecionado.saque_fora.hibrido_misto,)
        }
        if (tipoSaque.value === "viagem_fundo_do_mar") {
            SaqueFora(idJogador,
                jogadorSelecionado.saque_fora.por_baixo,
                jogadorSelecionado.saque_fora.lateral_asiatico,
                jogadorSelecionado.saque_fora.por_cima,
                ++jogadorSelecionado.saque_fora.viagem_fundo_do_mar,
                jogadorSelecionado.saque_fora.flutuante,
                jogadorSelecionado.saque_fora.hibrido_misto,)
        }
        if (tipoSaque.value === "flutuante") {
            SaqueFora(idJogador,
                jogadorSelecionado.saque_fora.por_baixo,
                jogadorSelecionado.saque_fora.lateral_asiatico,
                jogadorSelecionado.saque_fora.por_cima,
                jogadorSelecionado.saque_fora.viagem_fundo_do_mar,
                ++jogadorSelecionado.saque_fora.flutuante,
                jogadorSelecionado.saque_fora.hibrido_misto,)
        }
        if (tipoSaque.value === "hibrido_misto") {
            SaqueFora(idJogador,
                jogadorSelecionado.saque_fora.por_baixo,
                jogadorSelecionado.saque_fora.lateral_asiatico,
                jogadorSelecionado.saque_fora.por_cima,
                jogadorSelecionado.saque_fora.viagem_fundo_do_mar,
                jogadorSelecionado.saque_fora.flutuante,
                ++jogadorSelecionado.saque_fora.hibrido_misto,)
        }
    }
    alert("Saque Salvo")
})
salvarPasse.addEventListener("click", function () {
    var idJogador = ""
    var jogadorSelecionado = {}
    onValue(jogadorInDB, function (snapshot) {
        let jogadoresArray = Object.entries(snapshot.val())
        for (let i = 0; i < jogadoresArray.length; i++) {
            let jogadorAtual = jogadoresArray[i]
            if (jogadorAtual[1].nome == timeSelecionado.levantador || jogadorAtual[1].nome == timeSelecionado.oposto || jogadorAtual[1].nome == timeSelecionado.central || jogadorAtual[1].nome == timeSelecionado.ponteiro_passador1 || jogadorAtual[1].nome == timeSelecionado.ponteiro_passador2 || jogadorAtual[1].nome == timeSelecionado.libero || jogadorAtual[1].nome == timeSelecionado.outros_jogadores.substituicao1 || jogadorAtual[1].nome == timeSelecionado.outros_jogadores.substituicao2 || jogadorAtual[1].nome == timeSelecionado.outros_jogadores.substituicao3 || jogadorAtual[1].nome == timeSelecionado.outros_jogadores.substituicao4 || jogadorAtual[1].nome == timeSelecionado.outros_jogadores.substituicao5 || jogadorAtual[1].nome == timeSelecionado.outros_jogadores.substituicao6) {
                idJogador = jogadorAtual[0]
                jogadorSelecionado = jogadorAtual[1]
                TipoPasse(idJogador, Number(document.querySelector(`input[name="${jogadorSelecionado.nome}_passe_A"]`).value) + jogadorSelecionado.passe.passe_A, Number(document.querySelector(`input[name="${jogadorSelecionado.nome}_passe_B"]`).value) + jogadorSelecionado.passe.passe_B, Number(document.querySelector(`input[name="${jogadorSelecionado.nome}_passe_C"]`).value) + jogadorSelecionado.passe.passe_C, Number(document.querySelector(`input[name="${jogadorSelecionado.nome}_passe_D"]`).value) + jogadorSelecionado.passe.passe_D)
            }
        }
    })
    alert("Passe Salvo")
})
// Funções importantes
function SaqueDentroNaoAce(idJogador, por_baixo, lateral_asiatico, por_cima, viagem_fundo_do_mar, flutuante, hibrido_misto, ace_por_baixo, ace_lateral_asiatico, ace_por_cima, ace_viagem_fundo_do_mar, ace_flutuante, ace_hibrido_misto) {
    const db = getDatabase();
    // A post entry.
    const postData = {
        por_baixo: por_baixo,
        lateral_asiatico: lateral_asiatico,
        por_cima: por_cima,
        viagem_fundo_do_mar: viagem_fundo_do_mar,
        flutuante: flutuante,
        hibrido_misto: hibrido_misto,
        ace: {
            por_baixo: ace_por_baixo,
            lateral_asiatico: ace_lateral_asiatico,
            por_cima: ace_por_cima,
            viagem_fundo_do_mar: ace_viagem_fundo_do_mar,
            flutuante: ace_flutuante,
            hibrido_misto: ace_hibrido_misto
        }
    };
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/jogador/' + idJogador + '/saque_dentro'] = postData;
    return update(ref(db), updates);
}
function SaqueFora(idJogador, por_baixo, lateral_asiatico, por_cima, viagem_fundo_do_mar, flutuante, hibrido_misto) {
    const db = getDatabase();
    // A post entry.
    const postData = {
        por_baixo: por_baixo,
        lateral_asiatico: lateral_asiatico,
        por_cima: por_cima,
        viagem_fundo_do_mar: viagem_fundo_do_mar,
        flutuante: flutuante,
        hibrido_misto: hibrido_misto
    };
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/jogador/' + idJogador + '/saque_fora'] = postData;
    return update(ref(db), updates);
}
function SaqueDentroACE(idJogador, por_baixo, lateral_asiatico, por_cima, viagem_fundo_do_mar, flutuante, hibrido_misto) {
    const db = getDatabase();
    // A post entry.
    const postData = {
        por_baixo: por_baixo,
        lateral_asiatico: lateral_asiatico,
        por_cima: por_cima,
        viagem_fundo_do_mar: viagem_fundo_do_mar,
        flutuante: flutuante,
        hibrido_misto: hibrido_misto,
    };
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/jogador/' + idJogador + '/saque_dentro/ace'] = postData;
    return update(ref(db), updates);
}
function TipoPasse(idJogador, passeA, passeB, passeC, passeD) {
    const db = getDatabase();
    // A post entry.
    const postData = {
        passe_A: passeA,
        passe_B: passeB,
        passe_C: passeC,
        passe_D: passeD
    };
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/jogador/' + idJogador + '/passe'] = postData;
    return update(ref(db), updates);
}
function NovoJogador(idTime, novo_jogador1, novo_jogador2, novo_jogador3, novo_jogador4, novo_jogador5, novo_jogador6) {
    const db = getDatabase();
    // A post entry.
    const postData = {
        substituicao1: novo_jogador1,
        substituicao2: novo_jogador2,
        substituicao3: novo_jogador3,
        substituicao4: novo_jogador4,
        substituicao5: novo_jogador5,
        substituicao6: novo_jogador6,
    };
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/time/' + idTime + '/outros_jogadores'] = postData;
    return update(ref(db), updates);
}