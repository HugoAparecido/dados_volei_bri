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
    colocarJogadoresDoTime: () => document.getElementById("jogadores_no_time"),
    saqueDentroFora: () => document.querySelector('input[name="saque"]:checked'),
    saqueAce: () => document.querySelector('input[name="ace"]:checked')
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
jogador.PopularPasses(form.colocarJogadoresDoTime());
jogador.PopularSelectSaqueAtaque(form.selecionarJogador())
// eventos
buttons.salvarOutroJogador().addEventListener('click', () => {
    let textoSelecionado = form.novoJogadorSelecionar().options[form.novoJogadorSelecionar().selectedIndex].text;
    let arrayTexto = textoSelecionado.split("-");
    time.InserirJogador(arrayTexto[1], form.novoJogadorSelecionar().value);
})
buttons.salvarPasse().addEventListener('click', () => {
    jogador.AtualizarPasseDeTodosJogadores();
})
buttons.salvarSaque().addEventListener('click', () => {
    let textoSelecionado = form.selecionarJogador().options[form.selecionarJogador().selectedIndex].text;
    let arrayTexto = textoSelecionado.split("-");
    jogador.CadastrarSaque(form.selecionarJogador().value, arrayTexto, form.saqueAce().value, form.saqueDentroFora().value, form.tipoSaque().value)
})