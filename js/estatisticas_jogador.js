// importações necessárias
import { Graficos } from "./graficos_class.js"
import { Jogador } from "./jogador_class.js"
// Elementos html
// Locais de modificação
const locais = {
    localGraficoSaqueJogador: () => document.getElementById("grafico_saque_jogador"),
    localGraficoPasseJogador: () => document.getElementById("grafico_passe_jogador"),
    localGraficoBloqueioJogador: () => document.getElementById("grafico_bloqueio_jogador"),
    localGraficoLevantamentoJogador: () => document.getElementById("grafico_levantamento_jogador"),
    jogadorSelecionado: () => document.getElementById("nome"),
}
// Botões
const botoes = {
    mostrarGraficos: () => document.getElementById("exibir_graficos")
}
// Pepular Select
let jogador = new Jogador
jogador.MostrarTodosJogadoresSelect(locais.jogadorSelecionado())
// Mostrar Gráficos
let grafico = new Graficos
botoes.mostrarGraficos().addEventListener('click', () => {
    locais.localGraficoBloqueioJogador().innerHTML = locais.localGraficoLevantamentoJogador().innerHTML = locais.localGraficoPasseJogador().innerHTML = locais.localGraficoSaqueJogador().innerHTML = "";
    grafico.PasseJogador(locais.jogadorSelecionado().value, RetirarNumeroDoJogadorEPosicaoSelect(locais.jogadorSelecionado().options[locais.jogadorSelecionado().selectedIndex].text), locais.localGraficoPasseJogador())
    grafico.TipoSaqueJogador(locais.jogadorSelecionado().value, RetirarNumeroDoJogadorEPosicaoSelect(locais.jogadorSelecionado().options[locais.jogadorSelecionado().selectedIndex].text), locais.localGraficoSaqueJogador())
    grafico.SaqueJogador(locais.jogadorSelecionado().value, RetirarNumeroDoJogadorEPosicaoSelect(locais.jogadorSelecionado().options[locais.jogadorSelecionado().selectedIndex].text), locais.localGraficoSaqueJogador())
    grafico.BloqueioJogador(locais.jogadorSelecionado().value, RetirarNumeroDoJogadorEPosicaoSelect(locais.jogadorSelecionado().options[locais.jogadorSelecionado().selectedIndex].text), locais.localGraficoBloqueioJogador())
    grafico.LevantamentoJogador(locais.jogadorSelecionado().value, RetirarNumeroDoJogadorEPosicaoSelect(locais.jogadorSelecionado().options[locais.jogadorSelecionado().selectedIndex].text), locais.localGraficoLevantamentoJogador())
})
// Função para pegar o texto do select
function RetirarNumeroDoJogadorEPosicaoSelect(texto) {
    let partes = texto.split("(");
    partes = partes[0].split(" ");
    return partes.slice(1, partes.length - 1).join(" ");
}