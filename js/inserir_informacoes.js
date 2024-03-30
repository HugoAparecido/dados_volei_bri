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
validation.VerificarTimeSelecionadoExistente()
// Cadastrar jogador ao time
buttons.salvarOutroJogador().addEventListener('click', () =>
    time.InserirJogador(RetirarNumeroDoJogadorEPosicaoSelect(form.novoJogadorSelecionar().options[form.novoJogadorSelecionar().selectedIndex].text), form.novoJogadorSelecionar().value)
)
buttons.salvarInformacoes().addEventListener("click", () => jogador.AtualizarInformacoesDeTodosJogadores());
// Função para pegar somente o nome do jogador no texto do select
function RetirarNumeroDoJogadorEPosicaoSelect(texto) {
    // texto = "numero: nome sobrenome (posicao)""
    // divide a string em um array, onde a posição 0 é tudo  que está antes do (, e a 1 depois
    // partes[0] = "numero: nome sobrenome"; partes[1] = "posicao)"
    let partes = texto.split("(");
    // divide a parte antes do ( em um outro array
    // partes[0]= "numero:""; partes[1]="nome"; partes[2]="sobrenome"
    partes = partes[0].split(" ");
    // retonar a partir da posição 1 do array até a última, juntando elas com espaço
    // "nome" + " " + "sobrenome"
    // partes[1] + " " + partes[3(tamanho)-1]
    return partes.slice(1, partes.length - 1).join(" ");
}