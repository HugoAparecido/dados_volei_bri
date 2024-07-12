// importações necessárias
import { Auth } from "./classes/auth_class.js";
import { Time } from "./classes/time_class.js";
import { informacoes, form } from "./inserir_informacoes.js";
// Elementos htmls
const buttons = {
    logoutButton: () => document.getElementById('logout'),
    botaoDuvidas: () => document.getElementById('botao_duvidas')
}
const duvidas = {
    localDescricao: () => document.getElementById('descricao_botoes')
}
const mostrarTimes = {
    mostrarTimeMasculino: () => document.getElementById("times_masculinos"),
    mostrarTimeFeminino: () => document.getElementById("times_femininos"),
    mostrarTimeMisto: () => document.getElementById("times_misto"),
    mostrarInsercoes: () => document.getElementById("insercoes")
}
// Gerencia de atenticação
let auth = new Auth;
auth.UsuarioNaoLogado();
buttons.logoutButton().addEventListener('click', () => {
    auth.Logout();
})
// Função para Ordenar os times
let time = new Time
time.OrdenarTimesPorSexo(mostrarTimes.mostrarTimeMasculino, mostrarTimes.mostrarTimeFeminino, mostrarTimes.mostrarTimeMisto, mostrarTimes.mostrarInsercoes, informacoes, form)
// mostrar o que significa os labels
buttons.botaoDuvidas().addEventListener("click", () => {
    if (duvidas.localDescricao().style.display === 'none')
        duvidas.localDescricao().style.display = 'block';
    else
        duvidas.localDescricao().style.display = 'none';
})