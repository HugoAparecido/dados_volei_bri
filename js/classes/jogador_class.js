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
            let componentes = new Componentes()
            mostrarJogador().innerHTML += componentes.TabelaJogadores(doc.id, doc.data().nome, doc.data().numero_camisa, doc.data().posicao, doc.data().sexo)
            /*`<tr>
            <td>${doc.id}</td>
            <td>${doc.data().nome}</td>
            <td>${doc.data().numero_camisa}</td>
            <td>${doc.data().posicao}</td>
            <td>${doc.data().sexo}</td>
            </tr>`*/
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
            mostrarJogador.innerHTML += `<option value="${doc.id}">${doc.data().numero_camisa}: ${doc.data().nome} (${doc.data().posicao})</option>`;
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
                    adicionarJogador.innerHTML += `<option value="${doc.id}">${doc.data().numero_camisa} ${doc.data().nome}</option>`;
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
                    adicionarJogador.innerHTML += `<option value="${doc.id}">${doc.data().numero_camisa} ${doc.data().nome}</option>`;
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
                    // Criação da div Jogador
                    let divJogador = document.createElement("div");
                    divJogador.className = "itemArrastavel jogador_dados";
                    divJogador.draggable = true;
                    let h3InformacoesJogador = document.createElement("h3");
                    h3InformacoesJogador.innerHTML = `${doc.data().posicao}: ${doc.data().numero_camisa} ${doc.data().nome}`;
                    divJogador.appendChild(h3InformacoesJogador);
                    // Criação da div Passes do jogador
                    let divInsercoesIndividual = document.createElement("div");
                    divInsercoesIndividual.className = "insercao_individual";
                    let divPasses = document.createElement("div");
                    divPasses.className = "passes";
                    divPasses.innerHTML += `<span><strong>Pas: </strong></span>`;
                    divPasses.appendChild(this.CriarInputsPasses(doc.id, "A"));
                    divPasses.appendChild(this.CriarInputsPasses(doc.id, "B"));
                    divPasses.appendChild(this.CriarInputsPasses(doc.id, "C"));
                    divPasses.appendChild(this.CriarInputsPasses(doc.id, "D"));
                    divPasses.appendChild(this.CriarInputsPasses(doc.id, "DEF"));
                    divInsercoesIndividual.appendChild(divPasses);
                    if (doc.data().posicao !== "Líbero") {
                        // Criação da div Saques
                        let divSaques = document.createElement("div");
                        divSaques.className = "saques";
                        divSaques.innerHTML = "<strong><span>Saq: </span></strong>";
                        divSaques.appendChild(this.CriarInputsAtributos(doc.id, "saque_flutuante", "Flu"));
                        divSaques.appendChild(this.CriarInputsAtributos(doc.id, "saque_ace", "ACE"));
                        divSaques.appendChild(this.CriarInputsAtributos(doc.id, "saque_viagem", "Via"));
                        divSaques.appendChild(this.CriarInputsAtributos(doc.id, "saque_por_cima", "Cima"));
                        divSaques.appendChild(this.CriarInputsAtributos(doc.id, "saque_fora", "Fora"));
                        divInsercoesIndividual.appendChild(divSaques);
                        // Criação da div Ataques
                        let divAtaques = document.createElement("div");
                        divAtaques.className = "ataques";
                        divAtaques.innerHTML = "<strong><span>Ataq: </span></strong>";
                        divAtaques.appendChild(this.CriarInputsAtributos(doc.id, "ataque_acerto", "Dentro"));
                        divAtaques.appendChild(this.CriarInputsAtributos(doc.id, "ataque_erro", "Fora"));
                        divInsercoesIndividual.appendChild(divAtaques);
                        // Criação da div Bloqueios
                        let divBloqueios = document.createElement("div");
                        divBloqueios.className = "bloqueios";
                        divBloqueios.innerHTML = "<strong><span>Bloq: </span></strong>";
                        divBloqueios.appendChild(this.CriarInputsAtributos(doc.id, "bloqueio_ponto_este", "Convertido"));
                        divBloqueios.appendChild(this.CriarInputsAtributos(doc.id, "bloqueio_ponto_adversario", "Errado"));
                        divInsercoesIndividual.appendChild(divBloqueios);
                        // Criação da div Levantamentos se for levantador
                        if (doc.data().posicao === "Levantador") {
                            let divLevantamentos = document.createElement("div");
                            divLevantamentos.className = "levantamentos";
                            divLevantamentos.innerHTML = "<strong><span>Levant: </span></strong>";
                            divLevantamentos.appendChild(this.CriarInputsAtributos(doc.id, "levantamento_ponta", "Ponta"));
                            divLevantamentos.appendChild(this.CriarInputsAtributos(doc.id, "levantamento_pipe", "Pipe"));
                            divLevantamentos.appendChild(this.CriarInputsAtributos(doc.id, "levantamento_centro", "Centro"));
                            divLevantamentos.appendChild(this.CriarInputsAtributos(doc.id, "levantamento_oposto", "Oposto"));
                            divLevantamentos.appendChild(this.CriarInputsAtributos(doc.id, "levantamento_errou", "Errou"));
                            divInsercoesIndividual.appendChild(divLevantamentos);
                        }
                    }
                    divJogador.appendChild(divInsercoesIndividual)
                    colocarJogadoresDoTime.appendChild(divJogador);
                    // Adicionando Listeners aos botoes de incremento e decremento
                    // Passes
                    this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_passe_A`), document.getElementById(`${doc.id}_diminuir_passe_A`), document.getElementById(`${doc.id}_passe_A`));
                    this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_passe_B`), document.getElementById(`${doc.id}_diminuir_passe_B`), document.getElementById(`${doc.id}_passe_B`));
                    this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_passe_C`), document.getElementById(`${doc.id}_diminuir_passe_C`), document.getElementById(`${doc.id}_passe_C`));
                    this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_passe_D`), document.getElementById(`${doc.id}_diminuir_passe_D`), document.getElementById(`${doc.id}_passe_D`));
                    this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_passe_DEF`), document.getElementById(`${doc.id}_diminuir_passe_DEF`), document.getElementById(`${doc.id}_passe_DEF`));
                    if (doc.data().posicao !== "Líbero") {
                        // Saque
                        // saque por baixo
                        this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_saque_flutuante`), document.getElementById(`${doc.id}_diminuir_saque_flutuante`), document.getElementById(`${doc.id}_saque_flutuante`));
                        this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_saque_ace`), document.getElementById(`${doc.id}_diminuir_saque_ace`), document.getElementById(`${doc.id}_saque_ace`));
                        this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_saque_viagem`), document.getElementById(`${doc.id}_diminuir_saque_viagem`), document.getElementById(`${doc.id}_saque_viagem`));
                        this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_saque_por_cima`), document.getElementById(`${doc.id}_diminuir_saque_por_cima`), document.getElementById(`${doc.id}_saque_por_cima`));
                        this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_saque_fora`), document.getElementById(`${doc.id}_diminuir_saque_fora`), document.getElementById(`${doc.id}_saque_fora`));
                        // Ataque
                        this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_ataque_acerto`), document.getElementById(`${doc.id}_diminuir_ataque_acerto`), document.getElementById(`${doc.id}_ataque_acerto`));
                        this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_ataque_erro`), document.getElementById(`${doc.id}_diminuir_ataque_erro`), document.getElementById(`${doc.id}_ataque_erro`));
                        // Bloqueio
                        this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_bloqueio_ponto_este`), document.getElementById(`${doc.id}_diminuir_bloqueio_ponto_este`), document.getElementById(`${doc.id}_bloqueio_ponto_este`));
                        this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_bloqueio_ponto_adversario`), document.getElementById(`${doc.id}_diminuir_bloqueio_ponto_adversario`), document.getElementById(`${doc.id}_bloqueio_ponto_adversario`));
                        // Levantamentos
                        if (doc.data().posicao === "Levantador") {
                            this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_levantamento_ponta`), document.getElementById(`${doc.id}_diminuir_levantamento_ponta`), document.getElementById(`${doc.id}_levantamento_ponta`));
                            this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_levantamento_centro`), document.getElementById(`${doc.id}_diminuir_levantamento_centro`), document.getElementById(`${doc.id}_levantamento_centro`));
                            this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_levantamento_oposto`), document.getElementById(`${doc.id}_diminuir_levantamento_oposto`), document.getElementById(`${doc.id}_levantamento_oposto`));
                            this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_levantamento_pipe`), document.getElementById(`${doc.id}_diminuir_levantamento_pipe`), document.getElementById(`${doc.id}_levantamento_pipe`));
                            this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_levantamento_errou`), document.getElementById(`${doc.id}_diminuir_levantamento_errou`), document.getElementById(`${doc.id}_levantamento_errou`));
                        }
                    }
                }
            });
        }
        HideLoading()
    }
    // Função para a criação do input para o passe
    CriarInputsPasses(idJogador, tipoPasse) {
        let elemento = document.createElement("div");
        // span decremento
        let spanDecremento = document.createElement("span");
        spanDecremento.id = `${idJogador}_diminuir_passe_${tipoPasse}`;
        spanDecremento.innerHTML = `-${tipoPasse}`;
        spanDecremento.className = "atributos_span";
        // span incremento
        let spanIncremento = document.createElement("span");
        spanIncremento.id = `${idJogador}_aumentar_passe_${tipoPasse}`;
        spanIncremento.innerHTML = `+${tipoPasse}`;
        spanIncremento.className = "atributos_span";
        // input
        let input = document.createElement("input");
        input.type = "number";
        input.className = "input_number";
        input.min = 0;
        input.name = `${idJogador}_passe_${tipoPasse}`;
        input.id = `${idJogador}_passe_${tipoPasse}`;
        input.readOnly = true;
        // colocando os elementos na div
        elemento.appendChild(spanIncremento);
        elemento.appendChild(input);
        elemento.appendChild(spanDecremento);
        return elemento;
    }
    // Função para a criação do input Saque
    CriarInputsAtributos(idJogador, tipo, nomeAtributo) {
        let span = document.createElement("span");
        span.innerHTML = `${nomeAtributo}: `;
        let elemento = document.createElement("div");;
        elemento.appendChild(span);
        // span decremento
        let spanDecremento = document.createElement("span");
        spanDecremento.id = `${idJogador}_diminuir_${tipo}`;
        spanDecremento.innerHTML = "-";
        spanDecremento.className = "atributos_span";
        // span incremento
        let spanIncremento = document.createElement("span");
        spanIncremento.id = `${idJogador}_aumentar_${tipo}`;
        spanIncremento.innerHTML = '+';
        spanIncremento.className = "atributos_span";
        // input
        let input = document.createElement("input");
        input.type = "number";
        input.className = "input_number";
        input.min = 0;
        input.name = `${idJogador}_${tipo}`;
        input.id = `${idJogador}_${tipo}`;
        input.readOnly = true;
        // colocando os elementos na div
        elemento.appendChild(spanIncremento);
        elemento.appendChild(input);
        elemento.appendChild(spanDecremento);
        return elemento;
    }
    // Função para aumentar e diminuir a quantidade dos atributos
    CriarListenersIncrementoDecremento(idIncremento, idDecremento, idAtributo) {
        idAtributo.value = 0;
        idIncremento.addEventListener("click", () => idAtributo.value++);
        idDecremento.addEventListener("click", () => idAtributo.value == 0 ? idAtributo.value : idAtributo.value--);
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
                    // passes
                    let passesIncrementar = [
                        document.getElementById(`${doc.id}_passe_A`).value,
                        document.getElementById(`${doc.id}_passe_B`).value,
                        document.getElementById(`${doc.id}_passe_C`).value,
                        document.getElementById(`${doc.id}_passe_D`).value,
                        document.getElementById(`${doc.id}_passe_DEF`).value
                    ];
                    let saquesIncrementar = [];
                    let ataquesIncrementar = [];
                    let bloqueiosIncrementar = [];
                    if (doc.data().posicao !== "Líbero") {
                        // saques
                        saquesIncrementar = [
                            document.getElementById(`${doc.id}_saque_flutuante`).value,
                            document.getElementById(`${doc.id}_saque_ace`).value,
                            document.getElementById(`${doc.id}_saque_viagem`).value,
                            document.getElementById(`${doc.id}_saque_por_cima`).value,
                            document.getElementById(`${doc.id}_saque_fora`).value
                        ];
                        // ataques
                        ataquesIncrementar = [
                            document.getElementById(`${doc.id}_ataque_acerto`).value,
                            document.getElementById(`${doc.id}_ataque_erro`).value
                        ]
                        // bloqueio
                        bloqueiosIncrementar = [
                            document.getElementById(`${doc.id}_bloqueio_ponto_este`).value,
                            document.getElementById(`${doc.id}_bloqueio_ponto_adversario`).value
                        ]
                    }
                    // Chamada das funções de atualizção no banco
                    // passes
                    this.AtualizarPasseJogador(doc.id, passesIncrementar.map(Number));
                    time.AtualizarPasseJogador(localStorage.getItem("timeAtualID"), passesIncrementar.map(Number), doc.id);
                    if (doc.data().posicao !== "Líbero") {
                        // saques
                        this.AtualizarSaqueJogador(doc.id, saquesIncrementar.map(Number));
                        time.AtualizarSaqueJogador(localStorage.getItem("timeAtualID"), saquesIncrementar.map(Number), doc.id);
                        // ataques
                        this.AtualizarAtaqueJogador(doc.id, ataquesIncrementar.map(Number));
                        time.AtualizarAtaqueJogador(localStorage.getItem("timeAtualID"), ataquesIncrementar.map(Number), doc.id);
                        // bloqueios
                        this.AtualizarBloqueioJogador(doc.id, bloqueiosIncrementar.map(Number));
                        time.AtualizarBloqueioJogador(localStorage.getItem("timeAtualID"), bloqueiosIncrementar.map(Number), doc.id);
                        // Levantamentos
                        if (doc.data().posicao === "Levantador") {
                            let levantamentosIncrementar = [
                                document.getElementById(`${doc.id}_levantamento_centro`).value,
                                document.getElementById(`${doc.id}_levantamento_errou`).value,
                                document.getElementById(`${doc.id}_levantamento_oposto`).value,
                                document.getElementById(`${doc.id}_levantamento_pipe`).value,
                                document.getElementById(`${doc.id}_levantamento_ponta`).value
                            ]
                            this.AtualizarLevantamento(doc.id, levantamentosIncrementar.map(Number));
                            time.AtualizarLevantamento(localStorage.getItem("timeAtualID"), levantamentosIncrementar.map(Number), doc.id)
                        }
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
    // Atualização do passe de somente um jogador
    async AtualizarPasseJogador(id, aIncrementar) {
        try {
            const timeDocRef = doc(db, "jogador", id)
            await updateDoc(timeDocRef, {
                "passe.passe_A": increment(aIncrementar[0]),
                "passe.passe_B": increment(aIncrementar[1]),
                "passe.passe_C": increment(aIncrementar[2]),
                "passe.passe_D": increment(aIncrementar[3]),
                "defesa": increment(aIncrementar[4])
            });
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
        }
        catch (e) {
            alert("Falha ao inserir levantamento: " + e);
        }
    }
}