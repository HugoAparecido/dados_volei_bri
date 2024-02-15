// importações necessárias
// Importando as classes de seus respectivos documentos
import { Auth } from "./classes/auth_class.js";
import { Validation } from "./classes/validation_class.js";
import { Jogador } from "./classes/jogador_class.js";
// Elementos htmls
// guardando todos os elementos html dentro de uma constante em forma de objeto
// elementos do formulário
const form = {
    nomeJogador: () => document.getElementById("nome_jogador"),
    numCamisaJogador: () => document.getElementById("num_camisa_jogador"),
    posicaoJogador: () => document.getElementById("posicao_jogador"),
    sexoJogador: () => document.getElementById("sexo_jogador"),
    alturaJogador: () => document.getElementById("altura_jogador"),
    pesoJogador: () => document.getElementById("peso_jogador"),
    botaoCadastrarJogador: () => document.getElementById("cadastrar_jogador")
}
// botões
const buttons = {
    logoutButton: () => document.getElementById('logout'),
    buttonMostrarJogadoresCadastrados: () => document.getElementById("mostrar_jogadores_cadastrados")
}
// local para mostrar os jogadores já cadastrados (é uma tabela)
const locaisalteracoes = {
    mostrarJogadoresCadastrados: () => document.getElementById("jogadores_cadastrados")
}
// Gerencia de atenticação
// instanciando classe Auth
let auth = new Auth;
// Verificando se o usuário está logado
auth.UsuarioNaoLogado();
// se o usuário clicar no botao ele deslogará
buttons.logoutButton().addEventListener('click', () => {
    auth.Logout();
})
// Listeners
// instanciando classe Jogador
let jogador = new Jogador;
// se o ususario clicar no botao o jogador será cadastrado
form.botaoCadastrarJogador().addEventListener('click', () => {
    // instanciando a classe validação
    let validacoes = new Validation
    // como os campos estão como text, eles serão tratados para verificar se é um número, eliminar vírgulas e pontos extras, e se foi adicionado com vírgula o valor ela será trocada por ponto
    validacoes.TratarInputTextComoNumber(form.alturaJogador())
    validacoes.TratarInputTextComoNumber(form.pesoJogador())
    // função para cadastrar o jogador
    jogador.CadastrarJogador(form.nomeJogador().value, form.sexoJogador().value, form.numCamisaJogador().value, form.posicaoJogador().value, form.alturaJogador().value, form.pesoJogador().value);
})
// se clicar mostra todos os jogadores
buttons.buttonMostrarJogadoresCadastrados().addEventListener('click', () => {
    jogador.MostrarTodosJogadores(locaisalteracoes.mostrarJogadoresCadastrados);
})