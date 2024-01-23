// importações necessárias
import { Auth } from "./auth_class.js";
import { Time } from "./time_class.js";
// Elementos htmls
const buttons = {
    logoutButton: () => document.getElementById('logout')
}
const mostrarTimes = {
    mostrarTimeMasculino: () => document.getElementById("times_masculinos"),
    mostrarTimeFeminino: () => document.getElementById("times_femininos")
}
// Gerencia de atenticação
let auth = new Auth;
auth.UsuarioNaoLogado();
buttons.logoutButton().addEventListener('click', () => {
    auth.Logout();
})
// Função para Ordenar os times
let time = new Time
time.OrdenarTimesPorSexo(mostrarTimes.mostrarTimeMasculino, mostrarTimes.mostrarTimeFeminino)