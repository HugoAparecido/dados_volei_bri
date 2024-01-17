// Banco de Dados
import { jogadorInDB } from "./acesso_banco.js";
import { onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { Jogador } from "./jogador.js";
// transformando os campos em variáveis
const nomeJogador = document.getElementById("nome_jogador");
const numCamisaJogador = document.getElementById("num_camisa_jogador");
const posicaoJogador = document.getElementById("posicao_jogador");
const sexoJogador = document.getElementById("sexo_jogador");
const alturaJogador = document.getElementById("altura_jogador");
const pesoJogador = document.getElementById("peso_jogador");
const botaoCadastrarJogador = document.getElementById("cadastrar_jogador")
const mostrarJogadoresCadastrados = document.getElementById("jogadores_cadastrados");
const buttonMostrarJogadoresCadastrados = document.getElementById("mostrar_jogadores_cadastrados");
// Ações Botões
botaoCadastrarJogador.addEventListener("click", function () {
    TratarInputTextComoNumber(alturaJogador);
    TratarInputTextComoNumber(pesoJogador);
    let jogador = new Jogador("");
    jogador.CadastrarJogador(nomeJogador.value, numCamisaJogador.value, posicaoJogador.value, sexoJogador.value, alturaJogador.value, pesoJogador.value);
})
buttonMostrarJogadoresCadastrados.addEventListener("click", function () {
    onValue(jogadorInDB, function (snapshot) {
        let jogadoresArray = Object.values(snapshot.val())
        for (let i = 0; i < jogadoresArray.length; i++) {
            if (mostrarJogadoresCadastrados.innerHTML !== "") {
                let jogadorAtual = jogadoresArray[i]
                mostrarJogadoresCadastrados.innerHTML += `<tr><td>${jogadorAtual.nome}</td><td>${jogadorAtual.numero_camisa}</td><td>${jogadorAtual.posicao}</td><td>${jogadorAtual.sexo}</td></tr>`
            }
        }
    })
})
// Funções para evitar erros
function RemoverDepoisDoSegundoCaractere(str, char) { //Função gerada pela IA Bing e adapatada para a aplicação
    var partes = str.split(char);
    if (partes.length <= 2) {
        return str; // O caractere não aparece duas vezes
    }
    return partes[0] + char + partes[1]; // Retorna a string até o segundo caractere
}
function TratarInputTextComoNumber(constInput) {
    constInput.value = RemoverDepoisDoSegundoCaractere(alturaJogador.value, '.')
    constInput.value = RemoverDepoisDoSegundoCaractere(alturaJogador.value, ',')
    constInput.addEventListener('input', function (e) {
        // Verificando se o valor é um número de ponto flutuante
        if (!/^[-+]?[0-9]*\.?[0-9]+$/g.test(this.value)) {
            // Se não for, limpa o valor
            this.value = '';
        }
    });
}