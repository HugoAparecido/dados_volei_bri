// importações necessárias
import { Auth } from "./auth_class.js";
import { Time } from "./time_class.js";
import { Jogador } from "./jogador_class.js";
// Elementos htmls
// botões
const buttons = {
    logoutButton: () => document.getElementById('logout'),
    salvarSaque: () => document.getElementById("salvar_saque"),
    salvarPasse: () => document.getElementById("salvar_passe"),
    salvarAtaque: () => document.getElementById("salvar_ataque"),
    salvarBloqueio: () => document.getElementById("salvar_bloqueio"),
    salvarLevantamento: () => document.getElementById("salvar_levantamento"),
    salvarOutroJogador: () => document.getElementById("adicionar_jogador_button")
}
// inputs e selects
const form = {
    tipoSaque: () => document.getElementById("tipo_saque"),
    selecionarJogador: () => document.getElementById("nome"),
    novoJogadorSelecionar: () => document.getElementById("novo_jogador"),
    colocarJogadoresDoTime: () => document.getElementById("jogadores_no_time"),
    saqueDentroFora: () => document.querySelector('input[name="saque"]:checked'),
    saqueAce: () => document.querySelector('input[name="ace"]:checked'),
    acertoAtaque: () => document.querySelector('input[name="acertado_errado"]:checked'),
    acertoBloqueio: () => document.querySelector('input[name="bloqueio"]:checked'),
    levantamentoPara: () => document.querySelector('input[name="levantamento"]:checked')
}
// cabeçalho
const informacoes = {
    timeExportado: () => document.getElementById("time_exportado"),
    timeSexo: () => document.getElementById("sexo_time")
}
// Instanciando Classes
let time = new Time;
let jogador = new Jogador;
let auth = new Auth;
// Gerencia de atenticação
auth.UsuarioNaoLogado();
buttons.logoutButton().addEventListener('click', () => {
    auth.Logout();
})
// Populando o cabeçalho
time.PopularCabecalhoInserirInformacoes(informacoes.timeExportado(), informacoes.timeSexo());
// Populando selects
jogador.PopularNovosJogadores(form.novoJogadorSelecionar());
jogador.PopularSelectSaqueAtaque(form.selecionarJogador())
// Populando os jogadores e inserções de passes
jogador.PopularPasses(form.colocarJogadoresDoTime());
// eventos
// Cadastrar jogador ao time
buttons.salvarOutroJogador().addEventListener('click', () => {
    time.InserirJogador(RetirarNumeroDoJogadorSelect(form.novoJogadorSelecionar().options[form.novoJogadorSelecionar().selectedIndex].text), form.novoJogadorSelecionar().value);
})
// Salvar novos passes
buttons.salvarPasse().addEventListener('click', () => {
    jogador.AtualizarPasseDeTodosJogadores();
})
// Salvar novo saque
buttons.salvarSaque().addEventListener('click', () => {
    jogador.CadastrarSaque(form.selecionarJogador().value, RetirarNumeroDoJogadorSelect(form.selecionarJogador().options[form.selecionarJogador().selectedIndex].text), form.saqueAce().value, form.saqueDentroFora().value, form.tipoSaque().value)
})
// Salvar novo ataque
buttons.salvarAtaque().addEventListener('click', () => {
    jogador.CadastrarAtaque(form.selecionarJogador().value, RetirarNumeroDoJogadorSelect(form.selecionarJogador().options[form.selecionarJogador().selectedIndex].text), form.acertoAtaque().value)
})
// Salvar novo bloqueio
buttons.salvarBloqueio().addEventListener('click', () => {
    jogador.CadastrarBloqueio(form.selecionarJogador().value, RetirarNumeroDoJogadorSelect(form.selecionarJogador().options[form.selecionarJogador().selectedIndex].text), form.acertoBloqueio().value)
})
// Salvar novo levantamento
buttons.salvarLevantamento().addEventListener('click', () => {
    jogador.CadastrarLevantamento(form.selecionarJogador().value, RetirarNumeroDoJogadorSelect(form.selecionarJogador().options[form.selecionarJogador().selectedIndex].text), form.levantamentoPara().value)
})
// Função para pegar o texto do select
function RetirarNumeroDoJogadorSelect(texto) {
    if (isNaN(texto.charAt(0))) {
        return texto
    }
    let partes = texto.split(" ");
    return partes.slice(1).join(" ");
}