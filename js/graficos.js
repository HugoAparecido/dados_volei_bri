// Conexão com o banco de dados
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
const appSettings = {
    databaseURL: "https://voleibri-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const jogadorInDB = ref(database, "jogador")
// transformando os campos em variáveis
const localGrafico = document.getElementById("graficos")
const jogadorSelecionado = document.getElementById("nome")
jogadorSelecionado.addEventListener("change", function () {
    localGrafico.innerHTML = `<canvas id="saqueJogador"></canvas>`
    const ctx = document.getElementById('saqueJogador');
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

    new Chart(ctx, {
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
})