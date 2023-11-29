// Conexão com o banco de dados
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
const appSettings = {
    databaseURL: "https://voleibri-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const jogadorInDB = ref(database, "jogador")
// transformando os campos em variáveis
const nomeJogador = document.getElementById("nome_jogador")
const numCamisaJogador = document.getElementById("num_camisa_jogador")
const posicaoJogador = document.getElementById("posicao_jogador")
const sexoJogador = document.getElementById("sexo_jogador")
const alturaJogador = document.getElementById("altura_jogador")
const pesoJogador = document.getElementById("peso_jogador")
const botaoCadastrarJogador = document.getElementById("cadastrar_jogador")
const mostrarJogadoresCadastrados = document.getElementById("jogadores_cadastrados")
const buttonMostrarJogadoresCadastrados = document.getElementById("mostrar_jogadores_cadastrados")
// Ações Botões
botaoCadastrarJogador.addEventListener("click", function () {
    let valorCadastar = {
        nome: nomeJogador.value,
        numero_camisa: numCamisaJogador.value,
        posicao: posicaoJogador.value,
        sexo: sexoJogador.value,
        altura: alturaJogador.value.replace(/,/g, '.'),
        peso: pesoJogador.value.replace(/,/g, '.'),
        saque_fora: {
            por_baixo: 0,
            lateral_asiatico: 0,
            por_cima: 0,
            viagem_fundo_do_mar: 0,
            flutuante: 0,
            hibrido_misto: 0
        },
        saque_dentro: {
            por_baixo: 0,
            lateral_asiatico: 0,
            por_cima: 0,
            viagem_fundo_do_mar: 0,
            flutuante: 0,
            hibrido_misto: 0,
            ace: {
                por_baixo: 0,
                lateral_asiatico: 0,
                por_cima: 0,
                viagem_fundo_do_mar: 0,
                flutuante: 0,
                hibrido_misto: 0
            }
        }, passe: {
            passe_A: 0,
            passe_B: 0,
            passe_C: 0,
            passe_D: 0
        },
        ataque_paralelo: {
            acertado: {
                defendido: 0,
                ponto: 0
            },
            errado: 0
        },
        ataque_diagonal: {
            acertado: {
                defendido: 0,
                ponto: 0
            },
            errado: 0
        }
    };
    if (posicaoJogador.value === "Levantador") {
        valorCadastar = {
            ...valorCadastar,
            ...{
                levantou_para: {
                    ponta: 0,
                    centro: 0,
                    oposto: 0,
                    pipe: 0,
                    errou: 0
                }
            }
        }
    }
    push(jogadorInDB, valorCadastar)
    alert("Jogador Cadastrado com Sucesso")
})
buttonMostrarJogadoresCadastrados.addEventListener("click", function () {
    onValue(jogadorInDB, function (snapshot) {
        let jogadoresArray = Object.values(snapshot.val())
        for (let i = 0; i < jogadoresArray.length; i++) {
            let jogadorAtual = jogadoresArray[i]
            mostrarJogadoresCadastrados.innerHTML += `<tr><td>${jogadorAtual.nome}</td><td>${jogadorAtual.numero_camisa}</td><td>${jogadorAtual.posicao}</td><td>${jogadorAtual.sexo}</td></tr>`
        }
    })
})