// importações necessárias
import { Auth } from "./auth_class.js";
import { Time } from "./time_class.js";
import { Jogador } from "./jogador_class.js";
// Elementos htmls
const buttons = {
    logoutButton: () => document.getElementById('logout'),
    salvarSaque: () => document.getElementById("salvar_saque"),
    salvarPasse: () => document.getElementById("salvar_passe"),
    salvarAtaque: () => document.getElementById("salvar_ataque"),
    salvarLevantamento: () => document.getElementById("salvar_levantamento"),
    salvarOutroJogador: () => document.getElementById("adicionar_jogador_button")
}
const form = {
    tipoSaque: () => document.getElementById("tipo_saque"),
    selecionarJogador: () => document.getElementById("nome"),
    novoJogadorSelecionar: () => document.getElementById("novo_jogador"),
    colocarJogadoresDoTime: () => document.getElementById("jogadores_no_time")
}
const informacoes = {
    timeExportado: () => document.getElementById("time_exportado"),
    timeSexo: () => document.getElementById("sexo_time")
}
// Gerencia de atenticação
let auth = new Auth;
auth.UsuarioNaoLogado();
buttons.logoutButton().addEventListener('click', () => {
    auth.Logout();
})
// Populando o cabeçalho
let time = new Time
let jogador = new Jogador
time.PopularCabecalhoInserirInformacoes(informacoes.timeExportado(), informacoes.timeSexo());
jogador.PopularNovosJogadores(form.novoJogadorSelecionar());
// eventos
buttons.salvarOutroJogador().addEventListener('click', () => {
    var textoSelecionado = form.novoJogadorSelecionar().options[form.novoJogadorSelecionar().selectedIndex].text;
    var arrayTexto = textoSelecionado.split(" ");
    time.InserirJogador(arrayTexto[1], form.novoJogadorSelecionar().value);
})
// let jogadoresIDNoTimeArray = localStorage.getItem("jogadores").split(",")
// let jogador1 = new Jogador(jogadoresIDNoTimeArray[0])
// jogador1.DefinirAtibutos();
// let jogadoresNoTimeObjects = []
// for (let o = 0; o < jogadoresIDNoTimeArray.length; o++) {
//     jogadoresNoTimeObjects.push(new Jogador(jogadoresIDNoTimeArray[o]))
//     jogadoresNoTimeObjects[o].DefinirAtibutos()
// }
// Colocar os jogadores
// onValue(jogadorInDB, function (snapshot) {
//     let jogadoresArray = Object.entries(snapshot.val())
//     for (let i = 0; i < jogadoresArray.length; i++) {
//         }
//     }
// // })
// console.log(jogadoresNoTimeObjects)
// // Popular novo Jogador e Select
// onValue(jogadorInDB, function (snapshot) {
//     let jogadoresArray = Object.entries(snapshot.val())
//     for (let j = 0; j < jogadoresArray.length; j++) {
//         let jogadorAtual = jogadoresArray[j]
//         if (!jogadoresIDNoTimeArray.includes(jogadorAtual[0])) {
//             novoJogadorSelecionar.innerHTML += `<option value="${jogadorAtual[0]}">${jogadorAtual[1].numero_camisa} ${jogadorAtual[1].nome}</option>`
//         } else {
//             selecionarJogador.innerHTML += `<option value="${jogadorAtual[0]}">${jogadorAtual[1].numero_camisa} ${jogadorAtual[1].nome}</option>`

//         }
//     }
// })
// Salvar novo jogador
// salvarOutroJogador.addEventListener("click", function () {
//     NovoJogador(idTimeSelecionado, timeSelecionado.jogadores, novoJogadorSelecionar.value, timeSelecionado.nome, timeSelecionado.sexo)
//     alert("Novo jogador Cadastrado com Sucesso!")
// })
// // cadastrar saque
// salvarSaque.addEventListener("click", function () {
//     var idJogador = {}
//     var jogadorSelecionado = {}
//     onValue(jogadorInDB, function (snapshot) {
//         let jogadoresArray = Object.entries(snapshot.val())
//         for (let i = 0; i < jogadoresArray.length; i++) {
//             let jogadorAtual = jogadoresArray[i]
//             if (jogadorAtual[0] === selecionarJogador.value) {
//                 idJogador = jogadorAtual[0]
//                 jogadorSelecionado = jogadorAtual[1]
//             }
//         }
//     })
//     if (document.querySelector('input[name="saque"]:checked').value === "saque_dentro" && document.querySelector('input[name="ace"]:checked').value === "nao") {
//         if (tipoSaque.value === "por_baixo") {
//             SaqueDentroNaoAce(idJogador,
//                 ++jogadorSelecionado.saque_dentro.por_baixo,
//                 jogadorSelecionado.saque_dentro.lateral_asiatico,
//                 jogadorSelecionado.saque_dentro.por_cima,
//                 jogadorSelecionado.saque_dentro.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_dentro.flutuante,
//                 jogadorSelecionado.saque_dentro.hibrido_misto,
//                 jogadorSelecionado.saque_dentro.ace.por_baixo,
//                 jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
//                 jogadorSelecionado.saque_dentro.ace.por_cima,
//                 jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_dentro.ace.flutuante,
//                 jogadorSelecionado.saque_dentro.ace.hibrido_misto)
//         }
//         if (tipoSaque.value === "lateral_asiatico") {
//             SaqueDentroNaoAce(idJogador,
//                 jogadorSelecionado.saque_dentro.por_baixo,
//                 ++jogadorSelecionado.saque_dentro.lateral_asiatico,
//                 jogadorSelecionado.saque_dentro.por_cima,
//                 jogadorSelecionado.saque_dentro.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_dentro.flutuante,
//                 jogadorSelecionado.saque_dentro.hibrido_misto,
//                 jogadorSelecionado.saque_dentro.ace.por_baixo,
//                 jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
//                 jogadorSelecionado.saque_dentro.ace.por_cima,
//                 jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_dentro.ace.flutuante,
//                 jogadorSelecionado.saque_dentro.ace.hibrido_misto)
//         }
//         if (tipoSaque.value === "por_cima") {
//             SaqueDentroNaoAce(idJogador,
//                 jogadorSelecionado.saque_dentro.por_baixo,
//                 jogadorSelecionado.saque_dentro.lateral_asiatico,
//                 ++jogadorSelecionado.saque_dentro.por_cima,
//                 jogadorSelecionado.saque_dentro.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_dentro.flutuante,
//                 jogadorSelecionado.saque_dentro.hibrido_misto,
//                 jogadorSelecionado.saque_dentro.ace.por_baixo,
//                 jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
//                 jogadorSelecionado.saque_dentro.ace.por_cima,
//                 jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_dentro.ace.flutuante,
//                 jogadorSelecionado.saque_dentro.ace.hibrido_misto)
//         }
//         if (tipoSaque.value === "viagem_fundo_do_mar") {
//             SaqueDentroNaoAce(idJogador,
//                 jogadorSelecionado.saque_dentro.por_baixo,
//                 jogadorSelecionado.saque_dentro.lateral_asiatico,
//                 jogadorSelecionado.saque_dentro.por_cima,
//                 ++jogadorSelecionado.saque_dentro.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_dentro.flutuante,
//                 jogadorSelecionado.saque_dentro.hibrido_misto,
//                 jogadorSelecionado.saque_dentro.ace.por_baixo,
//                 jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
//                 jogadorSelecionado.saque_dentro.ace.por_cima,
//                 jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_dentro.ace.flutuante,
//                 jogadorSelecionado.saque_dentro.ace.hibrido_misto)
//         }
//         if (tipoSaque.value === "flutuante") {
//             SaqueDentroNaoAce(idJogador,
//                 jogadorSelecionado.saque_dentro.por_baixo,
//                 jogadorSelecionado.saque_dentro.lateral_asiatico,
//                 jogadorSelecionado.saque_dentro.por_cima,
//                 jogadorSelecionado.saque_dentro.viagem_fundo_do_mar,
//                 ++jogadorSelecionado.saque_dentro.flutuante,
//                 jogadorSelecionado.saque_dentro.hibrido_misto,
//                 jogadorSelecionado.saque_dentro.ace.por_baixo,
//                 jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
//                 jogadorSelecionado.saque_dentro.ace.por_cima,
//                 jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_dentro.ace.flutuante,
//                 jogadorSelecionado.saque_dentro.ace.hibrido_misto)
//         }
//         if (tipoSaque.value === "hibrido_misto") {
//             SaqueDentroNaoAce(idJogador,
//                 jogadorSelecionado.saque_dentro.por_baixo,
//                 jogadorSelecionado.saque_dentro.lateral_asiatico,
//                 jogadorSelecionado.saque_dentro.por_cima,
//                 jogadorSelecionado.saque_dentro.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_dentro.flutuante,
//                 ++jogadorSelecionado.saque_dentro.hibrido_misto,
//                 jogadorSelecionado.saque_dentro.ace.por_baixo,
//                 jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
//                 jogadorSelecionado.saque_dentro.ace.por_cima,
//                 jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_dentro.ace.flutuante,
//                 jogadorSelecionado.saque_dentro.ace.hibrido_misto)
//         }
//     }
//     else if (document.querySelector('input[name="saque"]:checked').value === "saque_dentro" && document.querySelector('input[name="ace"]:checked').value === "sim") {
//         if (tipoSaque.value === "por_baixo") {
//             SaqueDentroACE(idJogador,
//                 ++jogadorSelecionado.saque_dentro.ace.por_baixo,
//                 jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
//                 jogadorSelecionado.saque_dentro.ace.por_cima,
//                 jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_dentro.ace.flutuante,
//                 jogadorSelecionado.saque_dentro.ace.hibrido_misto)
//         }
//         if (tipoSaque.value === "lateral_asiatico") {
//             SaqueDentroACE(idJogador,
//                 jogadorSelecionado.saque_dentro.ace.por_baixo,
//                 ++jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
//                 jogadorSelecionado.saque_dentro.ace.por_cima,
//                 jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_dentro.ace.flutuante,
//                 jogadorSelecionado.saque_dentro.ace.hibrido_misto)
//         }
//         if (tipoSaque.value === "por_cima") {
//             SaqueDentroACE(idJogador,
//                 jogadorSelecionado.saque_dentro.ace.por_baixo,
//                 jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
//                 ++jogadorSelecionado.saque_dentro.ace.por_cima,
//                 jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_dentro.ace.flutuante,
//                 jogadorSelecionado.saque_dentro.ace.hibrido_misto)
//         }
//         if (tipoSaque.value === "viagem_fundo_do_mar") {
//             SaqueDentroACE(idJogador,
//                 jogadorSelecionado.saque_dentro.ace.por_baixo,
//                 jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
//                 jogadorSelecionado.saque_dentro.ace.por_cima,
//                 ++jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_dentro.ace.flutuante,
//                 jogadorSelecionado.saque_dentro.ace.hibrido_misto)
//         }
//         if (tipoSaque.value === "flutuante") {
//             SaqueDentroACE(idJogador,
//                 jogadorSelecionado.saque_dentro.ace.por_baixo,
//                 jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
//                 jogadorSelecionado.saque_dentro.ace.por_cima,
//                 jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
//                 ++jogadorSelecionado.saque_dentro.ace.flutuante,
//                 jogadorSelecionado.saque_dentro.ace.hibrido_misto)
//         }
//         if (tipoSaque.value === "hibrido_misto") {
//             SaqueDentroACE(idJogador,
//                 jogadorSelecionado.saque_dentro.ace.por_baixo,
//                 jogadorSelecionado.saque_dentro.ace.lateral_asiatico,
//                 jogadorSelecionado.saque_dentro.ace.por_cima,
//                 jogadorSelecionado.saque_dentro.ace.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_dentro.ace.flutuante,
//                 ++jogadorSelecionado.saque_dentro.ace.hibrido_misto)
//         }
//     }
//     else if (document.querySelector('input[name="saque"]:checked').value === "saque_fora") {

//         if (tipoSaque.value === "por_baixo") {
//             SaqueFora(idJogador,
//                 ++jogadorSelecionado.saque_fora.por_baixo,
//                 jogadorSelecionado.saque_fora.lateral_asiatico,
//                 jogadorSelecionado.saque_fora.por_cima,
//                 jogadorSelecionado.saque_fora.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_fora.flutuante,
//                 jogadorSelecionado.saque_fora.hibrido_misto,)
//         }
//         if (tipoSaque.value === "lateral_asiatico") {
//             SaqueFora(idJogador,
//                 jogadorSelecionado.saque_fora.por_baixo,
//                 ++jogadorSelecionado.saque_fora.lateral_asiatico,
//                 jogadorSelecionado.saque_fora.por_cima,
//                 jogadorSelecionado.saque_fora.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_fora.flutuante,
//                 jogadorSelecionado.saque_fora.hibrido_misto,)
//         }
//         if (tipoSaque.value === "por_cima") {
//             SaqueFora(idJogador,
//                 jogadorSelecionado.saque_fora.por_baixo,
//                 jogadorSelecionado.saque_fora.lateral_asiatico,
//                 ++jogadorSelecionado.saque_fora.por_cima,
//                 jogadorSelecionado.saque_fora.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_fora.flutuante,
//                 jogadorSelecionado.saque_fora.hibrido_misto,)
//         }
//         if (tipoSaque.value === "viagem_fundo_do_mar") {
//             SaqueFora(idJogador,
//                 jogadorSelecionado.saque_fora.por_baixo,
//                 jogadorSelecionado.saque_fora.lateral_asiatico,
//                 jogadorSelecionado.saque_fora.por_cima,
//                 ++jogadorSelecionado.saque_fora.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_fora.flutuante,
//                 jogadorSelecionado.saque_fora.hibrido_misto,)
//         }
//         if (tipoSaque.value === "flutuante") {
//             SaqueFora(idJogador,
//                 jogadorSelecionado.saque_fora.por_baixo,
//                 jogadorSelecionado.saque_fora.lateral_asiatico,
//                 jogadorSelecionado.saque_fora.por_cima,
//                 jogadorSelecionado.saque_fora.viagem_fundo_do_mar,
//                 ++jogadorSelecionado.saque_fora.flutuante,
//                 jogadorSelecionado.saque_fora.hibrido_misto,)
//         }
//         if (tipoSaque.value === "hibrido_misto") {
//             SaqueFora(idJogador,
//                 jogadorSelecionado.saque_fora.por_baixo,
//                 jogadorSelecionado.saque_fora.lateral_asiatico,
//                 jogadorSelecionado.saque_fora.por_cima,
//                 jogadorSelecionado.saque_fora.viagem_fundo_do_mar,
//                 jogadorSelecionado.saque_fora.flutuante,
//                 ++jogadorSelecionado.saque_fora.hibrido_misto,)
//         }
//     }
//     alert("Saque Salvo")
// })
// salvarPasse.addEventListener("click", function () {
//     var idJogador = ""
//     var jogadorSelecionado = {}
//     onValue(jogadorInDB, function (snapshot) {
//         let jogadoresArray = Object.entries(snapshot.val())
//         for (let i = 0; i < jogadoresArray.length; i++) {
//             let jogadorAtual = jogadoresArray[i]
//             if (jogadoresIDNoTimeArray.includes(jogadorAtual[0])) {
//                 idJogador = jogadorAtual[0]
//                 jogadorSelecionado = jogadorAtual[1]
//                 TipoPasse(idJogador, Number(document.querySelector(`input[name="${idJogador}_passe_A"]`).value) + jogadorSelecionado.passe.passe_A, Number(document.querySelector(`input[name="${idJogador}_passe_B"]`).value) + jogadorSelecionado.passe.passe_B, Number(document.querySelector(`input[name="${idJogador}_passe_C"]`).value) + jogadorSelecionado.passe.passe_C, Number(document.querySelector(`input[name="${idJogador}_passe_D"]`).value) + jogadorSelecionado.passe.passe_D)
//                 console.log(jogadorSelecionado.nome)
//             }
//         }
//     })
//     alert("Passe Salvo")
// })
// // Funções importantes
// function SaqueDentroNaoAce(idJogador, por_baixo, lateral_asiatico, por_cima, viagem_fundo_do_mar, flutuante, hibrido_misto, ace_por_baixo, ace_lateral_asiatico, ace_por_cima, ace_viagem_fundo_do_mar, ace_flutuante, ace_hibrido_misto) {
//     const db = getDatabase();
//     // A post entry.
//     const postData = {
//         por_baixo: por_baixo,
//         lateral_asiatico: lateral_asiatico,
//         por_cima: por_cima,
//         viagem_fundo_do_mar: viagem_fundo_do_mar,
//         flutuante: flutuante,
//         hibrido_misto: hibrido_misto,
//         ace: {
//             por_baixo: ace_por_baixo,
//             lateral_asiatico: ace_lateral_asiatico,
//             por_cima: ace_por_cima,
//             viagem_fundo_do_mar: ace_viagem_fundo_do_mar,
//             flutuante: ace_flutuante,
//             hibrido_misto: ace_hibrido_misto
//         }
//     };
//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     const updates = {};
//     updates['/jogador/' + idJogador + '/saque_dentro'] = postData;
//     return update(ref(db), updates);
// }
// function SaqueFora(idJogador, por_baixo, lateral_asiatico, por_cima, viagem_fundo_do_mar, flutuante, hibrido_misto) {
//     const db = getDatabase();
//     // A post entry.
//     const postData = {
//         por_baixo: por_baixo,
//         lateral_asiatico: lateral_asiatico,
//         por_cima: por_cima,
//         viagem_fundo_do_mar: viagem_fundo_do_mar,
//         flutuante: flutuante,
//         hibrido_misto: hibrido_misto
//     };
//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     const updates = {};
//     updates['/jogador/' + idJogador + '/saque_fora'] = postData;
//     return update(ref(db), updates);
// }
// function SaqueDentroACE(idJogador, por_baixo, lateral_asiatico, por_cima, viagem_fundo_do_mar, flutuante, hibrido_misto) {
//     const db = getDatabase();
//     // A post entry.
//     const postData = {
//         por_baixo: por_baixo,
//         lateral_asiatico: lateral_asiatico,
//         por_cima: por_cima,
//         viagem_fundo_do_mar: viagem_fundo_do_mar,
//         flutuante: flutuante,
//         hibrido_misto: hibrido_misto,
//     };
//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     const updates = {};
//     updates['/jogador/' + idJogador + '/saque_dentro/ace'] = postData;
//     return update(ref(db), updates);
// }
// function TipoPasse(idJogador, passeA, passeB, passeC, passeD) {
//     const db = getDatabase();
//     // A post entry.
//     const postData = {
//         passe_A: passeA,
//         passe_B: passeB,
//         passe_C: passeC,
//         passe_D: passeD
//     };
//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     const updates = {};
//     updates['/jogador/' + idJogador + '/passe'] = postData;
//     return update(ref(db), updates);
// }
// function NovoJogador(idTime, jogadoresNoTime, novoJogador, nomeTime, sexoTime) {
//     const db = getDatabase();
//     // A post entry.
//     const postData = {
//         jogadores: jogadoresNoTime + ',' + novoJogador,
//         nome: nomeTime,
//         sexo: sexoTime
//     };
//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     const updates = {};
//     updates['/time/' + idTime] = postData;
//     return update(ref(db), updates);
// }