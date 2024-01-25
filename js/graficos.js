// importações necessárias
import { Graficos } from "./graficos_class.js"
// Elementos htmls
// Locais de modificação
const locais = {
    localGraficoSaqueJogador: () => document.getElementById("grafico_saque_jogador"),
    localGraficoPasseJogador: () => document.getElementById("grafico_passe_jogador"),
    jogadorSelecionado: () => document.getElementById("nome"),
}
const botoes = {
    mostrarGraficos: () => document.getElementById("exibir_graficos")
}
// para colocar o gráfico
botoes.mostrarGraficos.addEventListener("click", function () {
    localGraficoSaqueJogador.innerHTML = ""
    localGraficoSaqueJogador.innerHTML = `<canvas id="saqueJogador"></canvas>`
    localGraficoSaqueJogador.innerHTML += `<canvas id="saqueJogadorDentroFora"></canvas>`
    const tipoSaqueJogador = document.getElementById('saqueJogador');
    const saqueDentroForaPorcentagem = document.getElementById('saqueJogadorDentroFora');
    localGraficoPasseJogador.innerHTML = ""
    localGraficoPasseJogador.innerHTML = `<canvas id="passeJogador"></canvas>`
    const passePorcentagem = document.getElementById('passeJogador');
    var jogadorAPegarDados = {}
    var idJogador = {}
    onValue(jogadorInDB, function (snapshot) {
        let jogadoresArray = Object.entries(snapshot.val())
        for (let i = 0; i < jogadoresArray.length; i++) {
            let jogadorAtual = jogadoresArray[i]
            if (jogadorAtual[1].nome === jogadorSelecionado.value) {
                idJogador = jogadorAtual[0]
                jogadorAPegarDados = jogadorAtual[1]
            }
        }
    })

    new Chart(tipoSaqueJogador, {
        type: 'radar',
        data: {
            labels: ['Saque Por Baixo',
                'Saque Lateral ou Asiático',
                'Saque Por Cima',
                'Saque Viagem ou Fundo do Mar',
                'Saque Flutuante',
                'Saque Híbrido ou Misto'],
            datasets: [{
                label: 'Saques Dentros',
                data: [jogadorAPegarDados.saque_dentro.por_baixo,
                jogadorAPegarDados.saque_dentro.lateral_asiatico,
                jogadorAPegarDados.saque_dentro.por_cima,
                jogadorAPegarDados.saque_dentro.viagem_fundo_do_mar,
                jogadorAPegarDados.saque_dentro.flutuante,
                jogadorAPegarDados.saque_dentro.hibrido_misto],
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                pointBackgroundColor: 'rgb(75, 192, 192)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(75, 192, 192)'
            }, {
                label: 'Saques Foras',
                data: [jogadorAPegarDados.saque_fora.por_baixo,
                jogadorAPegarDados.saque_fora.lateral_asiatico,
                jogadorAPegarDados.saque_fora.por_cima,
                jogadorAPegarDados.saque_fora.viagem_fundo_do_mar,
                jogadorAPegarDados.saque_fora.flutuante,
                jogadorAPegarDados.saque_fora.hibrido_misto],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }, {
                label: 'Saques ACE',
                data: [jogadorAPegarDados.saque_dentro.ace.por_baixo,
                jogadorAPegarDados.saque_dentro.ace.lateral_asiatico,
                jogadorAPegarDados.saque_dentro.ace.por_cima,
                jogadorAPegarDados.saque_dentro.ace.viagem_fundo_do_mar,
                jogadorAPegarDados.saque_dentro.ace.flutuante,
                jogadorAPegarDados.saque_dentro.ace.hibrido_misto],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            }
        }
    });
    new Chart(saqueDentroForaPorcentagem, {
        type: 'pie',
        data: {
            labels: ['Saques Dentros', 'Saques Fora'],
            datasets: [{
                label: 'Saques',
                data: [
                    jogadorAPegarDados.saque_dentro.por_baixo +
                    jogadorAPegarDados.saque_dentro.lateral_asiatico +
                    jogadorAPegarDados.saque_dentro.por_cima +
                    jogadorAPegarDados.saque_dentro.viagem_fundo_do_mar +
                    jogadorAPegarDados.saque_dentro.flutuante +
                    jogadorAPegarDados.saque_dentro.hibrido_misto +
                    jogadorAPegarDados.saque_dentro.ace.por_baixo +
                    jogadorAPegarDados.saque_dentro.ace.lateral_asiatico +
                    jogadorAPegarDados.saque_dentro.ace.por_cima +
                    jogadorAPegarDados.saque_dentro.ace.viagem_fundo_do_mar +
                    jogadorAPegarDados.saque_dentro.ace.flutuante +
                    jogadorAPegarDados.saque_dentro.ace.hibrido_misto,
                    jogadorAPegarDados.saque_fora.por_baixo +
                    jogadorAPegarDados.saque_fora.lateral_asiatico +
                    jogadorAPegarDados.saque_fora.por_cima +
                    jogadorAPegarDados.saque_fora.viagem_fundo_do_mar +
                    jogadorAPegarDados.saque_fora.flutuante +
                    jogadorAPegarDados.saque_fora.hibrido_misto
                ],
                fill: true,
                backgroundColor: ['rgba(75, 192, 192)', 'rgba(255, 99, 132)'], hoverOffset: 4
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            }
        }
    });
    new Chart(passePorcentagem, {
        type: 'pie',
        data: {
            labels: ['Passe A', 'Passe B', 'Passe C', 'Passe D'],
            datasets: [{
                label: 'Passes',
                data: [
                    jogadorAPegarDados.passe.passe_A, jogadorAPegarDados.passe.passe_B, jogadorAPegarDados.passe.passe_C, jogadorAPegarDados.passe.passe_D
                ],
                fill: true,
                backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 205, 86)', 'rgb(255, 159, 64)', 'rgb(255, 99, 132)'], hoverOffset: 4
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            }
        }
    });
})