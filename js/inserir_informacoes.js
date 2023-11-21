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
const selecionarJogador = document.getElementById("nome")
const selecionarTime = document.getElementById("time")
const salvar = document.getElementById("salvar")
const tipoSaque = document.getElementById("tipo_saque")
// Ações Botões
// popular select times
onValue(timeInDB, function (snapshot) {
    selecionarTime.innerHTML = "";
    let timesArray = Object.values(snapshot.val())
    for (let i = 0; i < timesArray.length; i++) {
        let timeAtual = timesArray[i]
        selecionarTime.innerHTML += `<option value="${timeAtual.nome}">${timeAtual.nome}</option>`
    }
})
// popular select jogador
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
// cadastrar saque
salvar.addEventListener("click", function () {
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
    location.reload(true);
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