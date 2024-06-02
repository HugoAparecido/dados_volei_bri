// importações necessárias
import { Graficos } from "./classes/graficos_class.js";
import { Time } from "./classes/time_class.js";
// Elementos html
// Locais de modificação
const locais = {
    // para os gráficos do time
    localGraficoSaqueTime: () => document.getElementById("grafico_saque_time"),
    localGraficoSaqueTimeTipo: () => document.getElementById("grafico_saque_tipo_time"),
    localGraficoPasseTime: () => document.getElementById("grafico_passe_time"),
    localGraficoPasseDefesaTime: () => document.getElementById("grafico_defesa_time"),
    localGraficoAtaqueTime: () => document.getElementById("grafico_ataque_time"),
    localGraficoBloqueioTime: () => document.getElementById("grafico_bloqueio_time"),
    localGraficoLevantamentoTime: () => document.getElementById("grafico_levantamento_time"),
    // para o select do time
    timeSelecionado: () => document.getElementById("time"),
    // para os gráficos do jogador
    localGraficoSaqueJogador: () => document.getElementById("grafico_saque_jogador"),
    localGraficoSaqueJogadorTipo: () => document.getElementById("grafico_saque_tipo_jogador"),
    localGraficoPasseJogador: () => document.getElementById("grafico_passe_jogador"),
    localGraficoPasseDefesaJogador: () => document.getElementById("grafico_defesa_jogador"),
    localGraficoAtaqueJogador: () => document.getElementById("grafico_ataque_jogador"),
    localGraficoBloqueioJogador: () => document.getElementById("grafico_bloqueio_jogador"),
    localGraficoLevantamentoJogador: () => document.getElementById("grafico_levantamento_jogador"),
    // para o select do time
    jogadorSelecionado: () => document.getElementById("jogador"),
    // local onde está o select e os gráficos do jogador
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
    // zerando o html dos locais dos gráficos
    locais.localGraficoBloqueioTime().innerHTML = locais.localGraficoLevantamentoTime().innerHTML = locais.localGraficoPasseTime().innerHTML = locais.localGraficoSaqueTime().innerHTML = locais.localGraficoAtaqueTime().innerHTML = locais.localGraficoSaqueTimeTipo().innerHTML = locais.localGraficoPasseDefesaTime().innerHTML = "";
    // colocando os gráficos
    grafico.InserirGraficosTime(locais.timeSelecionado().value, locais.timeSelecionado().options[locais.timeSelecionado().selectedIndex].text, locais.localGraficoPasseTime(), locais.localGraficoSaqueTimeTipo(), locais.localGraficoSaqueTime(), locais.localGraficoAtaqueTime(), locais.localGraficoBloqueioTime(), locais.localGraficoLevantamentoTime(), locais.localGraficoPasseDefesaTime());
    // populadno o select com os jogadores do time
    time.JogadoresNoTime(locais.timeSelecionado().value, locais.timeSelecionado().options[locais.timeSelecionado().selectedIndex].text, locais.jogadorSelecionado());
    // aparecendo o local para selecionar o jogador
    locais.localGraficosJogadorAtivar().style.display = "flex";
    // resetando o html dos locais dos gráficos
    locais.localGraficoBloqueioJogador().innerHTML = locais.localGraficoLevantamentoJogador().innerHTML = locais.localGraficoPasseJogador().innerHTML = locais.localGraficoSaqueJogador().innerHTML = locais.localGraficoAtaqueJogador().innerHTML = "";
});
// Mostrar Gráficos
botoes.mostrarGraficosJogador().addEventListener('click', () => {
    // zerando o html dos locais dos gráficos
    locais.localGraficoBloqueioJogador().innerHTML = locais.localGraficoLevantamentoJogador().innerHTML = locais.localGraficoPasseJogador().innerHTML = locais.localGraficoSaqueJogador().innerHTML = locais.localGraficoAtaqueJogador().innerHTML = locais.localGraficoSaqueJogadorTipo().innerHTML = locais.localGraficoPasseDefesaJogador().innerHTML = "";
    // colocando os gráficos
    grafico.InserirGraficosJogador(locais.jogadorSelecionado().value, RetirarNumeroDoJogadorEPosicaoSelect(locais.jogadorSelecionado().options[locais.jogadorSelecionado().selectedIndex].text), locais.localGraficoPasseJogador(), locais.localGraficoSaqueJogadorTipo(), locais.localGraficoSaqueJogador(), locais.localGraficoAtaqueJogador(), locais.localGraficoBloqueioJogador(), locais.localGraficoLevantamentoJogador(), locais.localGraficoPasseDefesaJogador());
})
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