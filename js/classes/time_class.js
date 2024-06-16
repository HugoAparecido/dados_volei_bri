import { db } from "../acesso_banco.js";
import { ShowLoading, HideLoading } from "../loading.js";
import { Jogador } from "./jogador_class.js";
import { collection, query, where, updateDoc, addDoc, doc, getDocs, increment, Timestamp, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
export class Time {
    // Cadastrar Time
    async CadastrarTime(nomeConst, sexoConst) {
        ShowLoading();
        try {
            const docRef = await addDoc(collection(db, "time"), {
                nome: String(nomeConst.value),
                sexo: sexoConst.value,
                data_criacao: Timestamp.now(),
                jogadores: {}
            });
            alert("Time cadastrado com sucesso com o ID: " + docRef.id);
            window.location.href = "./times.html";
        } catch (e) {
            alert("Erro ao adicionar o documento: " + e);
        }
        finally {
            HideLoading();
        }
    }
    // Mostrar times em uma tabela
    async MostrarTodosTimes(mostrarTime) {
        ShowLoading();
        try {
            mostrarTime().innerHTML = "";
            const querySnapshot = await getDocs(collection(db, "time"));
            querySnapshot.forEach((doc) => {
                mostrarTime().innerHTML += `<tr>
            <td>${doc.id}</td>
            <td>${doc.data().nome}</td>
            <td>${doc.data().sexo}</td>
            <td>${doc.data().jogadores}</td>
            </tr>`;
            });
        }
        catch (e) {
            alert("Erro: " + e);
        }
        finally {
            HideLoading();
        }
    }
    // Ordenar os times em três colunas (Masculino, Feminino e Misto), sendo botões para exibir as insercoes
    async OrdenarTimesPorSexo(mostrarTimeMasculino, mostrarTimeFeminino, mostrarTimeMisto, localInsercoes, informacoes, form) {
        ShowLoading();
        try {
            // Pegando times do mais velho ao mais recente
            const q = query(collection(db, "time"), orderBy("data_criacao", "desc"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // Masculino
                if (doc.data().sexo == 'M') {
                    let botaoTime = document.createElement('button');
                    botaoTime.id = `${doc.id}`;
                    botaoTime.onclick = () => this.AtivarInsercoes(doc.data().nome, doc.id, localInsercoes, informacoes, form);
                    let link = document.createElement('a');
                    link.target = 'time_selecionado';
                    link.innerHTML = `${doc.data().nome}`;
                    link.className = 'nav-link';
                    botaoTime.appendChild(link);
                    botaoTime.className = 'btn botao_time';
                    mostrarTimeMasculino().appendChild(botaoTime);
                }
                // Feminino
                else if (doc.data().sexo == 'F') {
                    let botaoTime = document.createElement('button');
                    botaoTime.id = `${doc.id}`;
                    botaoTime.onclick = () => this.AtivarInsercoes(doc.data().nome, doc.id, localInsercoes, informacoes, form);
                    let link = document.createElement('a');
                    link.target = 'time_selecionado';
                    link.innerHTML = `${doc.data().nome}`;
                    link.className = 'nav-link';
                    botaoTime.appendChild(link);
                    botaoTime.className = 'btn botao_time';
                    mostrarTimeFeminino().appendChild(botaoTime);
                }
                // Misto
                else {
                    let botaoTime = document.createElement('button');
                    botaoTime.id = `${doc.id}`;
                    botaoTime.onclick = () => this.AtivarInsercoes(doc.data().nome, doc.id, localInsercoes, informacoes, form);
                    let link = document.createElement('a');
                    link.target = 'time_selecionado';
                    link.innerHTML = `${doc.data().nome}`;
                    link.className = 'nav-link';
                    botaoTime.appendChild(link);
                    botaoTime.className = 'btn botao_time';
                    mostrarTimeMisto().appendChild(botaoTime);
                }
            });
        } catch (e) {
            alert(e)
        }
        finally {
            HideLoading();
            // Verificar se a flag foi definida
            if (sessionStorage.getItem('deveClicarNoBotao') === 'true') {
                // Remover a flag para evitar cliques futuros indesejados
                sessionStorage.removeItem('deveClicarNoBotao');
                // Encontrar o botão e clicar nele
                document.getElementById(localStorage.getItem('timeAtualID')).click();
            }
        }
    }
    // Popular tag select com todos os times
    async PopularSelect(localSelect) {
        const querySnapshot = await getDocs(collection(db, "time"));
        querySnapshot.forEach((doc) => {
            localSelect.innerHTML += `<option value="${doc.id}">${doc.data().nome} (${doc.data().sexo})</option>`;
        });
    }
    // Retorna jogadores no time
    async JogadoresNoTime(idTime, nomeTime, mostrarJogador) {
        mostrarJogador.innerHTML = "";
        nomeTime = nomeTime.split(' (');
        nomeTime = nomeTime[0];
        const q = query(collection(db, "time"), where("nome", "==", nomeTime));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === idTime) {
                let jogadores = Object.entries(doc.data().jogadores);
                jogadores.forEach((jogador) => {
                    mostrarJogador.innerHTML += `<option value="${jogador[0]}">${jogador[1].numero}: ${jogador[1].nome} (${jogador[1].posicao})</option>`;
                })
            }
        })
    }
    // Função para a exibição das inserções
    async AtivarInsercoes(nomeTime, idTime, localInsercoes, informacoes, form) {
        localStorage.setItem("timeAtualID", idTime);
        localStorage.setItem("timeAtualNome", nomeTime);
        if (localInsercoes().style.display === 'flex') {
            localInsercoes().style.display = 'none';
            localInsercoes().style.display = 'block';
        } else
            localInsercoes().style.display = 'block';
        let jogador = new Jogador;
        // Populando o cabeçalho
        await this.PopularCabecalhoInserirInformacoes(informacoes.timeExportado(), informacoes.timeSexo());
        // Populando selects
        jogador.PopularNovosJogadores(form.novoJogadorSelecionar());
        // Populando os jogadores e inserções de informações
        jogador.PopularInsercoes(form.colocarJogadoresDoTime());
    }
    // Popular o início para informar o sexo e o nome do time
    async PopularCabecalhoInserirInformacoes(timeExportado, timeSexo) {
        const q = query(collection(db, "time"), where("nome", "==", localStorage.getItem("timeAtualNome")));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === localStorage.getItem("timeAtualID")) {
                timeExportado.innerHTML = `Time: ${doc.data().nome}`;
                timeSexo.innerHTML = `${doc.data().sexo === "M" ? "Sexo: Masculino" : doc.data().sexo === "F" ? "Sexo: Feminino" : "Time Misto"}`;
                localStorage.setItem('sexo', doc.data().sexo);
                let jogadoresExportar = [];
                let jogadores = Object.entries(doc.data().jogadores);
                jogadores.forEach((jogador) => {
                    jogadoresExportar.push({ id: jogador[0], nome: jogador[1].nome });
                })
                localStorage.setItem("jogadores", JSON.stringify(jogadoresExportar));
            }
        });
    }
    // Inserir Jogador no Time
    async InserirJogador(nomeJogador, idJogador) {
        let id = "";
        let posicao_j = "";
        let camisa = "";
        let jogadoresAnteriores = {};
        let novoJogador;
        const q = query(collection(db, "time"), where("nome", "==", localStorage.getItem("timeAtualNome")));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === localStorage.getItem("timeAtualID")) {
                id = doc.id;
                jogadoresAnteriores = doc.data().jogadores;
            }
        });
        const qJogador = query(collection(db, "jogador"), where("nome", "==", nomeJogador));
        const querySnapshotJogador = await getDocs(qJogador);
        querySnapshotJogador.forEach((doc) => {
            if (doc.id === idJogador) {
                camisa = doc.data().numero_camisa;
                posicao_j = doc.data().posicao;
            }
        });
        camisa = camisa === undefined ? "" : camisa;
        novoJogador = {
            nome: nomeJogador,
            numero_camisa: camisa,
            posicao: posicao_j,
            passe: {
                passe_A: 0,
                passe_B: 0,
                passe_C: 0,
                passe_D: 0
            },
            defesa: 0
        };
        if (posicao_j !== "Líbero") {
            novoJogador = {
                ...novoJogador,
                saque: {
                    flutuante: 0,
                    ace: 0,
                    viagem: 0,
                    fora: 0,
                    por_cima: 0
                },
                ataque: {
                    acertado: 0,
                    errado: 0,
                },
                bloqueio: {
                    ponto_adversario: 0,
                    ponto_bloqueando: 0,

                }
            }
        }
        // junção de objetos caso o jogador seja levantador
        if (posicao_j === "Levantador") {
            novoJogador = {
                ...novoJogador,
                ...{
                    levantou_para: {
                        ponta: 0,
                        centro: 0,
                        oposto: 0,
                        pipe: 0,
                        errou: 0
                    }
                }
            };
            delete novoJogador.passe;
        }
        novoJogador = { [idJogador]: novoJogador };
        try {
            const timeDocRef = doc(db, "time", id);
            // junção do jogadores anteriores com este jogador
            await updateDoc(timeDocRef, {
                "jogadores": {
                    ...jogadoresAnteriores,
                    ...novoJogador
                }
            });
            alert('jogador inserido ao time com sucesso!!');
        }
        catch (e) {
            alert("Falha ao cadastrar: " + e);
        }
        finally {
            // Armazenar uma flag
            sessionStorage.setItem('deveClicarNoBotao', 'true');
            window.location.reload()
        }
    }
    // Atualização da defesa no Time
    async AtualizarDefesaJogador(idTime, aIncrementar, idJogador) {
        try {
            let inserirNovamenteID = "";
            const timeDocRef = doc(db, "time", idTime);
            // atualizando os caminhos incrementado os valores com os que eles já tem
            await updateDoc(timeDocRef, {
                [`jogadores.${idJogador}.defesa`]: increment(aIncrementar)
            });
            inserirNovamenteID = await this.VerificarSeEhMisto(idTime, idJogador);
            if (inserirNovamenteID != "") {
                const timeDocRef = doc(db, "time", inserirNovamenteID);
                await updateDoc(timeDocRef, {
                    [`jogadores.${idJogador}.defesa`]: increment(aIncrementar)
                });
            }
        }
        catch (e) {
            alert("Falha ao inserir o Passe: " + e);
        }
    }
    // Atualização dos passe no Time
    async AtualizarPasseJogador(idTime, aIncrementar, idJogador) {
        try {
            let inserirNovamenteID = "";
            // definindo o caminho no banco
            let local = [`jogadores.${idJogador}.passe.passe_A`, `jogadores.${idJogador}.passe.passe_B`, `jogadores.${idJogador}.passe.passe_C`, `jogadores.${idJogador}.passe.passe_D`];
            const timeDocRef = doc(db, "time", idTime);
            // atualizando os caminhos incrementado os valores com os que eles já tem
            await updateDoc(timeDocRef, {
                [local[0]]: increment(aIncrementar[0]),
                [local[1]]: increment(aIncrementar[1]),
                [local[2]]: increment(aIncrementar[2]),
                [local[3]]: increment(aIncrementar[3])
            });
            inserirNovamenteID = await this.VerificarSeEhMisto(idTime, idJogador);
            if (inserirNovamenteID != "") {
                const timeDocRef = doc(db, "time", inserirNovamenteID);
                await updateDoc(timeDocRef, {
                    [local[0]]: increment(aIncrementar[0]),
                    [local[1]]: increment(aIncrementar[1]),
                    [local[2]]: increment(aIncrementar[2]),
                    [local[3]]: increment(aIncrementar[3])
                });
            }
        }
        catch (e) {
            alert("Falha ao inserir o Passe: " + e);
        }
    }
    // Atualização dos saques no Time
    async AtualizarSaqueJogador(idTime, saques, idJogador) {
        try {
            let inserirNovamenteID = "";
            // definindo o caminho no banco
            let local = [
                `jogadores.${idJogador}.saque.flutuante`,
                `jogadores.${idJogador}.saque.ace`,
                `jogadores.${idJogador}.saque.viagem`,
                `jogadores.${idJogador}.saque.por_cima`,
                `jogadores.${idJogador}.saque.fora`,
            ];
            const timeDocRef = doc(db, "time", idTime)
            await updateDoc(timeDocRef, {
                [local[0]]: increment(saques[0]),
                [local[1]]: increment(saques[1]),
                [local[2]]: increment(saques[2]),
                [local[3]]: increment(saques[3]),
                [local[4]]: increment(saques[4])
            });
            inserirNovamenteID = await this.VerificarSeEhMisto(idTime, idJogador);
            if (inserirNovamenteID != "") {
                const timeDocRef = doc(db, "time", inserirNovamenteID)
                await updateDoc(timeDocRef, {
                    [local[0]]: increment(ace[0]),
                    [local[1]]: increment(ace[1]),
                    [local[2]]: increment(ace[2]),
                    [local[3]]: increment(dentro[0]),
                    [local[4]]: increment(dentro[1]),
                    [local[5]]: increment(dentro[2]),
                    [local[6]]: increment(fora[0]),
                    [local[7]]: increment(fora[1]),
                    [local[8]]: increment(fora[2])
                });
            }
        }
        catch (e) {
            alert("Falha ao inserir o Saques: " + e);
        }
    }
    // Atualização do ataque no Time
    async AtualizarAtaqueJogador(idTime, aIncrementar, idJogador) {
        try {
            let inserirNovamenteID = "";
            // definindo o caminho no banco
            let local = [
                `jogadores.${idJogador}.ataque.acertado`,
                `jogadores.${idJogador}.ataque.errado`
            ]
            const timeDocRef = doc(db, "time", idTime);
            // atualizando os caminhos incrementado os valores com os que eles já tem
            await updateDoc(timeDocRef, {
                [local[0]]: increment(aIncrementar[0]),
                [local[1]]: increment(aIncrementar[1]),
            });
            inserirNovamenteID = await this.VerificarSeEhMisto(idTime, idJogador);
            if (inserirNovamenteID != "") {
                const timeDocRef = doc(db, "time", inserirNovamenteID)
                await updateDoc(timeDocRef, {
                    [local[0]]: increment(aIncrementar[0]),
                    [local[1]]: increment(aIncrementar[1]),
                });
            }
        }
        catch (e) {
            alert("Falha ao inserir o Ataque: " + e);
        }
    }
    // Atualização do bloqueio no time
    async AtualizarBloqueioJogador(idTime, acerto, idJogador) {
        try {
            let inserirNovamenteID = "";
            // definindo o caminho no banco
            let local = [
                `jogadores.${idJogador}.bloqueio.ponto_bloqueando`,
                `jogadores.${idJogador}.bloqueio.ponto_adversario`
            ]
            const timeDocRef = doc(db, "time", idTime);
            // atualizando os caminhos incrementado os valores com os que eles já tem
            await updateDoc(timeDocRef, {
                [local[0]]: increment(acerto[0]),
                [local[1]]: increment(acerto[1]),
            });
            inserirNovamenteID = await this.VerificarSeEhMisto(idTime, idJogador);
            if (inserirNovamenteID != "") {
                const timeDocRef = doc(db, "time", inserirNovamenteID)
                await updateDoc(timeDocRef, {
                    [local[0]]: increment(acerto[0]),
                    [local[1]]: increment(acerto[1]),
                });
            }
        }
        catch (e) {
            alert("Falha ao inserir o Bloqueio: " + e);
        }
    }
    // Atualização do Levantamento no Time
    async AtualizarLevantamento(idTime, levantamento, idJogador) {
        try {
            let inserirNovamenteID = "";
            // definindo o caminho no banco
            let local = [
                `jogadores.${idJogador}.levantou_para.centro`,
                `jogadores.${idJogador}.levantou_para.errou`,
                `jogadores.${idJogador}.levantou_para.oposto`,
                `jogadores.${idJogador}.levantou_para.pipe`,
                `jogadores.${idJogador}.levantou_para.ponta`
            ]
            const timeDocRef = doc(db, "time", idTime);
            // atualizando os caminhos incrementado os valores com os que eles já tem
            await updateDoc(timeDocRef, {
                [local[0]]: increment(levantamento[0]),
                [local[1]]: increment(levantamento[1]),
                [local[2]]: increment(levantamento[2]),
                [local[3]]: increment(levantamento[3]),
                [local[4]]: increment(levantamento[4])
            });
            // se o time for misto, os dados também serão inseridos no time anterior de seu respectivo
            inserirNovamenteID = await this.VerificarSeEhMisto(idJogador);
            if (inserirNovamenteID != "") {
                const timeDocRef = doc(db, "time", inserirNovamenteID)
                await updateDoc(timeDocRef, {
                    [local[0]]: increment(levantamento[0]),
                    [local[1]]: increment(levantamento[1]),
                    [local[2]]: increment(levantamento[2]),
                    [local[3]]: increment(levantamento[3]),
                    [local[4]]: increment(levantamento[4])
                });
            }
        }
        catch (e) {
            alert("Falha ao inserir os levantamentos: " + e);
        }
    }
    // Verificação caso o time seja misto para enviar os dados o ultimo time que o jogador jogou correspondente a seu sexo
    async VerificarSeEhMisto(idJogador) {
        // inicializando ava riável com ""
        let idTimeAnterior = ""
        // Se o time for misto, ele retornará o id do time que tem o mesmo sexo que o jogador, e que este participou
        if (localStorage.getItem("sexo") === "Mis") {
            idTimeAnterior = await this.ResultadoQueryUltimoTimeDesteJogador(idJogador)
        }
        return idTimeAnterior
    }
    // Retorno do último time que o jogador jogou
    async ResultadoQueryUltimoTimeDesteJogador(idJogador) {
        let idTime = ""
        const q = query(collection(db, "time"), orderBy("data_criacao"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data().sexo != "Mis") {
                Object.entries(doc.data().jogadores).forEach((jogador) => {
                    if (idJogador == jogador[0]) {
                        idTime = doc.id
                    }
                })
            }
        })
        return idTime
    }
}