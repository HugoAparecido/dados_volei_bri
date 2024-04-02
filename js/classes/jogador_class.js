import { db } from "../acesso_banco.js";
import { ShowLoading, HideLoading } from "../loading.js";
import { collection, query, where, doc, orderBy, addDoc, getDocs, increment, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { Time } from "./time_class.js";
import { Componentes } from "./componentes.js";
export class Jogador {
    // Cadastrar Jogador
    async CadastrarJogador(nomeConst, sexoConst, numeroCamisa, posicaoConst, alturaConst, pesoConst) {
        // iniciando o loading
        ShowLoading();
        // fazendo o objeto jogador e inicializando os atributos em 0
        let atributos = {
            nome: nomeConst,
            numero_camisa: numeroCamisa,
            posicao: posicaoConst,
            sexo: sexoConst,
            altura: alturaConst,
            peso: pesoConst, passe: {
                passe_A: 0,
                passe_B: 0,
                passe_C: 0,
                passe_D: 0
            },
            defesa: 0
        };
        if (posicaoConst !== "Líbero") {
            atributos = {
                ...atributos,
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
        // Se a posição for a de levantador o objeto anterior se junta com atributos de levantador
        if (posicaoConst === "Levantador") {
            // juntando os atributos com o objeto levantamento
            atributos = {
                ...atributos,
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
            delete atributos.passe;
        }
        // tratando
        try {
            // "insert" no banco
            const docRef = await addDoc(collection(db, "jogador"), atributos);
            // alertando que deu certo
            alert("Jogador cadastrado com sucesso com o ID: " + docRef.id);
            // desativando o loading
            HideLoading();
            // recarregando a página para zerar os input
            window.location.reload();
            //capturando caso der erro
        } catch (e) {
            // exibição do erro
            alert("Erro ao adicionar o documento: " + e);
            // desativando o loading
            HideLoading();
        }
    }
    // Mostragem Geral em Tabela dos jogadores
    async MostrarTodosJogadores(mostrarJogador) {
        // zerando o html do mostrar jogador
        mostrarJogador().innerHTML = ""
        // tipo um ordenado todos os jogadores pelo nome
        const q = query(collection(db, "jogador"), orderBy("nome"));
        // "SELECT" com ordenação citada acima
        const querySnapshot = await getDocs(q);
        // percorrendo o array, for para arrays
        querySnapshot.forEach((doc) => {
            // Fazendo uma linha na tabela
            mostrarJogador().innerHTML += new Componentes().TabelaJogadores(doc.id, doc.data().nome, doc.data().numero_camisa, doc.data().posicao, doc.data().sexo)
        });
    }
    // Colocar Todos os jogadores em um select
    async MostrarTodosJogadoresSelect(mostrarJogador) {
        // ativando o loading
        ShowLoading();
        // tipo um ordenando todos os jogadores pelo nome
        const q = query(collection(db, "jogador"), orderBy("nome"));
        // "select" com ordenação citada acima 
        const querySnapshot = await getDocs(q);
        // for para arrays
        querySnapshot.forEach((doc) => {
            // adicinando option no select citado
            mostrarJogador.innerHTML += new Componentes().SelectJogadores(doc.id, doc.data().numero_camisa, doc.data().nome, doc.data().posicao)
        });
        // encerrando o loading
        HideLoading();
    }
    // Colocar os jogadores que não pertencem a um time, além de colocar somente se o sexo do jogador for igual ao do Time, caso seja misto, aparecerão todos os jogadores
    async PopularNovosJogadores(adicionarJogador) {
        // zerando o html do local
        adicionarJogador.innerHTML = '';
        // pegando o valor do sexo armazenado no armazenamento local do navegador e verificando se não é misto
        if (localStorage.getItem("sexo") != "Mis") {
            // "WHERE" para pegar todos os jogadores com o mesmo sexo do time e ordena-os pelo nome
            const q = query(collection(db, "jogador"), where("sexo", "==", localStorage.getItem("sexo")), orderBy("nome"));
            // "SELECT" que retorna o array com os valores
            const querySnapshot = await getDocs(q);
            // percorrendo o array
            querySnapshot.forEach((doc) => {
                // se o jogador não estiver no time, ele será adicionado ao select
                if (!localStorage.getItem("jogadores").includes(doc.id)) {
                    adicionarJogador.innerHTML += new Componentes().SelectJogadores(doc.id, doc.data().numero_camisa, doc.data().nome, doc.data().posicao);
                }
            })
        } else {
            // pega todos os jogadores e ordena-os pelo nome
            const q = query(collection(db, "jogador"), orderBy("nome"));
            // "SELECT" que retorna o array com os valores
            const querySnapshot = await getDocs(q);
            // percorrendo o array
            querySnapshot.forEach((doc) => {
                // se o jogador não estiver no time, ele será adicionado ao select
                if (!localStorage.getItem("jogadores").includes(doc.id)) {
                    adicionarJogador.innerHTML += new Componentes().SelectJogadores(doc.id, doc.data().numero_camisa, doc.data().nome, doc.data().posicao);
                }
            })
        }
    }
    // Puxar informações do jogador e inseri-las no form para um possível Update
    async PopularFormCadastro(idJogador, nomeJogador, numeroCamisa, posicao, sexo, altura, peso, dadosLevantador, dadosLibero) {
        const qJogador = query(collection(db, "jogador"), where("nome", "==", nomeJogador));
        const querySnapshotJogador = await getDocs(qJogador);
        querySnapshotJogador.forEach((doc) => {
            if (idJogador === doc.id) {
                numeroCamisa.value = doc.data().numero_camisa;
                posicao.value = doc.data().posicao;
                sexo.value = doc.data().sexo;
                altura.value = doc.data().altura;
                peso.value = doc.data().peso;
                if (doc.data().posicao === "Levantador") {
                    dadosLevantador = true;
                }
                if (doc.data().posicao === "Líbero") {
                    dadosLibero = true;
                }
            }
        })
    }
    // Update do Jogador
    async AtualizarJogador(idJogador, nomeJogador, novoNome, numeroCamisa, posicao, sexo, altura, peso, dadosLevantador, dadosLibero) {
        ShowLoading();
        try {
            if (nomeJogador != "") {
                const timeDocRef = doc(db, "jogador", idJogador);
                await updateDoc(timeDocRef, {
                    "nome": novoNome === "" ? nomeJogador : novoNome,
                    "numero_camisa": numeroCamisa,
                    "posicao": posicao,
                    "sexo": sexo,
                    "altura": altura,
                    "peso": peso
                });
                if (!dadosLevantador && posicao === "Levantador") {
                    await updateDoc(timeDocRef, {
                        "levantou_para": {
                            ponta: 0,
                            centro: 0,
                            oposto: 0,
                            pipe: 0,
                            errou: 0
                        }
                    });
                }
                if (dadosLibero && posicao != "Líbero") {
                    await updateDoc(timeDocRef, {
                        "saque": {
                            flutuante: 0,
                            ace: 0,
                            viagem: 0,
                            fora: 0,
                            por_cima: 0
                        },
                        "ataque": {
                            acertado: 0,
                            errado: 0,
                        },
                        "bloqueio": {
                            ponto_adversario: 0,
                            ponto_bloqueando: 0,
                        }
                    });
                }
                alert("Atualização Bem sucedida!!!");
            }
            else alert("é necessário escolher um jogador");
        }
        catch (e) {
            alert(e);
        }
        HideLoading();
    }
    // Popular com a iserção de passes conforme os jogadores inseridos no time
    async PopularInsercoes(colocarJogadoresDoTime) {
        ShowLoading();
        colocarJogadoresDoTime.innerHTML = "";
        let nomes = [];
        let id = [];
        let jogadores = JSON.parse(localStorage.getItem("jogadores"));
        if (jogadores.length != 0) {
            jogadores.forEach((jogador) => {
                id.push(Object.entries(jogador)[0][1]);
                nomes.push(jogador.nome);
            })
            const q = query(collection(db, "jogador"), where("nome", "in", nomes), orderBy("nome"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (id.includes(doc.id)) {
                    colocarJogadoresDoTime.innerHTML += new Componentes().DivJogador(doc.id, doc.data().posicao, doc.data().numero_camisa, doc.data().nome);
                }
            });
        }
        HideLoading()
    }
    // Atualização de todas as informações de todos os jogadores presentes
    async AtualizarInformacoesDeTodosJogadores() {
        ShowLoading();
        let nomes = [];
        let id = [];
        let time = new Time;
        let jogadores = JSON.parse(localStorage.getItem("jogadores"));
        jogadores.forEach((jogador) => {
            id.push(Object.entries(jogador)[0][1]);
            nomes.push(jogador.nome);
        })
        const q = query(collection(db, "jogador"), where("nome", "in", nomes));
        const querySnapshot = await getDocs(q);
        try {
            querySnapshot.forEach((doc) => {
                if (id.includes(doc.id)) {
                    // pegando os valores dos campos
                    this.AtualizarDefesaJogador(doc.id, document.getElementById(`${doc.id}_defesa`).value);
                    if (doc.data().posicao !== "Líbero") {
                        // saques
                        this.AtualizarSaqueJogador(doc.id, [
                            document.getElementById(`${doc.id}_saque_flutuante`).value,
                            document.getElementById(`${doc.id}_saque_ace`).value,
                            document.getElementById(`${doc.id}_saque_viagem`).value,
                            document.getElementById(`${doc.id}_saque_por_cima`).value,
                            document.getElementById(`${doc.id}_saque_fora`).value
                        ]);
                        // ataques
                        this.AtualizarAtaqueJogador(doc.id, [
                            document.getElementById(`${doc.id}_ataque_acerto`).value,
                            document.getElementById(`${doc.id}_ataque_erro`).value
                        ]);
                        // bloqueio
                        this.AtualizarBloqueioJogador(doc.id, [
                            document.getElementById(`${doc.id}_bloqueio_ponto_este`).value,
                            document.getElementById(`${doc.id}_bloqueio_ponto_adversario`).value
                        ]);
                    }
                    if (doc.data().posicao !== "Levantador") {
                        // passes
                        this.AtualizarPasseJogador(doc.id, [
                            document.getElementById(`${doc.id}_passe_A`).value,
                            document.getElementById(`${doc.id}_passe_B`).value,
                            document.getElementById(`${doc.id}_passe_C`).value,
                            document.getElementById(`${doc.id}_passe_D`).value,
                        ]);
                    } else {
                        this.AtualizarLevantamento(doc.id, [
                            document.getElementById(`${doc.id}_levantamento_centro`).value,
                            document.getElementById(`${doc.id}_levantamento_errou`).value,
                            document.getElementById(`${doc.id}_levantamento_oposto`).value,
                            document.getElementById(`${doc.id}_levantamento_pipe`).value,
                            document.getElementById(`${doc.id}_levantamento_ponta`).value
                        ]);
                    }
                }
            });
            alert("dados atualizados!!");
        }
        catch (e) {
            alert("Falha nas inserções: " + e)
        }
        HideLoading();
        // window.location.reload();
    }
    // Atualização defesa jogador
    async AtualizarDefesaJogador(id, aIncrementar) {
        try {
            const timeDocRef = doc(db, "jogador", id)
            await updateDoc(timeDocRef, {
                "defesa": increment(aIncrementar)
            });
            await new Time().AtualizarDefesaJogador(localStorage.getItem("timeAtualID"), aIncrementar, id);
        }
        catch (e) {
            alert("Falha ao inserir Passe: " + e)
        }
    }
    // Atualização do passe de somente um jogador
    async AtualizarPasseJogador(id, aIncrementar) {
        try {
            const timeDocRef = doc(db, "jogador", id)
            await updateDoc(timeDocRef, {
                "passe.passe_A": increment(aIncrementar[0]),
                "passe.passe_B": increment(aIncrementar[1]),
                "passe.passe_C": increment(aIncrementar[2]),
                "passe.passe_D": increment(aIncrementar[3])
            });
            await new Time().AtualizarPasseJogador(localStorage.getItem("timeAtualID"), aIncrementar, id);
        }
        catch (e) {
            alert("Falha ao inserir Passe: " + e)
        }
    }
    // Atualização dos saques no banco de somente um jogador
    async AtualizarSaqueJogador(id, saques) {
        try {
            const timeDocRef = doc(db, "jogador", id)
            await updateDoc(timeDocRef, {
                "saque.flutuante": increment(saques[0]),
                "saque.ace": increment(saques[1]),
                "saque.viagem": increment(saques[2]),
                "saque.por_cima": increment(saques[3]),
                "saque.fora": increment(saques[4])
            });
            await new Time().AtualizarSaqueJogador(localStorage.getItem("timeAtualID"), saques, id);
        }
        catch (e) {
            alert("Falha ao inserir Saque: " + e);
        }
    }
    // Atualização dos ataques no banco de somente um jogador
    async AtualizarAtaqueJogador(id, ataques) {
        try {
            const timeDocRef = doc(db, "jogador", id);
            await updateDoc(timeDocRef, {
                "ataque.acertado": increment(ataques[0]),
                "ataque.errado": increment(ataques[1])
            });
            await new Time().AtualizarAtaqueJogador(localStorage.getItem("timeAtualID"), ataques, id);
        }
        catch (e) {
            alert("Falha ao inserir ataque: " + e);
        }
    }
    // Cadastro do Bloqueio no banco
    async AtualizarBloqueioJogador(id, bloqueio) {
        try {
            const timeDocRef = doc(db, "jogador", id);
            await updateDoc(timeDocRef, {
                "bloqueio.ponto_bloqueando": increment(bloqueio[0]),
                "bloqueio.ponto_adversario": increment(bloqueio[1])
            });
            await new Time().AtualizarBloqueioJogador(localStorage.getItem("timeAtualID"), bloqueio, id);
        }
        catch (e) {
            alert("Falha ao inserir bloqueio: " + e);
        }
    }
    // cadastro do levantamento no banco
    async AtualizarLevantamento(id, levantamento) {
        try {
            const timeDocRef = doc(db, "jogador", id);
            await updateDoc(timeDocRef, {
                "levantou_para.centro": increment(levantamento[0]),
                "levantou_para.errou": increment(levantamento[1]),
                "levantou_para.oposto": increment(levantamento[2]),
                "levantou_para.pipe": increment(levantamento[3]),
                "levantou_para.ponta": increment(levantamento[4]),
            });
            await new Time().AtualizarLevantamento(localStorage.getItem("timeAtualID"), levantamento, id);
        }
        catch (e) {
            alert("Falha ao inserir levantamento: " + e);
        }
    }
}