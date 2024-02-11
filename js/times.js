// importações necessárias
import { Auth } from "./classes/auth_class.js";
import { Time } from "./classes/time_class.js";
// Elementos htmls
const buttons = {
    logoutButton: () => document.getElementById('logout')
}
const mostrarTimes = {
    mostrarTimeMasculino: () => document.getElementById("times_masculinos"),
    mostrarTimeFeminino: () => document.getElementById("times_femininos"),
    mostrarTimeMisto: () => document.getElementById("times_misto")
}
// Gerencia de atenticação
let auth = new Auth;
auth.UsuarioNaoLogado();
buttons.logoutButton().addEventListener('click', () => {
    auth.Logout();
})
// Função para Ordenar os times
let time = new Time
time.OrdenarTimesPorSexo(mostrarTimes.mostrarTimeMasculino, mostrarTimes.mostrarTimeFeminino, mostrarTimes.mostrarTimeMisto)