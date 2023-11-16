// Conexão com o banco de dados
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
const appSettings = {
    databaseURL: "https://voleibri-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const jogadorInDB = ref(database, "jogador")
// transformando os campos em variáveis
const selecionarJogador = document.getElementById("nome")
const salvar = document.getElementById("salvar")
const tipoSaque = document.getElementById("tipo_saque")
// Ações Botões
onValue(jogadorInDB, function (snapshot) {
    let jogadoresArray = Object.values(snapshot.val())
    for (let i = 0; i < jogadoresArray.length; i++) {
        let jogadorAtual = jogadoresArray[i]
        selecionarJogador.innerHTML += `<option value="${jogadorAtual.nome}">${jogadorAtual.nome}</option>`
    }
})
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
                console.log(jogadorSelecionado)
            }
        }
    })
    if (document.querySelector('input[name="saque"]:checked').value === "saque_dentro" && document.querySelector('input[name="ace"]:checked').value === "nao") {
        if (tipoSaque.value === "por_baixo") {
            SaqueDentroNaoACE(idJogador, ++jogadorSelecionado.saque_dentro.por_baixo, jogadorSelecionado.saque_dentro.lateral_asiatico, jogadorSelecionado.saque_dentro.por_cima, jogadorSelecionado.saque_dentro.viagem_fundo_do_mar, jogadorSelecionado.saque_dentro.flutuante, jogadorSelecionado.saque_dentro.hibrido_misto, jogadorSelecionado.saque_dentro.ace.por_baixo, jogadorSelecionado.saque_dentro.ace.lateral_asiatico, jogadorSelecionado.saque_dentro.ace.por_cima, jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar, jogadorSelecionado.saque_dentro.ace.flutuante, jogadorSelecionado.saque_dentro.ace.hibrido_misto)
        }
        // let valorAInserir = "/jogador/-NjNG_owPDJ3arThsV4k/saque_dentro/por_baixo/" + (jogadorSelecionado.saque_dentro.por_cima++)
        // update(ref(database), valorAInserir)
    }
    else if (document.querySelector('input[name="saque"]:checked').value === "saque_dentro" && document.querySelector('input[name="ace"]:checked').value === "sim") {
        // var valorAInserir = {}
        // valorAtual = idJogador.saque_dentro.ace.por_baixo
        // console.log(valorAtual)
        // let tipoSaqueSelecionado = tipoSaque.value
        // valorAInserir[`/jogador/${idJogador}/${document.querySelector('input[name="saque"]:checked').value}/ace/`] = {
        //     por_baixo: NovoValor(idJogador.saque_dentro.ace.por_baixo.value),
        //     lateral_asiatico: 0,
        //     por_cima: 0,
        //     viagem_fundo_do_mar: 0,
        //     flutuante: 0,
        //     hibrido_misto: 0
        // }
        // let localizacaoParaApagar = ref(database, `jogador/${idJogador}/${document.querySelector('input[name="saque"]:checked').value}/ace/${tipoSaque.value}/${jogadorSelecionado.saque_dentro.ace[tipoSaque.value]}`)
        // let localizacaoParaInserir = ref(database, `jogador/${idJogador}/${document.querySelector('input[name="saque"]:checked').value}/ace/`)
        // remove(localizacaoParaApagar)
        // update(ref(database), valorAInserir)
        // push(localizacaoParaInserir, valorAInserir)
    }
    else if (document.querySelector('input[name="saque"]:checked').value === "saque_fora") {

    }
})
function NovoValor(valorAtual) {
    return valorAtual += 1
}
function SaqueDentroNaoACE(idJogador, por_baixo, lateral_asiatico, por_cima, viagem_fundo_do_mar, flutuante, hibrido_misto, ace_por_baixo, ace_lateral_asiatico, ace_por_cima, ace_viagem_fundo_do_mar, ace_flutuante, ace_hibrido_misto) {
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