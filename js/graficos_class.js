import { db } from "./acesso_banco.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
export class Graficos {
    async PasseTime(idTime, nomeTime, localGrafico) {
        const q = query(collection(db, "time"), where("nome", "==", nomeTime));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === idTime) {
                let jogadores = Object.entries(doc.data().jogadores)
                let passeA = 0
                let passeB = 0
                let passeC = 0
                let passeD = 0
                jogadores.forEach((jogador) => {
                    passeA += jogador[1].passe.passe_A
                    passeB += jogador[1].passe.passe_B
                    passeC += jogador[1].passe.passe_C
                    passeD += jogador[1].passe.passe_D
                })
                const canva = document.createElement('canvas')
                canva.id = 'passeChart'
                const titulo = document.createElement("h2")
                titulo.innerHTML = "Passes"
                titulo.className = "titulo_graficos"
                localGrafico.appendChild(titulo)
                localGrafico.appendChild(canva)
                const ctx = document.getElementById("passeChart")
                const data = {
                    labels: [
                        'Passe A',
                        'Passe B',
                        'Passe C',
                        'Passe D'
                    ],
                    datasets: [{
                        label: 'Passes',
                        data: [passeA, passeB, passeC, passeD],
                        backgroundColor: [
                            'rgb(0, 37, 228)',
                            'rgb(2, 183, 86)',
                            'rgb(230, 197, 1)',
                            'rgb(242, 92, 5)'
                        ],
                        hoverOffset: 4
                    }]
                };
                const config = {
                    type: 'pie',
                    data: data,
                };
                new Chart(ctx, config);
            }
        });
    }
    async SaqueTimeTipo(idTime, nomeTime, localGrafico) {
        const q = query(collection(db, "time"), where("nome", "==", nomeTime));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === idTime) {
                let jogadores = Object.entries(doc.data().jogadores)
                let saqueAce = {
                    por_baixo: 0,
                    viagem_fundo_do_mar: 0,
                    flutuante: 0
                }
                let saqueDentro = {
                    por_baixo: 0,
                    viagem_fundo_do_mar: 0,
                    flutuante: 0
                }
                let saqueFora = {
                    por_baixo: 0,
                    viagem_fundo_do_mar: 0,
                    flutuante: 0
                }
                jogadores.forEach((jogador) => {
                    saqueAce.flutuante += jogador[1].saque_dentro.ace.flutuante
                    saqueAce.por_baixo += jogador[1].saque_dentro.ace.por_baixo
                    saqueAce.viagem_fundo_do_mar += jogador[1].saque_dentro.ace.viagem_fundo_do_mar
                    saqueDentro.flutuante += jogador[1].saque_dentro.flutuante
                    saqueDentro.por_baixo += jogador[1].saque_dentro.por_baixo
                    saqueDentro.viagem_fundo_do_mar += jogador[1].saque_dentro.viagem_fundo_do_mar
                    saqueFora.flutuante += jogador[1].saque_fora.flutuante
                    saqueFora.por_baixo += jogador[1].saque_fora.por_baixo
                    saqueFora.viagem_fundo_do_mar += jogador[1].saque_fora.viagem_fundo_do_mar
                })
                const canva = document.createElement('canvas')
                canva.id = 'tipoSaqueChart'
                const titulo = document.createElement("h2")
                titulo.innerHTML = "Tipos de saque"
                titulo.className = "titulo_graficos"
                localGrafico.appendChild(titulo)
                localGrafico.appendChild(canva)
                const ctx = document.getElementById("tipoSaqueChart")
                const data = {
                    labels: [
                        'Por Baixo',
                        'Flutuante',
                        'Viagem'
                    ],
                    datasets: [{
                        label: 'saques ace',
                        data: [saqueAce.por_baixo, saqueAce.flutuante, saqueAce.viagem_fundo_do_mar],
                        fill: true,
                        backgroundColor: 'rgba(0, 37, 228, 0.2)',
                        borderColor: 'rgb(0, 37, 228)',
                        pointBackgroundColor: 'rgb(0, 37, 228)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(0, 37, 228)'
                    }, {
                        label: 'saques dentro nao ace',
                        data: [saqueDentro.por_baixo, saqueDentro.flutuante, saqueDentro.viagem_fundo_do_mar],
                        fill: true,
                        backgroundColor: 'rgba(2, 183, 86, 0.2)',
                        borderColor: 'rgb(2, 183, 86)',
                        pointBackgroundColor: 'rgb(2, 183, 86)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(2, 183, 86)'
                    }, {
                        label: 'saques fora',
                        data: [saqueFora.por_baixo, saqueFora.flutuante, saqueFora.viagem_fundo_do_mar],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(255, 99, 132)'
                    }]
                };
                const config = {
                    type: 'radar',
                    data: data,
                };
                new Chart(ctx, config);
            }
        });
    }
    async SaqueTime(idTime, nomeTime, localGrafico) {
        const q = query(collection(db, "time"), where("nome", "==", nomeTime));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === idTime) {
                let jogadores = Object.entries(doc.data().jogadores)
                let saqueAce = {
                    por_baixo: 0,
                    viagem_fundo_do_mar: 0,
                    flutuante: 0
                }
                let saqueDentro = {
                    por_baixo: 0,
                    viagem_fundo_do_mar: 0,
                    flutuante: 0
                }
                let saqueFora = {
                    por_baixo: 0,
                    viagem_fundo_do_mar: 0,
                    flutuante: 0
                }
                jogadores.forEach((jogador) => {
                    saqueAce.flutuante += jogador[1].saque_dentro.ace.flutuante
                    saqueAce.por_baixo += jogador[1].saque_dentro.ace.por_baixo
                    saqueAce.viagem_fundo_do_mar += jogador[1].saque_dentro.ace.viagem_fundo_do_mar
                    saqueDentro.flutuante += jogador[1].saque_dentro.flutuante
                    saqueDentro.por_baixo += jogador[1].saque_dentro.por_baixo
                    saqueDentro.viagem_fundo_do_mar += jogador[1].saque_dentro.viagem_fundo_do_mar
                    saqueFora.flutuante += jogador[1].saque_fora.flutuante
                    saqueFora.por_baixo += jogador[1].saque_fora.por_baixo
                    saqueFora.viagem_fundo_do_mar += jogador[1].saque_fora.viagem_fundo_do_mar
                })
                let totalSaquesForas = saqueFora.flutuante + saqueFora.por_baixo + saqueFora.viagem_fundo_do_mar
                let totalSaquesDentro = saqueAce.flutuante + saqueAce.por_baixo + saqueAce.viagem_fundo_do_mar + saqueDentro.flutuante + saqueDentro.por_baixo + saqueDentro.viagem_fundo_do_mar;
                const canva = document.createElement('canvas')
                canva.id = 'saqueChart'
                const titulo = document.createElement("h2")
                titulo.innerHTML = "Saques Dentro e Fora"
                titulo.className = "titulo_graficos"
                localGrafico.appendChild(titulo)
                localGrafico.appendChild(canva)
                const ctx = document.getElementById("saqueChart")
                const data = {
                    labels: [
                        'Dentro',
                        'Fora'
                    ],
                    datasets: [{
                        label: 'saques',
                        data: [totalSaquesDentro, totalSaquesForas],
                        backgroundColor: [
                            'rgb(54, 162, 235)',
                            'rgb(255, 99, 132)'
                        ],
                        hoverOffset: 4
                    }]
                };
                const config = {
                    type: 'pie',
                    data: data,
                };
                new Chart(ctx, config);
            }
        });
    }
    async BloqueioTime(idTime, nomeTime, localGrafico) {
        const q = query(collection(db, "time"), where("nome", "==", nomeTime));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === idTime) {
                let jogadores = Object.entries(doc.data().jogadores)
                let pontoDesteTime = 0
                let pontoAdversario = 0
                jogadores.forEach((jogador) => {
                    pontoDesteTime += jogador[1].bloqueio.ponto_bloqueando
                    pontoAdversario += jogador[1].bloqueio.ponto_adversario
                })
                const canva = document.createElement('canvas')
                canva.id = 'bloqueioChart'
                const titulo = document.createElement("h2")
                titulo.innerHTML = "Bloqueios"
                titulo.className = "titulo_graficos"
                localGrafico.appendChild(titulo)
                localGrafico.appendChild(canva)
                const ctx = document.getElementById("bloqueioChart")
                const data = {
                    labels: [
                        'Ponto para este time',
                        'Ponto para o adversário'
                    ],
                    datasets: [{
                        label: 'saques',
                        data: [pontoDesteTime, pontoAdversario],
                        backgroundColor: [
                            'rgb(54, 162, 235)',
                            'rgb(255, 99, 132)'
                        ],
                        hoverOffset: 4
                    }]
                };
                const config = {
                    type: 'pie',
                    data: data,
                };
                new Chart(ctx, config);
            }
        });
    }
    async LevantamentoTime(idTime, nomeTime, localGrafico) {
        const q = query(collection(db, "time"), where("nome", "==", nomeTime));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === idTime) {
                let jogadores = Object.entries(doc.data().jogadores);
                let ponta = 0
                let centro = 0
                let oposto = 0
                let pipe = 0
                let errou = 0
                jogadores.forEach((jogador) => {
                    if (jogador[1].posicao === "Levantador") {
                        ponta += jogador[1].levantou_para.ponta
                        centro += jogador[1].levantou_para.centro
                        oposto += jogador[1].levantou_para.oposto
                        pipe += jogador[1].levantou_para.pipe
                        errou += jogador[1].levantou_para.errou
                    }
                })
                const canva = document.createElement('canvas')
                canva.id = 'levantamentoChart'
                const titulo = document.createElement("h2")
                titulo.innerHTML = "Levantamentos"
                titulo.className = "titulo_graficos"
                localGrafico.appendChild(titulo)
                localGrafico.appendChild(canva)
                const ctx = document.getElementById("levantamentoChart")
                const data = {
                    labels: [
                        'Ponta',
                        'Centro',
                        'Oposto',
                        'Pipe',
                        'Errou'
                    ],
                    datasets: [{
                        label: 'levantamentos',
                        data: [ponta, centro, oposto, pipe, errou],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(75, 192, 192)',
                            'rgb(255, 205, 86)',
                            'rgb(201, 203, 207)',
                            'rgb(54, 162, 235)'
                        ]
                    }]
                }
                const config = {
                    type: 'polarArea',
                    data: data,
                    options: {}
                };
                new Chart(ctx, config);
            }
        });
    }
}