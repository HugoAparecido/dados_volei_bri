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
    localGraficoErroDefesaTime: () => document.getElementById("grafico_erro_defesa_time"),
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
    // para os gráficos do todo
    localGraficoSaqueTodo: () => document.getElementById("grafico_saque_todo"),
    localGraficoSaqueTodoTipo: () => document.getElementById("grafico_saque_tipo_todo"),
    localGraficoPasseTodo: () => document.getElementById("grafico_passe_todo"),
    localGraficoPasseDefesaTodo: () => document.getElementById("grafico_defesa_todo"),
    localGraficoAtaqueTodo: () => document.getElementById("grafico_ataque_todo"),
    localGraficoBloqueioTodo: () => document.getElementById("grafico_bloqueio_todo"),
    localGraficoLevantamentoTodo: () => document.getElementById("grafico_levantamento_todo"),
    // para os gráficos do todo masculino
    localGraficoSaqueTodoMasculino: () => document.getElementById("grafico_saque_todo_masculino"),
    localGraficoSaqueTodoMasculinoTipo: () => document.getElementById("grafico_saque_tipo_todo_masculino"),
    localGraficoPasseTodoMasculino: () => document.getElementById("grafico_passe_todo_masculino"),
    localGraficoPasseDefesaTodoMasculino: () => document.getElementById("grafico_defesa_todo_masculino"),
    localGraficoAtaqueTodoMasculino: () => document.getElementById("grafico_ataque_todo_masculino"),
    localGraficoBloqueioTodoMasculino: () => document.getElementById("grafico_bloqueio_todo_masculino"),
    localGraficoLevantamentoTodoMasculino: () => document.getElementById("grafico_levantamento_todo_masculino"),
    // para os gráficos do todo feminino
    localGraficoSaqueTodoFeminino: () => document.getElementById("grafico_saque_todo_feminino"),
    localGraficoSaqueTodoFemininoTipo: () => document.getElementById("grafico_saque_tipo_todo_feminino"),
    localGraficoPasseTodoFeminino: () => document.getElementById("grafico_passe_todo_feminino"),
    localGraficoPasseDefesaTodoFeminino: () => document.getElementById("grafico_defesa_todo_feminino"),
    localGraficoAtaqueTodoFeminino: () => document.getElementById("grafico_ataque_todo_feminino"),
    localGraficoBloqueioTodoFeminino: () => document.getElementById("grafico_bloqueio_todo_feminino"),
    localGraficoLevantamentoTodoFeminino: () => document.getElementById("grafico_levantamento_todo_feminino"),
    // para o select do time
    jogadorSelecionado: () => document.getElementById("jogador"),
    // local onde está o select e os gráficos do jogador
    localGraficosJogadorAtivar: () => document.getElementById("escolher_jogador")
};
// Botões
const botoes = {
    mostrarGraficosTime: () => document.getElementById("exibir_graficos_time"),
    mostrarGraficosJogador: () => document.getElementById("exibir_graficos_jogador"),
    mostrarGraficosTodo: () => document.getElementById("exibir_graficos_total")
};
// Pepular Select
let time = new Time;
time.PopularSelect(locais.timeSelecionado());
// Mostrar Gráficos
let grafico = new Graficos;
botoes.mostrarGraficosTime().addEventListener('click', () => {
    // zerando o html dos locais dos gráficos
    locais.localGraficoBloqueioTime().innerHTML = locais.localGraficoLevantamentoTime().innerHTML = locais.localGraficoPasseTime().innerHTML = locais.localGraficoSaqueTime().innerHTML = locais.localGraficoAtaqueTime().innerHTML = locais.localGraficoSaqueTimeTipo().innerHTML = locais.localGraficoPasseDefesaTime().innerHTML = locais.localGraficoErroDefesaTime().innerHTML = "";
    // colocando os gráficos
    grafico.InserirGraficosTime(locais.timeSelecionado().value, locais.timeSelecionado().options[locais.timeSelecionado().selectedIndex].text, locais.localGraficoPasseTime(), locais.localGraficoSaqueTimeTipo(), locais.localGraficoSaqueTime(), locais.localGraficoAtaqueTime(), locais.localGraficoBloqueioTime(), locais.localGraficoLevantamentoTime(), locais.localGraficoPasseDefesaTime(), locais.localGraficoErroDefesaTime());
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
// Mostrar Gráficos
botoes.mostrarGraficosTodo().addEventListener('click', () => {
    // zerando o html dos locais dos gráficos
    locais.localGraficoBloqueioTodo().innerHTML = locais.localGraficoLevantamentoTodo().innerHTML = locais.localGraficoPasseTodo().innerHTML = locais.localGraficoSaqueTodo().innerHTML = locais.localGraficoAtaqueTodo().innerHTML = locais.localGraficoSaqueTodoTipo().innerHTML = locais.localGraficoPasseDefesaTodo().innerHTML = "";
    // zerando o html dos locais dos gráficos
    locais.localGraficoPasseTodoMasculino().innerHTML = locais.localGraficoSaqueTodoMasculinoTipo().innerHTML = locais.localGraficoSaqueTodoMasculino().innerHTML = locais.localGraficoAtaqueTodoMasculino().innerHTML = locais.localGraficoBloqueioTodoMasculino().innerHTML = locais.localGraficoLevantamentoTodoMasculino().innerHTML = locais.localGraficoPasseDefesaTodoMasculino().innerHTML = locais.localGraficoPasseTodoFeminino().innerHTML = locais.localGraficoSaqueTodoFemininoTipo().innerHTML = locais.localGraficoSaqueTodoFeminino().innerHTML = locais.localGraficoAtaqueTodoFeminino().innerHTML = locais.localGraficoBloqueioTodoFeminino().innerHTML = locais.localGraficoLevantamentoTodoFeminino().innerHTML = locais.localGraficoPasseDefesaTodoFeminino().innerHTML = "";
    // colocando os gráficos
    grafico.InserirGraficosTotal(locais.localGraficoPasseTodo(), locais.localGraficoSaqueTodoTipo(), locais.localGraficoSaqueTodo(), locais.localGraficoAtaqueTodo(), locais.localGraficoBloqueioTodo(), locais.localGraficoLevantamentoTodo(), locais.localGraficoPasseDefesaTodo(), locais.localGraficoPasseTodoMasculino(), locais.localGraficoSaqueTodoMasculinoTipo(), locais.localGraficoSaqueTodoMasculino(), locais.localGraficoAtaqueTodoMasculino(), locais.localGraficoBloqueioTodoMasculino(), locais.localGraficoLevantamentoTodoMasculino(), locais.localGraficoPasseDefesaTodoMasculino(), locais.localGraficoPasseTodoFeminino(), locais.localGraficoSaqueTodoFemininoTipo(), locais.localGraficoSaqueTodoFeminino(), locais.localGraficoAtaqueTodoFeminino(), locais.localGraficoBloqueioTodoFeminino(), locais.localGraficoLevantamentoTodoFeminino(), locais.localGraficoPasseDefesaTodoFeminino());
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