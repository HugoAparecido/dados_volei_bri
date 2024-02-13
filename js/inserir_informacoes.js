// importações necessárias
import { Time } from "./classes/time_class.js";
import { Jogador } from "./classes/jogador_class.js";
import { Validation } from "./classes/validation_class.js";
// Elementos htmls
// botões
const buttons = {
    salvarInformacoes: () => document.getElementById("salvar_informacoes"),
    salvarOutroJogador: () => document.getElementById("adicionar_jogador_button")
}
// inputs e selects
export const form = {
    selecionarJogador: () => document.getElementById("nome"),
    novoJogadorSelecionar: () => document.getElementById("novo_jogador"),
    colocarJogadoresDoTime: () => document.getElementById("jogadores_no_time")
}
// cabeçalho
export const informacoes = {
    timeExportado: () => document.getElementById("time_exportado"),
    timeSexo: () => document.getElementById("sexo_time")
}
// Instanciando Classes
let time = new Time;
let jogador = new Jogador;
let validation = new Validation
// eventos
// Verificando se há um time selecionado
validation.VerificarTimeSelecionadoExixtente()
// Cadastrar jogador ao time
buttons.salvarOutroJogador().addEventListener('click', () => {
    time.InserirJogador(RetirarNumeroDoJogadorSelect(form.novoJogadorSelecionar().options[form.novoJogadorSelecionar().selectedIndex].text), form.novoJogadorSelecionar().value);
})
buttons.salvarInformacoes().addEventListener("click", () => jogador.AtualizarInformacoesDeTodosJogadores());
// Função para pegar o texto do select
function RetirarNumeroDoJogadorSelect(texto) {
    if (isNaN(texto.charAt(0))) {
        return texto
    }
    let partes = texto.split(" ");
    return partes.slice(1).join(" ");
}