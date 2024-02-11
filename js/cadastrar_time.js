// importações necessárias
import { Auth } from "./classes/auth_class.js";
import { Time } from "./classes/time_class.js";
// Elementos htmls
const buttons = {
    logoutButton: () => document.getElementById('logout'),
    mostrarButton: () => document.getElementById('mostrar_times')
}
const form = {
    nome: () => document.getElementById('nome_time'),
    sexo: () => document.getElementById('sexo_time'),
    cadastrarTime: () => document.getElementById('cadastrar_time')
}
const locaisalteracoes = {
    mostrarTimesCadastrados: () => document.getElementById('times_cadastrados')
}
// Gerencia de atenticação
let auth = new Auth;
auth.UsuarioNaoLogado();
buttons.logoutButton().addEventListener('click', () => {
    auth.Logout();
})
// Listeners
// selecionar os Sexo por meio do valor da URL
const urlParams = new URLSearchParams(window.location.search);
form.sexo().value = urlParams.get('sexo');
// Cadastrar Time
let time = new Time;
form.cadastrarTime().addEventListener('click', () => {
    time.CadastrarTime(form.nome(), form.sexo());
})
// Mostrar Times
buttons.mostrarButton().addEventListener('click', () => {
    time.MostrarTodosTimes(locaisalteracoes.mostrarTimesCadastrados)
})