// importando a constante do banco do arquivo
import { db } from "../acesso_banco.js";
// importando as funções necessárias
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
export class Graficos {
    // Gráfico para os passes do time
    // criando uma função assíncrona, ou seja, que é executada paralelamente, não segue a estrutura
    async PasseTime(idTime, nomeTime, localGrafico) {
        // colocando as condições para a porcura no banco
        const q = query(collection(db, "time"), where("nome", "==", nomeTime));
        // tipo um select, onde o q é a condição, o await é para a função esperar o getDocs executar para continuar, pois este é um promise
        const querySnapshot = await getDocs(q);
        // para cada documento que encontrar, o forEach é para ler arrays, é tipo um for
        querySnapshot.forEach((doc) => {
            // verifica se é o jogador certo pelo id
            if (doc.id === idTime) {
                // transforma o obejeto jogadores em entradas, transforma em array
                let jogadores = Object.entries(doc.data().jogadores);
                // inicializando os passes em zero
                let passeA = 0;
                let passeB = 0;
                let passeC = 0;
                let passeD = 0;
                // para cada jogador ele incrementará nas variáveis acima o respectivo valor
                jogadores.forEach((jogador) => {
                    passeA += jogador[1].passe.passe_A;
                    passeB += jogador[1].passe.passe_B;
                    passeC += jogador[1].passe.passe_C;
                    passeD += jogador[1].passe.passe_D;
                })
                // criando um h2
                const titulo = document.createElement("h2");
                // colocando o texto no h2
                titulo.innerHTML = "Passes";
                // colocando a classe
                titulo.className = "titulo_graficos";
                // colocando a tag no html, estando dentro do local do local a vir o gráfico
                localGrafico.appendChild(titulo);
                // verificando se há passes para mostrar
                if (passeA != 0 || passeB != 0 || passeC != 0 || passeD != 0) {
                    // criando um canva
                    const canva = document.createElement('canvas');
                    // adicionando o id
                    canva.id = 'passeChart';
                    // colocando ele no html no local especificado
                    localGrafico.appendChild(canva);
                    // pegando o id do gráfico
                    const ctx = document.getElementById("passeChart");
                    // informações a mostrar
                    const data = {
                        // escrita legenda
                        labels: [
                            'Passe A',
                            'Passe B',
                            'Passe C',
                            'Passe D'
                        ],
                        datasets: [{
                            // nome dos valores
                            label: 'Passes',
                            // quantidade dos passes
                            data: [passeA, passeB, passeC, passeD],
                            // cores a mostrar respectivamente
                            backgroundColor: [
                                'rgb(0, 37, 228)',
                                'rgb(2, 183, 86)',
                                'rgb(230, 197, 1)',
                                'rgb(242, 92, 5)'
                            ],
                            hoverOffset: 4
                        }]
                    };
                    // configurando o gráfico
                    const config = {
                        // tipo pizza ou setores
                        type: 'pie',
                        // os valores citados acima
                        data: data,
                    };
                    new Chart(ctx, config);
                }
                // se não hover passse para apresentar, haverá uma mensagem no formato parágrafo
                else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>";
            }
        });
    }
    // Gráfico para os tipos de saque feitos pelo time
    async SaqueTimeTipo(idTime, nomeTime, localGrafico) {
        // colocando as condições para a porcura no banco
        const q = query(collection(db, "time"), where("nome", "==", nomeTime));
        // tipo um select, onde o q é a condição, o await é para a função esperar o getDocs executar para continuar, pois este é um promise
        const querySnapshot = await getDocs(q);
        // para cada documento que encontrar, o forEach é para ler arrays, é tipo um for
        querySnapshot.forEach((doc) => {
            // verifica se é o jogador certo pelo id
            if (doc.id === idTime) {
                // transforma o obejeto jogadores em entradas, transforma em array
                let jogadores = Object.entries(doc.data().jogadores);
                // inicializando os saques em zero
                let saque = {
                    ace: 0,
                    flutuante: 0,
                    viagem: 0,
                    por_cima: 0,
                    fora: 0
                };
                // para cada jogador ele incrementará nas variáveis acima o respectivo valor
                jogadores.forEach((jogador) => {
                    saque.flutuante += jogador[1].saque.flutuante;
                    saque.por_cima += jogador[1].saque.por_cima;
                    saque.viagem += jogador[1].saque.viagem;
                    saque.fora += jogador[1].saque.fora;
                    saque.ace += jogador[1].saque.ace;
                });
                // criando um h2
                const titulo = document.createElement("h2");
                // colocando o texto no h2
                titulo.innerHTML = "Tipos de saque";
                // colocando a classe
                titulo.className = "titulo_graficos";
                // colocando a tag no html, estando dentro do local do local a vir o gráfico
                localGrafico.appendChild(titulo);
                if (saqueAce.por_baixo != 0 || saqueAce.viagem_fundo_do_mar != 0 || saqueAce.flutuante != 0 || saqueDentro.por_baixo != 0 || saqueDentro.flutuante != 0 || saqueDentro.viagem_fundo_do_mar != 0 || saqueFora.por_baixo != 0 || saqueFora.flutuante != 0 || saqueFora.viagem_fundo_do_mar != 0) {
                    const canva = document.createElement('canvas')
                    // adicionando o id
                    canva.id = 'tipoSaqueChartTime'
                    localGrafico.appendChild(canva)
                    const ctx = document.getElementById("tipoSaqueChartTime")
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
                else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>"
            }
        });
    }
    // Gráfico de relação acerto e erro dos saque do time
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
                const titulo = document.createElement("h2")
                titulo.innerHTML = "Saques Dentro e Fora"
                titulo.className = "titulo_graficos"
                // colocando a tag no html, estando dentro do local do local a vir o gráfico
                localGrafico.appendChild(titulo);
                if (totalSaquesDentro != 0 || totalSaquesForas != 0) {
                    const canva = document.createElement('canvas')
                    canva.id = 'saqueChartTime'
                    localGrafico.appendChild(canva)
                    const ctx = document.getElementById("saqueChartTime")
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
                else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>"
            }
        });
    }
    // Gráfico de acerto e erro de bloqueio do time
    async AtaqueTime(idTime, nomeTime, localGrafico) {
        const q = query(collection(db, "time"), where("nome", "==", nomeTime));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === idTime) {
                let jogadores = Object.entries(doc.data().jogadores)
                let ataqueAcertado = 0
                let ataqueErrado = 0
                jogadores.forEach((jogador) => {
                    ataqueAcertado += jogador[1].ataque.acertado
                    ataqueErrado += jogador[1].ataque.errado
                })
                const titulo = document.createElement("h2")
                titulo.innerHTML = "Ataques"
                titulo.className = "titulo_graficos"
                // colocando a tag no html, estando dentro do local do local a vir o gráfico
                localGrafico.appendChild(titulo);
                if (ataqueErrado != 0 || ataqueAcertado != 0) {
                    const canva = document.createElement('canvas')
                    canva.id = 'ataqueChartTime'
                    localGrafico.appendChild(canva)
                    const ctx = document.getElementById("ataqueChartTime")
                    const data = {
                        labels: [
                            'Acertado',
                            'Errado'
                        ],
                        datasets: [{
                            label: 'saques',
                            data: [ataqueAcertado, ataqueErrado],
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
                else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>"
            }
        });
    }
    // Gráfico de acerto e erro de bloqueio do time
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
                const titulo = document.createElement("h2")
                titulo.innerHTML = "Bloqueios"
                titulo.className = "titulo_graficos"
                // colocando a tag no html, estando dentro do local do local a vir o gráfico
                localGrafico.appendChild(titulo);
                if (pontoAdversario != 0 || pontoDesteTime != 0) {
                    const canva = document.createElement('canvas')
                    canva.id = 'bloqueioChartTime'
                    localGrafico.appendChild(canva)
                    const ctx = document.getElementById("bloqueioChartTime")
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
                else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>"
            }
        });
    }
    // Gráfico de levantamento efetuados no time
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
                const titulo = document.createElement("h2")
                titulo.innerHTML = "Levantamentos"
                titulo.className = "titulo_graficos"
                localGrafico.appendChild(titulo)
                if (ponta != 0 || centro != 0 || oposto != 0 || pipe != 0 || errou != 0) {
                    const canva = document.createElement('canvas')
                    canva.id = 'levantamentoChartTime'
                    localGrafico.appendChild(canva)
                    const ctx = document.getElementById("levantamentoChartTime")
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
                else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>"
            }
        });
    }
    // gráfico para os passe do jogador feito em todos os jogos
    async PasseJogador(idJogador, nomeJogador, localGrafico) {
        const q = query(collection(db, "jogador"), where("nome", "==", nomeJogador));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === idJogador) {
                let passeA = doc.data().passe.passe_A
                let passeB = doc.data().passe.passe_B
                let passeC = doc.data().passe.passe_C
                let passeD = doc.data().passe.passe_D
                const titulo = document.createElement("h2")
                titulo.innerHTML = "Passes"
                titulo.className = "titulo_graficos"
                // colocando a tag no html, estando dentro do local do local a vir o gráfico
                localGrafico.appendChild(titulo);
                if (passeA != 0 || passeB != 0 || passeC != 0 || passeD != 0) {
                    const canva = document.createElement('canvas')
                    canva.id = 'passeChartJogador'
                    localGrafico.appendChild(canva)
                    const ctx = document.getElementById("passeChartJogador")
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
                else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>"
            }
        });
    }
    // gráfico para os tipos de saque do jogador feito em todos os jogos
    async TipoSaqueJogador(idJogador, nomeJogador, localGrafico) {
        const q = query(collection(db, "jogador"), where("nome", "==", nomeJogador));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === idJogador) {
                let saqueAce = {
                    por_baixo: doc.data().saque_dentro.ace.por_baixo,
                    viagem_fundo_do_mar: doc.data().saque_dentro.ace.viagem_fundo_do_mar,
                    flutuante: doc.data().saque_dentro.ace.flutuante
                }
                let saqueDentro = {
                    por_baixo: doc.data().saque_dentro.por_baixo,
                    viagem_fundo_do_mar: doc.data().saque_dentro.viagem_fundo_do_mar,
                    flutuante: doc.data().saque_dentro.flutuante
                }
                let saqueFora = {
                    por_baixo: doc.data().saque_fora.por_baixo,
                    viagem_fundo_do_mar: doc.data().saque_fora.viagem_fundo_do_mar,
                    flutuante: doc.data().saque_fora.flutuante
                }
                const titulo = document.createElement("h2")
                titulo.innerHTML = "Tipos de saque"
                titulo.className = "titulo_graficos"
                // colocando a tag no html, estando dentro do local do local a vir o gráfico
                localGrafico.appendChild(titulo);
                if (saqueAce.por_baixo != 0 || saqueAce.viagem_fundo_do_mar != 0 || saqueAce.flutuante != 0 || saqueDentro.por_baixo != 0 || saqueDentro.flutuante != 0 || saqueDentro.viagem_fundo_do_mar != 0 || saqueFora.por_baixo != 0 || saqueFora.flutuante != 0 || saqueFora.viagem_fundo_do_mar != 0) {
                    const canva = document.createElement('canvas')
                    canva.id = 'tipoSaqueChartJogador'
                    localGrafico.appendChild(canva)
                    const ctx = document.getElementById("tipoSaqueChartJogador")
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
                } else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>"
            }
        });
    }
    // gráfico para os saque do jogador em relação acerto e erro feito em todos os jogos
    async SaqueJogador(idJogador, nomeJogador, localGrafico) {
        const q = query(collection(db, "jogador"), where("nome", "==", nomeJogador));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === idJogador) {
                let saqueAce = {
                    por_baixo: doc.data().saque_dentro.ace.por_baixo,
                    viagem_fundo_do_mar: doc.data().saque_dentro.ace.viagem_fundo_do_mar,
                    flutuante: doc.data().saque_dentro.ace.flutuante
                }
                let saqueDentro = {
                    por_baixo: doc.data().saque_dentro.por_baixo,
                    viagem_fundo_do_mar: doc.data().saque_dentro.viagem_fundo_do_mar,
                    flutuante: doc.data().saque_dentro.flutuante
                }
                let saqueFora = {
                    por_baixo: doc.data().saque_fora.por_baixo,
                    viagem_fundo_do_mar: doc.data().saque_fora.viagem_fundo_do_mar,
                    flutuante: doc.data().saque_fora.flutuante
                }
                const titulo = document.createElement("h2")
                titulo.innerHTML = "Saques Dentro e Fora"
                titulo.className = "titulo_graficos"
                localGrafico.appendChild(titulo)
                let totalSaquesForas = saqueFora.flutuante + saqueFora.por_baixo + saqueFora.viagem_fundo_do_mar
                let totalSaquesDentro = saqueAce.flutuante + saqueAce.por_baixo + saqueAce.viagem_fundo_do_mar + saqueDentro.flutuante + saqueDentro.por_baixo + saqueDentro.viagem_fundo_do_mar;
                if (totalSaquesDentro != 0 || totalSaquesForas != 0) {
                    const canva = document.createElement('canvas')
                    canva.id = 'saqueChartJogador'
                    // colocando a tag no html, estando dentro do local do local a vir o gráfico
                    localGrafico.appendChild(canva);
                    const ctx = document.getElementById("saqueChartJogador")
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
                else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>"
            }
        });
    }
    // gráfico para os bloqueios do jogador feito em todos os jogos
    async AtaqueJogador(idJogador, nomeJogador, localGrafico) {
        const q = query(collection(db, "jogador"), where("nome", "==", nomeJogador));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === idJogador) {
                let ataqueAcertado = doc.data().ataque.acertado
                let ataqueErrado = doc.data().ataque.errado
                const titulo = document.createElement("h2")
                titulo.innerHTML = "Ataques"
                titulo.className = "titulo_graficos"
                localGrafico.appendChild(titulo)
                if (ataqueErrado != 0 || ataqueAcertado != 0) {
                    const canva = document.createElement('canvas')
                    canva.id = 'ataqueChartJogador'
                    // colocando a tag no html, estando dentro do local do local a vir o gráfico
                    localGrafico.appendChild(canva);
                    const ctx = document.getElementById("ataqueChartJogador")
                    const data = {
                        labels: [
                            'Acertado',
                            'errado'
                        ],
                        datasets: [{
                            label: 'saques',
                            data: [ataqueAcertado, ataqueErrado],
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
                else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>"
            }
        });
    }
    // gráfico para os bloqueios do jogador feito em todos os jogos
    async BloqueioJogador(idJogador, nomeJogador, localGrafico) {
        const q = query(collection(db, "jogador"), where("nome", "==", nomeJogador));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === idJogador) {
                let pontoDesteJogador = doc.data().bloqueio.ponto_bloqueando
                let pontoAdversario = doc.data().bloqueio.ponto_adversario
                const titulo = document.createElement("h2")
                titulo.innerHTML = "Bloqueios"
                titulo.className = "titulo_graficos"
                localGrafico.appendChild(titulo)
                if (pontoAdversario != 0 || pontoDesteJogador != 0) {
                    const canva = document.createElement('canvas')
                    canva.id = 'bloqueioChartJogador'
                    // colocando a tag no html, estando dentro do local do local a vir o gráfico
                    localGrafico.appendChild(canva);
                    const ctx = document.getElementById("bloqueioChartJogador")
                    const data = {
                        labels: [
                            'Ponto para este Jogador',
                            'Ponto para o adversário'
                        ],
                        datasets: [{
                            label: 'saques',
                            data: [pontoDesteJogador, pontoAdversario],
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
                else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>"
            }
        });
    }
    // gráfico para os levantamentos do jogador feito em todos os jogos
    async LevantamentoJogador(idJogador, nomeJogador, localGrafico) {
        const q = query(collection(db, "jogador"), where("nome", "==", nomeJogador));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === idJogador && doc.data().posicao === "Levantador") {
                let ponta = doc.data().levantou_para.ponta
                let centro = doc.data().levantou_para.centro
                let oposto = doc.data().levantou_para.oposto
                let pipe = doc.data().levantou_para.pipe
                let errou = doc.data().levantou_para.errou
                const titulo = document.createElement("h2")
                titulo.innerHTML = "Levantamentos"
                titulo.className = "titulo_graficos"
                localGrafico.appendChild(titulo)
                if (ponta != 0 || centro != 0 || oposto != 0 || pipe != 0 || errou != 0) {
                    const canva = document.createElement('canvas')
                    canva.id = 'levantamentoChartJogador'
                    // colocando a tag no html, estando dentro do local do local a vir o gráfico
                    localGrafico.appendChild(canva);
                    const ctx = document.getElementById("levantamentoChartJogador")
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
                else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>"
            }
        });
    }
}