// importando a constante do banco do arquivo
import { db } from "../acesso_banco.js";
// importando as funções necessárias
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// criando a classe graficos
// o Chart é uma função retirada do caminho https://cdn.jsdelivr.net/npm/chart.js referenciado no estatisticas.html
export class Graficos {
    // criando uma função assíncrona, ou seja, que é executada paralelamente, não segue a estrutura
    async InserirGraficosTime(idTime, nomeTime, localGraficoPasse, localGraficoTipoSaque, localGraficoSaqueAcerto, localGraficoAtaque, localGraficoBloqueio, localGraficoLevantamento, localGraficoPasseDefesa) {
        // colocando as condições para a porcura no banco
        nomeTime = nomeTime.split(' (');
        nomeTime = nomeTime[0];
        const q = query(collection(db, "time"), where("nome", "==", nomeTime));
        // tipo um select, onde o q é a condição, o await é para a função esperar o getDocs executar para continuar, pois este é uma promise
        const querySnapshot = await getDocs(q);
        // para cada documento que encontrar, o forEach é para ler arrays, é tipo um for para array
        querySnapshot.forEach((doc) => {
            // verifica se é o time certo pelo id
            if (doc.id === idTime) {
                // transforma o obejeto jogadores em entradas, transforma em array
                let jogadores = Object.entries(doc.data().jogadores);
                // inicializando os passes em zero
                let passeA = 0;
                let passeB = 0;
                let passeC = 0;
                let passeD = 0;
                let defesa = [];
                // inicializando os tipos dos saques em zero
                let saque = {
                    ace: 0,
                    flutuante: 0,
                    viagem: 0,
                    por_cima: 0,
                    fora: 0
                };
                // inicializando os acertos e erros dos ataques em zero
                let ataqueAcertado = 0
                let ataqueErrado = 0
                // inicializando os acertos e erros dos bloqueios em zero
                let pontoDesteTime = 0
                let pontoAdversario = 0
                // inicializando os levantamentos dos bloqueios em zero
                let levantamento = {
                    ponta: 0,
                    centro: 0,
                    oposto: 0,
                    pipe: 0,
                    errou: 0
                }
                // para cada jogador ele incrementará nas variáveis acima o respectivo valor
                jogadores.forEach((jogador) => {
                    defesa.push([jogador[1].nome, jogador[1].defesa])
                    // passes
                    if (jogador[1].posicao !== "Levantador") {
                        passeA += jogador[1].passe.passe_A;
                        passeB += jogador[1].passe.passe_B;
                        passeC += jogador[1].passe.passe_C;
                        passeD += jogador[1].passe.passe_D;
                    }
                    if (jogador[1].posicao !== "Líbero") {
                        // saques tipo
                        saque.flutuante += jogador[1].saque.flutuante;
                        saque.por_cima += jogador[1].saque.por_cima;
                        saque.viagem += jogador[1].saque.viagem;
                        saque.fora += jogador[1].saque.fora;
                        saque.ace += jogador[1].saque.ace;
                        // ataque
                        ataqueAcertado += jogador[1].ataque.acertado
                        ataqueErrado += jogador[1].ataque.errado
                        // bloqueio
                        pontoDesteTime += jogador[1].bloqueio.ponto_bloqueando
                        pontoAdversario += jogador[1].bloqueio.ponto_adversario
                    }
                    if (jogador[1].posicao === "Levantador") {
                        levantamento.ponta += jogador[1].levantou_para.ponta
                        levantamento.centro += jogador[1].levantou_para.centro
                        levantamento.oposto += jogador[1].levantou_para.oposto
                        levantamento.pipe += jogador[1].levantou_para.pipe
                        levantamento.errou += jogador[1].levantou_para.errou
                    }
                })
                // saque acerto
                let acertoSaque = saque.ace + saque.flutuante + saque.por_cima + saque.viagem;
                let erroSaque = saque.fora;
                // Chamando a função para criar o gráfico passe e defesas
                this.GraficoDefesa(defesa, localGraficoPasseDefesa, "criar_grafico_passe_defesa_time");
                // Chamando a função para criar o gráfico passe
                this.GraficoPasses(passeA, passeB, passeC, passeD, localGraficoPasse, "criar_grafico_passe_time");
                // Chamando a função para criar o gráfico tipo do saque acertado
                this.GraficoTipoSaque(saque, localGraficoTipoSaque, "criar_grafico_tipo_saque_time");
                // Chamando a função para criar o gráfico de acerto e erro do saque
                this.GraficoAcertoSaque(acertoSaque, erroSaque, localGraficoSaqueAcerto, "criar_grafico_acerto_saque_time");
                // Chamando a função para criar o gráfico de acerto e erro do ataque
                this.GraficoAtaque(ataqueAcertado, ataqueErrado, localGraficoAtaque, "criar_grafico_ataque_time");
                // Chamando a função para criar o gráfico de acerto e erro do bloqueio
                this.GraficoBloqueio(pontoDesteTime, pontoAdversario, localGraficoBloqueio, "criar_grafico_bloqueio_time");
                // Chamando a função para criar o gráfico de acerto e erro do bloqueio
                this.GraficoLevantamento(levantamento, localGraficoLevantamento, "criar_grafico_levantamento_time");
            }
        });
    }
    // criando uma função assíncrona, ou seja, que é executada paralelamente, não segue a estrutura
    async InserirGraficosJogador(idJogador, nomeJogador, localGraficoPasse, localGraficoTipoSaque, localGraficoSaqueAcerto, localGraficoAtaque, localGraficoBloqueio, localGraficoLevantamento, localGraficoPasseDefesa) {
        // colocando as condições para a porcura no banco
        const q = query(collection(db, "jogador"), where("nome", "==", nomeJogador));
        // tipo um select, onde o q é a condição, o await é para a função esperar o getDocs executar para continuar, pois este é uma promise
        const querySnapshot = await getDocs(q);
        // para cada documento que encontrar, o forEach é para ler arrays, é tipo um for para array
        querySnapshot.forEach((doc) => {
            // verifica se é o jogador certo pelo id
            if (doc.id === idJogador) {
                // Chamando a função para criar o gráfico passe e defesa
                localGraficoPasseDefesa.innerHTML += `<div><h2>Total de defesas: <span>${doc.data().defesa}<span></h2></div>`;
                if (doc.data().posicao !== "Levantador") {
                    // Chamando a função para criar o gráfico passe
                    this.GraficoPasses(doc.data().passe.passe_A, doc.data().passe.passe_B, doc.data().passe.passe_C, doc.data().passe.passe_D, localGraficoPasse, "criar_grafico_passe_jogador");
                    localGraficoPasse.style.display = "block";
                }
                else {
                    localGraficoPasse.style.display = "none";
                }
                // inicializando os tipos dos saques com os valores
                if (doc.data().posicao !== "Líbero") {
                    let saque = {
                        ace: doc.data().saque.ace,
                        flutuante: doc.data().saque.flutuante,
                        viagem: doc.data().saque.viagem,
                        por_cima: doc.data().saque.por_cima,
                        fora: doc.data().saque.fora
                    };
                    // Chamando a função para criar o gráfico tipo do saque acertado
                    this.GraficoTipoSaque(saque, localGraficoTipoSaque, "criar_grafico_tipo_saque_jogador");
                    // Chamando a função para criar o gráfico de acerto e erro do saque
                    this.GraficoAcertoSaque(doc.data().saque.ace + doc.data().saque.flutuante + doc.data().saque.viagem + doc.data().saque.por_cima, doc.data().saque.fora, localGraficoSaqueAcerto, "criar_grafico_acerto_saque_jogador");
                    // Chamando a função para criar o gráfico de acerto e erro do ataque
                    this.GraficoAtaque(doc.data().ataque.acertado, doc.data().ataque.errado, localGraficoAtaque, "criar_grafico_ataque_jogador");
                    // Chamando a função para criar o gráfico de acerto e erro do bloqueio
                    this.GraficoBloqueio(doc.data().bloqueio.ponto_bloqueando, doc.data().bloqueio.ponto_adversario, localGraficoBloqueio, "criar_grafico_bloqueio_jogador");
                    localGraficoTipoSaque.style.display = "block";
                    localGraficoSaqueAcerto.style.display = "block";
                    localGraficoAtaque.style.display = "block";
                    localGraficoBloqueio.style.display = "block";
                } else {
                    localGraficoTipoSaque.style.display = "none";
                    localGraficoSaqueAcerto.style.display = "none";
                    localGraficoAtaque.style.display = "none";
                    localGraficoBloqueio.style.display = "none";
                }
                // Chamando a função para criar o gráfico de acerto e erro do levantamento, caso o jogador seja levantador
                if (doc.data().posicao === "Levantador") {
                    // obtendo os dados do levantamento
                    let levantamentos = {
                        ponta: doc.data().levantou_para.ponta,
                        centro: doc.data().levantou_para.centro,
                        oposto: doc.data().levantou_para.oposto,
                        pipe: doc.data().levantou_para.pipe,
                        errou: doc.data().levantou_para.errou
                    }
                    this.GraficoLevantamento(levantamentos, localGraficoLevantamento, "criar_grafico_levantamento_jogador");
                    // colocando um display no local do gráfico
                    localGraficoLevantamento.style.display = "block";
                }
                // se não for levantador, tirará o display do local do gráfico
                else {
                    // colocando um display no local do gráfico
                    localGraficoLevantamento.style.display = "none";
                }
            }
        });
    }
    // Gráfico para os passes e defesas do time
    GraficoDefesa(defesa, localGrafico, idChart) {
        let total = 0;
        let background = [
            'rgba(255, 99, 132)',
            'rgba(255, 159, 64)',
            'rgba(255, 205, 86)',
            'rgba(75, 192, 192)',
            'rgba(54, 162, 235)',
            'rgba(153, 102, 255)',
            'rgba(201, 203, 207)'
        ]
        let jogadorArray = [];
        let valores = [];
        let cores = [];
        defesa.forEach(jogador => {
            if (jogador[1] > 0) {
                jogadorArray.push(jogador[0]);
                valores.push(jogador[1]);
            }
            total += jogador[1];
        });
        if (jogadorArray.length == background.length)
            cores = background;
        else if (jogadorArray.length < background.length)
            cores = background.slice(0, jogadorArray.length);
        else {
            let rodadas = jogadorArray.length / background.length;
            for (let i = 0; i < rodadas; i++) {
                cores = cores.concat(background);
            }
            let rodadasResto = jogadorArray.length % background.length;
            cores = cores.concat(background.slice(0, rodadasResto));
        }
        localGrafico.innerHTML += `<div><h2>Total de defesas: <span>${total}<span></h2></div>`;
        // criando um h2
        const titulo = document.createElement("h2");
        // colocando o texto no h2
        titulo.innerHTML = "Defesas";
        // colocando a classe
        titulo.className = "titulo_graficos";
        // colocando a tag no html, estando dentro do local do local a vir o gráfico
        localGrafico.appendChild(titulo);
        // verificando se há passes para mostrar
        if (total != 0) {
            // criando um canva
            const canva = document.createElement('canvas');
            // adicionando o id
            canva.id = `${idChart}`;
            //colocando ele no html no local especificado
            localGrafico.appendChild(canva);
            // pegando o id do gráfico
            const ctx = document.getElementById(`${idChart}`);
            // informações a mostrar
            const data = {
                // escrita legenda
                labels: jogadorArray,
                datasets: [{
                    // nome dos valores
                    label: 'defesas',
                    // quantidade dos passes
                    data: valores,
                    // cores a mostrar respectivamente
                    backgroundColor: cores,
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
            // função de criação do gráfico (local, confuguração)
            new Chart(ctx, config);
        }
        // se não hover passe para apresentar, haverá uma mensagem no formato parágrafo
        else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>";

    }
    // Gráfico para os passes do time
    GraficoPasses(passeA, passeB, passeC, passeD, localGrafico, idChart) {
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
            canva.id = `${idChart}`;
            // colocando ele no html no local especificado
            localGrafico.appendChild(canva);
            // pegando o id do gráfico
            const ctx = document.getElementById(`${idChart}`);
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
                        'rgb(242, 92, 5)',
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
            // função de criação do gráfico (local, confuguração)
            new Chart(ctx, config);
        }
        // se não hover passe para apresentar, haverá uma mensagem no formato parágrafo
        else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>";

    }
    // Gráfico para os tipos de saque feitos pelo time 
    GraficoTipoSaque(saque, localGrafico, idChart) {
        // criando um h2
        const titulo = document.createElement("h2");
        // colocando o texto no h2
        titulo.innerHTML = "Tipos de saques acertados";
        // colocando a classe
        titulo.className = "titulo_graficos";
        // colocando a tag no html, estando dentro do local do local a vir o gráfico
        localGrafico.appendChild(titulo);
        // verificando se há saques para mostrar
        if (saque.por_cima != 0 || saque.ace != 0 || saque.flutuante != 0 || saque.viagem != 0 || saque.fora != 0) {
            const canva = document.createElement('canvas');
            // adicionando o id
            canva.id = `${idChart}`;
            // colocando ele no html no local especificado
            localGrafico.appendChild(canva);
            // pegando o id do gráfico
            const ctx = document.getElementById(`${idChart}`);
            // informações a mostrar
            const data = {
                // escrita legenda
                labels: [
                    'Flutuante',
                    'Por Cima',
                    'Viagem',
                    'Ace'
                ],
                datasets: [{
                    // nome dos valores
                    label: 'Saques',
                    // quantidade dos passes
                    data: [saque.flutuante, saque.por_cima, saque.viagem, saque.ace],
                    // cores a mostrar respectivamente
                    backgroundColor: [
                        'rgb(230, 197, 1)',
                        'rgb(242, 92, 5)',
                        'rgb(0, 37, 228)',
                        'rgb(2, 183, 86)'
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
            // função de criação do gráfico (local, confuguração)
            new Chart(ctx, config);
        }
        // se não hover saque para apresentar, haverá uma mensagem no formato parágrafo
        else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>"
    }
    // Gráfico de relação acerto e erro dos saque do time
    // criando uma função assíncrona, ou seja, que é executada paralelamente, não segue a estrutura
    GraficoAcertoSaque(acerto, erro, localGrafico, idChart) {
        // criando um h2
        const titulo = document.createElement("h2");
        // colocando o texto no h2
        titulo.innerHTML = "Saques Dentro e Fora";
        // colocando a classe
        titulo.className = "titulo_graficos";
        // colocando a tag no html, estando dentro do local do local a vir o gráfico
        localGrafico.appendChild(titulo);
        // verificando se há saques para mostrar
        if (acerto != 0 || erro != 0) {
            const canva = document.createElement('canvas');
            // adicionando o id
            canva.id = `${idChart}`;
            // colocando ele no html no local especificado
            localGrafico.appendChild(canva)
            // pegando o id do gráfico
            const ctx = document.getElementById(`${idChart}`)
            const data = {
                // escrita legenda
                labels: [
                    'Dentro',
                    'Fora'
                ],
                datasets: [{
                    // nome dos valores
                    label: 'saques',
                    // quantidade dos acertos e erros 
                    data: [acerto, erro],
                    // cores a mostrar respectivamente
                    backgroundColor: [
                        'rgb(54, 162, 235)',
                        'rgb(255, 99, 132)'
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
            // função de criação do gráfico (local, confuguração)
            new Chart(ctx, config);
        }
        // se não hover saque para apresentar, haverá uma mensagem no formato parágrafo
        else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>"
    }
    // Gráfico de acerto e erro de ataque do time
    GraficoAtaque(ataqueAcertado, ataqueErrado, localGrafico, idChart) {
        // criando um h2
        const titulo = document.createElement("h2")
        // colocando o texto no h2
        titulo.innerHTML = "Ataques"
        // colocando a classe
        titulo.className = "titulo_graficos"
        // colocando a tag no html, estando dentro do local do local a vir o gráfico
        localGrafico.appendChild(titulo);
        // verificando se há ataques para mostrar
        if (ataqueErrado != 0 || ataqueAcertado != 0) {
            const canva = document.createElement('canvas')
            canva.id = `${idChart}`
            localGrafico.appendChild(canva)
            // pegando o id do gráfico
            const ctx = document.getElementById(`${idChart}`)
            const data = {
                // escrita legenda
                labels: [
                    'Acertado',
                    'Errado'
                ],
                datasets: [{
                    // nome dos valores
                    label: 'saques',
                    // quantidade dos acertos e erros 
                    data: [ataqueAcertado, ataqueErrado],
                    backgroundColor: [
                        'rgb(54, 162, 235)',
                        'rgb(255, 99, 132)'
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
            // função de criação do gráfico (local, confuguração)
            new Chart(ctx, config);
        }
        // se não hover ataque para apresentar, haverá uma mensagem no formato parágrafo
        else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>"
    }
    // Gráfico de acerto e erro de bloqueio do time
    GraficoBloqueio(pontoDesteTime, pontoAdversario, localGrafico, idChart) {
        // criando um h2
        const titulo = document.createElement("h2")
        // colocando o texto no h2
        titulo.innerHTML = "Bloqueios"
        // colocando a classe
        titulo.className = "titulo_graficos"
        // colocando a tag no html, estando dentro do local do local a vir o gráfico
        localGrafico.appendChild(titulo);
        // verificando se há bloqueios para mostrar
        if (pontoAdversario != 0 || pontoDesteTime != 0) {
            const canva = document.createElement('canvas')
            canva.id = `${idChart}`
            localGrafico.appendChild(canva)
            // pegando o id do gráfico
            const ctx = document.getElementById(`${idChart}`)
            const data = {
                // escrita legenda
                labels: [
                    'Ponto para este time',
                    'Ponto para o adversário'
                ],
                datasets: [{
                    // nome dos valores
                    label: 'saques',
                    // quantidade dos acertos e erros 
                    data: [pontoDesteTime, pontoAdversario],
                    backgroundColor: [
                        'rgb(54, 162, 235)',
                        'rgb(255, 99, 132)'
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
            // função de criação do gráfico (local, confuguração)
            new Chart(ctx, config);
        }
        // se não hover bloqueio para apresentar, haverá uma mensagem no formato parágrafo
        else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>"
    }
    // Gráfico de levantamento efetuados no time
    GraficoLevantamento(levantamentos, localGrafico, idChart) {
        // criando um h2
        const titulo = document.createElement("h2")
        // colocando o texto no h2
        titulo.innerHTML = "Levantamentos"
        // colocando a classe
        titulo.className = "titulo_graficos"
        // colocando a tag no html, estando dentro do local do local a vir o gráfico
        localGrafico.appendChild(titulo)
        // verificando se há levantamentos para mostrar
        if (levantamentos.ponta != 0 || levantamentos.centro != 0 || levantamentos.oposto != 0 || levantamentos.pipe != 0 || levantamentos.errou != 0) {
            const canva = document.createElement('canvas')
            canva.id = `${idChart}`
            localGrafico.appendChild(canva)
            // pegando o id do gráfico
            const ctx = document.getElementById(`${idChart}`)
            const data = {
                // escrita legenda
                labels: [
                    'Ponta',
                    'Centro',
                    'Oposto',
                    'Pipe',
                    'Errou'
                ],
                datasets: [{
                    // nome dos valores
                    label: 'levantamentos',
                    // quantidade dos respectivos levanatmentos
                    data: [levantamentos.ponta, levantamentos.centro, levantamentos.oposto, levantamentos.pipe, levantamentos.errou],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(75, 192, 192)',
                        'rgb(255, 205, 86)',
                        'rgb(201, 203, 207)',
                        'rgb(54, 162, 235)'
                    ]
                }]
            }
            // configurando o gráfico
            const config = {
                // tipo área polar
                type: 'pie',
                // os valores citados acima
                data: data
            };
            // função de criação do gráfico (local, confuguração)
            new Chart(ctx, config);
        }
        // se não hover levantamento para apresentar, haverá uma mensagem no formato parágrafo
        else localGrafico.innerHTML += "<p>Não há dados disponíveis no momento</p>"
    }
}