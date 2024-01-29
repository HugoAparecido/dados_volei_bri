// importações necessárias
import { Graficos } from "./graficos_class.js"
import { Time } from "./time_class.js"
// Elementos html
// Locais de modificação
const locais = {
    localGraficoSaqueTime: () => document.getElementById("grafico_saque_time"),
    localGraficoPasseTime: () => document.getElementById("grafico_passe_time"),
    localGraficoBloqueioTime: () => document.getElementById("grafico_bloqueio_time"),
    localGraficoLevantamentoTime: () => document.getElementById("grafico_levantamento_time"),
    timeSelecionado: () => document.getElementById("time"),
}
// Botões
const botoes = {
    mostrarGraficos: () => document.getElementById("exibir_graficos")
}
// Pepular Select
let time = new Time
time.PopularSelect(locais.timeSelecionado())
// Mostrar Gráficos
let grafico = new Graficos
botoes.mostrarGraficos().addEventListener('click', () => {
    grafico.PasseTime(locais.timeSelecionado().value, locais.timeSelecionado().options[locais.timeSelecionado().selectedIndex].text, locais.localGraficoPasseTime())
    grafico.SaqueTimeTipo(locais.timeSelecionado().value, locais.timeSelecionado().options[locais.timeSelecionado().selectedIndex].text, locais.localGraficoSaqueTime())
    grafico.SaqueTime(locais.timeSelecionado().value, locais.timeSelecionado().options[locais.timeSelecionado().selectedIndex].text, locais.localGraficoSaqueTime())
    grafico.BloqueioTime(locais.timeSelecionado().value, locais.timeSelecionado().options[locais.timeSelecionado().selectedIndex].text, locais.localGraficoBloqueioTime())
    grafico.LevantamentoTime(locais.timeSelecionado().value, locais.timeSelecionado().options[locais.timeSelecionado().selectedIndex].text, locais.localGraficoLevantamentoTime())
})