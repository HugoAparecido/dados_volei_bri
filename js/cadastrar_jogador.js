// importações necessárias
import { Auth } from "./auth_class.js";
import { Validation } from "./validation_class.js";
import { Jogador } from "./jogador_class.js";
// Elementos htmls
const form = {
    nomeJogador: () => document.getElementById("nome_jogador"),
    numCamisaJogador: () => document.getElementById("num_camisa_jogador"),
    posicaoJogador: () => document.getElementById("posicao_jogador"),
    sexoJogador: () => document.getElementById("sexo_jogador"),
    alturaJogador: () => document.getElementById("altura_jogador"),
    pesoJogador: () => document.getElementById("peso_jogador"),
    botaoCadastrarJogador: () => document.getElementById("cadastrar_jogador")
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
form.botaoCadastrarJogador().addEventListener('click', () => {
    let validacoes = new Validation
    validacoes.TratarInputTextComoNumber(form.alturaJogador())
    validacoes.TratarInputTextComoNumber(form.pesoJogador())
    jogador.CadastrarJogador(form.nomeJogador().value, form.sexoJogador().value, form.numCamisaJogador().value, form.posicaoJogador().value, form.alturaJogador().value, form.pesoJogador().value);
})
buttons.buttonMostrarJogadoresCadastrados().addEventListener('click', () => {
    jogador.MostrarTodosJogadores(locaisalteracoes.mostrarJogadoresCadastrados);
})