// importações necessárias
import { Auth } from "./classes/auth_class.js";
import { Validation } from "./classes/validation_class.js";
import { Jogador } from "./classes/jogador_class.js";
// Elementos htmls
const form = {
    nomeJogador: () => document.getElementById("nome_jogador"),
    novoNomeJogador: () => document.getElementById("novo_nome_jogador"),
    numCamisaJogador: () => document.getElementById("num_camisa_jogador"),
    posicaoJogador: () => document.getElementById("posicao_jogador"),
    sexoJogador: () => document.getElementById("sexo_jogador"),
    alturaJogador: () => document.getElementById("altura_jogador"),
    pesoJogador: () => document.getElementById("peso_jogador"),
    botaoAtualizarJogador: () => document.getElementById("cadastrar_jogador")
}
const buttons = {
    logoutButton: () => document.getElementById('logout'),
    buttonMostrarJogadoresCadastrados: () => document.getElementById("mostrar_jogadores_cadastrados")
}
const locaisalteracoes = {
    mostrarJogadoresCadastrados: () => document.getElementById("jogadores_cadastrados")
}
// Gerencia de atenticação
let auth = new Auth;
auth.UsuarioNaoLogado();
buttons.logoutButton().addEventListener('click', () => {
    auth.Logout();
})
// Listeners
let jogador = new Jogador;
let jaEhLevantador = false;
let jaEhLibero = false;
jogador.MostrarTodosJogadoresSelect(form.nomeJogador())
form.nomeJogador().addEventListener("change", () =>
    jogador.PopularFormCadastro(form.nomeJogador().value, RetirarNumeroDoJogadorEPosicaoSelect(form.nomeJogador().options[form.nomeJogador().selectedIndex].text), form.numCamisaJogador(), form.posicaoJogador(), form.sexoJogador(), form.alturaJogador(), form.pesoJogador(), jaEhLevantador, jaEhLibero)
)
form.botaoAtualizarJogador().addEventListener('click', () => {
    let validacoes = new Validation
    validacoes.TratarInputTextComoNumber(form.alturaJogador())
    validacoes.TratarInputTextComoNumber(form.pesoJogador())
    jogador.AtualizarJogador(form.nomeJogador().value, RetirarNumeroDoJogadorEPosicaoSelect(form.nomeJogador().options[form.nomeJogador().selectedIndex].text), form.novoNomeJogador().value, form.numCamisaJogador().value, form.posicaoJogador().value, form.sexoJogador().value, form.alturaJogador().value, form.pesoJogador().value, jaEhLevantador, jaEhLibero);
})
buttons.buttonMostrarJogadoresCadastrados().addEventListener('click', () => {
    jogador.MostrarTodosJogadores(locaisalteracoes.mostrarJogadoresCadastrados);
})
// Função para pegar o texto do select
function RetirarNumeroDoJogadorEPosicaoSelect(texto) {
    let partes = texto.split("(");
    partes = partes[0].split(" ");
    return partes.slice(1, partes.length - 1).join(" ");
}