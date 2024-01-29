// importações necessárias
import { Graficos } from "./graficos_class.js"
import { Time } from "./time_class.js"
// Elementos htmls
// Locais de modificação
const locais = {
    localGraficoSaqueTime: () => document.getElementById("grafico_saque_time"),
    localGraficoPasseTime: () => document.getElementById("grafico_passe_time"),
    timeSelecionado: () => document.getElementById("time"),
}
const botoes = {
    mostrarGraficos: () => document.getElementById("exibir_graficos")
}
// Pepular Select
let time = new Time
time.PopularSelect(locais.timeSelecionado())
botoes.mostrarGraficos().addEventListener('click', () => { })