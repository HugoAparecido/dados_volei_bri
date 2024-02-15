// importações necessárias
import { Graficos } from "./classes/graficos_class.js";
import { Time } from "./classes/time_class.js";
// Elementos html
// Locais de modificação
const locais = {
    localGraficoSaqueTime: () => document.getElementById("grafico_saque_time"),
    localGraficoPasseTime: () => document.getElementById("grafico_passe_time"),
    localGraficoAtaqueTime: () => document.getElementById("grafico_ataque_time"),
    localGraficoBloqueioTime: () => document.getElementById("grafico_bloqueio_time"),
    localGraficoLevantamentoTime: () => document.getElementById("grafico_levantamento_time"),
    timeSelecionado: () => document.getElementById("time"),
    localGraficoSaqueJogador: () => document.getElementById("grafico_saque_jogador"),
    localGraficoPasseJogador: () => document.getElementById("grafico_passe_jogador"),
    localGraficoAtaqueJogador: () => document.getElementById("grafico_ataque_jogador"),
    localGraficoBloqueioJogador: () => document.getElementById("grafico_bloqueio_jogador"),
    localGraficoLevantamentoJogador: () => document.getElementById("grafico_levantamento_jogador"),
    jogadorSelecionado: () => document.getElementById("jogador"),
    localGraficosJogadorAtivar: () => document.getElementById("escolher_jogador")
};
// Botões
const botoes = {
    mostrarGraficosTime: () => document.getElementById("exibir_graficos_time"),
    mostrarGraficosJogador: () => document.getElementById("exibir_graficos_jogador")
};
// Pepular Select
let time = new Time;
time.PopularSelect(locais.timeSelecionado());
// Mostrar Gráficos
let grafico = new Graficos;
botoes.mostrarGraficosTime().addEventListener('click', () => {
    locais.localGraficoBloqueioTime().innerHTML = locais.localGraficoLevantamentoTime().innerHTML = locais.localGraficoPasseTime().innerHTML = locais.localGraficoSaqueTime().innerHTML = locais.localGraficoAtaqueTime().innerHTML = "";
    grafico.InserirGraficos(locais.timeSelecionado().value, locais.timeSelecionado().options[locais.timeSelecionado().selectedIndex].text, locais.localGraficoPasseTime());
    grafico.SaqueTimeTipo(locais.timeSelecionado().value, locais.timeSelecionado().options[locais.timeSelecionado().selectedIndex].text, locais.localGraficoSaqueTime());
    grafico.SaqueTime(locais.timeSelecionado().value, locais.timeSelecionado().options[locais.timeSelecionado().selectedIndex].text, locais.localGraficoSaqueTime());
    grafico.AtaqueTime(locais.timeSelecionado().value, locais.timeSelecionado().options[locais.timeSelecionado().selectedIndex].text, locais.localGraficoAtaqueTime());
    grafico.BloqueioTime(locais.timeSelecionado().value, locais.timeSelecionado().options[locais.timeSelecionado().selectedIndex].text, locais.localGraficoBloqueioTime());
    grafico.LevantamentoTime(locais.timeSelecionado().value, locais.timeSelecionado().options[locais.timeSelecionado().selectedIndex].text, locais.localGraficoLevantamentoTime());
    time.JogadoresNoTime(locais.timeSelecionado().value, locais.timeSelecionado().options[locais.timeSelecionado().selectedIndex].text, locais.jogadorSelecionado());
    locais.localGraficosJogadorAtivar().style.display = "block";
    locais.localGraficoBloqueioJogador().innerHTML = locais.localGraficoLevantamentoJogador().innerHTML = locais.localGraficoPasseJogador().innerHTML = locais.localGraficoSaqueJogador().innerHTML = locais.localGraficoAtaqueJogador().innerHTML = "";
});
// Mostrar Gráficos
botoes.mostrarGraficosJogador().addEventListener('click', () => {
    locais.localGraficoBloqueioJogador().innerHTML = locais.localGraficoLevantamentoJogador().innerHTML = locais.localGraficoPasseJogador().innerHTML = locais.localGraficoSaqueJogador().innerHTML = locais.localGraficoAtaqueJogador().innerHTML = "";
    grafico.PasseJogador(locais.jogadorSelecionado().value, RetirarNumeroDoJogadorEPosicaoSelect(locais.jogadorSelecionado().options[locais.jogadorSelecionado().selectedIndex].text), locais.localGraficoPasseJogador());
    grafico.TipoSaqueJogador(locais.jogadorSelecionado().value, RetirarNumeroDoJogadorEPosicaoSelect(locais.jogadorSelecionado().options[locais.jogadorSelecionado().selectedIndex].text), locais.localGraficoSaqueJogador());
    grafico.SaqueJogador(locais.jogadorSelecionado().value, RetirarNumeroDoJogadorEPosicaoSelect(locais.jogadorSelecionado().options[locais.jogadorSelecionado().selectedIndex].text), locais.localGraficoSaqueJogador());
    grafico.AtaqueJogador(locais.jogadorSelecionado().value, RetirarNumeroDoJogadorEPosicaoSelect(locais.jogadorSelecionado().options[locais.jogadorSelecionado().selectedIndex].text), locais.localGraficoAtaqueJogador());
    grafico.BloqueioJogador(locais.jogadorSelecionado().value, RetirarNumeroDoJogadorEPosicaoSelect(locais.jogadorSelecionado().options[locais.jogadorSelecionado().selectedIndex].text), locais.localGraficoBloqueioJogador());
    grafico.LevantamentoJogador(locais.jogadorSelecionado().value, RetirarNumeroDoJogadorEPosicaoSelect(locais.jogadorSelecionado().options[locais.jogadorSelecionado().selectedIndex].text), locais.localGraficoLevantamentoJogador());
})
// Função para pegar o texto do select
function RetirarNumeroDoJogadorEPosicaoSelect(texto) {
    let partes = texto.split("(");
    partes = partes[0].split(" ");
    return partes.slice(1, partes.length - 1).join(" ");
}