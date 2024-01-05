// Conexão com o banco de dados
import { jogadorInDB, timeInDB } from "./acesso_banco.js"; import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
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
const colocarJogadoresDoTime = document.getElementById("jogadores_no_time")
// iniciando a constante do time
let timeSelecionado
onValue(timeInDB, function (snapshot) {
    let timesArray = Object.entries(snapshot.val())
    for (let i = 0; i < timesArray.length; i++) {
        let timeAtual = timesArray[i]
        if (timeAtual[0] === localStorage.getItem("timeAtual")) {
            timeSelecionado = timeAtual[1];
            timeExportado.innerHTML = `Time: ${timeSelecionado.nome}`
            timeSexo.innerHTML = `${timeSelecionado.sexo === "M" ? "Sexo: Masculino" : "Sexo: Feminino"}`
            localStorage.setItem("jogadores", timeSelecionado.jogadores)
        }
    }
})
let jogadoresNoTimeArray = localStorage.getItem("jogadores").split(",")
// Colocar os jogadores
onValue(jogadorInDB, function (snapshot) {
    let jogadoresArray = Object.entries(snapshot.val())
    for (let i = 0; i < jogadoresArray.length; i++) {
        let jogadorAtual = jogadoresArray[i]
        if (jogadoresNoTimeArray.includes(jogadorAtual[0])) {
            let divJogador = document.createElement("div")
            divJogador.id = jogadorAtual[0]
            let spanInformacoesJogador = document.createElement("span")
            spanInformacoesJogador.innerHTML = `${jogadorAtual[1].posicao}: ${jogadorAtual[1].numero_camisa} ${jogadorAtual[1].nome}`
            divJogador.appendChild(spanInformacoesJogador)
            let divPasses = document.createElement("div")
            divPasses.className = "passes"
            divPasses.innerHTML += `<span>Passe: </span>`
            divPasses.innerHTML += CriarInputsPasses(jogadorAtual[0], "A")
            divPasses.innerHTML += CriarInputsPasses(jogadorAtual[0], "B")
            divPasses.innerHTML += CriarInputsPasses(jogadorAtual[0], "C")
            divPasses.innerHTML += CriarInputsPasses(jogadorAtual[0], "D")
            divJogador.appendChild(divPasses)
            colocarJogadoresDoTime.appendChild(divJogador)
            document.getElementById(`${jogadorAtual[0]}_passe_A`).value = 0
            document.getElementById(`${jogadorAtual[0]}_passe_B`).value = 0
            document.getElementById(`${jogadorAtual[0]}_passe_C`).value = 0
            document.getElementById(`${jogadorAtual[0]}_passe_D`).value = 0
            document.getElementById(`${jogadorAtual[0]}_label_A`).addEventListener("click", () => { document.getElementById(`${jogadorAtual[0]}_passe_A`).value++ })
            document.getElementById(`${jogadorAtual[0]}_label_B`).addEventListener("click", () => { document.getElementById(`${jogadorAtual[0]}_passe_B`).value++ })
            document.getElementById(`${jogadorAtual[0]}_label_C`).addEventListener("click", () => { document.getElementById(`${jogadorAtual[0]}_passe_C`).value++ })
            document.getElementById(`${jogadorAtual[0]}_label_D`).addEventListener("click", () => { document.getElementById(`${jogadorAtual[0]}_passe_D`).value++ })
        }
    }
})
// popular select jogador saque
onValue(jogadorInDB, function (snapshot) {
    let jogadoresArray = Object.entries(snapshot.val())
    for (let i = 0; i == jogadoresArray.length; i++) {
        let jogadorAtual = jogadoresArray[i]
        if (jogadoresNoTimeArray.includes(jogadorAtual[0])) {
            selecionarJogador.innerHTML += `<option value="${jogadorAtual[1].nome}">${jogadorAtual[1].posicao}: ${jogadorAtual[1].nome} ${jogadorAtual[1].numero_camisa}</option>`
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
function CriarInputsPasses(idJogador, tipoPasse) {
    let elemento = `<input class="form-control input_number" type="number" min="0" name="${idJogador}_passe_${tipoPasse}" id="${idJogador}_passe_${tipoPasse}" readonly><label class="form-label" for="${idJogador}_passe_${tipoPasse}" id="${idJogador}_label_${tipoPasse}">${tipoPasse}+</label>`
    return elemento
}