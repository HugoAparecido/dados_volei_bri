import { db } from "../acesso_banco.js";
import { ShowLoading, HideLoading } from "../loading.js";
import { collection, query, where, doc, orderBy, addDoc, getDocs, increment, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { Time } from "./time_class.js";
export class Jogador {
    // Cadastrar Jogador
    async CadastrarJogador(nomeConst, sexoConst, numeroCamisa, posicaoConst, alturaConst, pesoConst) {
        ShowLoading();
        let atributos = {
            nome: nomeConst,
            numero_camisa: numeroCamisa,
            posicao: posicaoConst,
            sexo: sexoConst,
            altura: alturaConst,
            peso: pesoConst,
            saque: {
                flutuante: 0,
                ace: 0,
                viagem: 0,
                fora: 0,
                por_cima: 0
            }, passe: {
                passe_A: 0,
                passe_B: 0,
                passe_C: 0,
                passe_D: 0
            },
            ataque: {
                acertado: 0,
                errado: 0,
            },
            bloqueio: {
                ponto_adversario: 0,
                ponto_bloqueando: 0,

            }
        };
        // Se a posição for a de levantador o objeto anterior se junta com atributos de levantador
        if (posicaoConst === "Levantador") {
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
        }
        try {
            const docRef = await addDoc(collection(db, "jogador"), atributos);
            alert("Jogador cadastrado com sucesso com o ID: " + docRef.id);
            HideLoading();
            window.location.reload();

        } catch (e) {
            alert("Erro ao adicionar o documento: " + e);
            HideLoading();
        }
    }
    // Mostragem Geral em Tabela dos jogadores
    async MostrarTodosJogadores(mostrarJogador) {
        mostrarJogador().innerHTML = ""
        const q = query(collection(db, "jogador"), orderBy("nome"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            mostrarJogador().innerHTML += `<tr>
            <td>${doc.id}</td>
            <td>${doc.data().nome}</td>
            <td>${doc.data().numero_camisa}</td>
            <td>${doc.data().posicao}</td>
            <td>${doc.data().sexo}</td>
            </tr>`
        });
    }
    // Colocar Todos os jogadores em um select
    async MostrarTodosJogadoresSelect(mostrarJogador) {
        ShowLoading();
        const q = query(collection(db, "jogador"), orderBy("nome"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            mostrarJogador.innerHTML += `<option value="${doc.id}">${doc.data().numero_camisa}: ${doc.data().nome} (${doc.data().posicao})</option>`;
        });
        HideLoading();
    }
    // Colocar os jogadores que não pertencem a um time, além de colocar somente se o sexo do jogador for igual ao do Time, caso seja misto, aparecerão todos os jogadores
    async PopularNovosJogadores(adicionarJogador) {
        adicionarJogador.innerHTML = '';
        if (localStorage.getItem("sexo") != "Mis") {
            const q = query(collection(db, "jogador"), where("sexo", "==", localStorage.getItem("sexo")), orderBy("nome"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (!localStorage.getItem("jogadores").includes(doc.id)) {
                    adicionarJogador.innerHTML += `<option value="${doc.id}">${doc.data().numero_camisa} ${doc.data().nome}</option>`;
                }
            })
        } else {
            const q = query(collection(db, "jogador"), orderBy("nome"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (!localStorage.getItem("jogadores").includes(doc.id)) {
                    adicionarJogador.innerHTML += `<option value="${doc.id}">${doc.data().numero_camisa} ${doc.data().nome}</option>`;
                }
            })
        }
    }
    // Puxar informações do jogador e inseri-las no form para um possível Update
    async PopularFormCadastro(idJogador, nomeJogador, numeroCamisa, posicao, sexo, altura, peso, dadosLevantador) {
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
            }
        })
    }
    // Update do Jogador
    async AtualizarJogador(idJogador, nomeJogador, novoNome, numeroCamisa, posicao, sexo, altura, peso, dadosLevantador) {
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
                if (dadosLevantador && posicao === "Levantador") {
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
                    let h3InformacoesJogador = document.createElement("h3");
                    h3InformacoesJogador.innerHTML = `${doc.data().posicao}: ${doc.data().numero_camisa} ${doc.data().nome}`;
                    divJogador.appendChild(h3InformacoesJogador);
                    // Criação da div Passes do jogador
                    let divPasses = document.createElement("div");
                    divPasses.className = "passes";
                    divPasses.innerHTML += `<span><strong>Passe: </strong></span>`;
                    divPasses.appendChild(this.CriarInputsPasses(doc.id, "A"));
                    divPasses.appendChild(this.CriarInputsPasses(doc.id, "B"));
                    divPasses.appendChild(this.CriarInputsPasses(doc.id, "C"));
                    divPasses.appendChild(this.CriarInputsPasses(doc.id, "D"));
                    divJogador.appendChild(divPasses);
                    // Criação da div Saques
                    let divSaques = document.createElement("div");
                    divSaques.className = "saques";
                    divSaques.innerHTML = "<strong><span>Saque: </span></strong>";
                    divSaques.appendChild(this.CriarInputsSaques(doc.id, "flutuante", "Flutuante"));
                    divSaques.appendChild(this.CriarInputsSaques(doc.id, "ace", "ACE"));
                    divSaques.appendChild(this.CriarInputsSaques(doc.id, "viagem", "Viagem"));
                    divSaques.appendChild(this.CriarInputsSaques(doc.id, "por_cima", "Por cima"));
                    divSaques.appendChild(this.CriarInputsSaques(doc.id, "fora", "Fora"));
                    divJogador.appendChild(divSaques);
                    // Criação da div Ataques
                    let divAtaques = document.createElement("div");
                    divAtaques.className = "ataques";
                    divAtaques.innerHTML = "<strong><span>Ataque: </span></strong>";
                    divAtaques.innerHTML += this.CriarInputsAtaques(doc.id);
                    divJogador.appendChild(divAtaques);
                    // Criação da div Bloqueios
                    let divBloqueios = document.createElement("div");
                    divBloqueios.className = "bloqueios";
                    divBloqueios.innerHTML = "<strong><span>Bloqueios: </span></strong>";
                    divBloqueios.innerHTML += this.CriarInputsBloqueios(doc.id);
                    divJogador.appendChild(divBloqueios);
                    // Criação da div Levantamentos se for levantador
                    if (doc.data().posicao === "Levantador") {
                        let divLevantamentos = document.createElement("div");
                        divLevantamentos.className = "levantamentos";
                        divLevantamentos.innerHTML = "<strong><span>Levantamentos: </span></strong>";
                        divLevantamentos.innerHTML += this.CriarInputsLevantamentos(doc.id);
                        divJogador.appendChild(divLevantamentos);
                    }
                    colocarJogadoresDoTime.appendChild(divJogador);
                    // Adicionando Listeners aos botoes de incremento e decremento
                    // Passes
                    this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_passe_A`), document.getElementById(`${doc.id}_diminuir_passe_A`), document.getElementById(`${doc.id}_passe_A`));
                    this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_passe_B`), document.getElementById(`${doc.id}_diminuir_passe_B`), document.getElementById(`${doc.id}_passe_B`));
                    this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_passe_C`), document.getElementById(`${doc.id}_diminuir_passe_C`), document.getElementById(`${doc.id}_passe_C`));
                    this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_passe_D`), document.getElementById(`${doc.id}_diminuir_passe_D`), document.getElementById(`${doc.id}_passe_D`));
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
            });
        }
        HideLoading()
    }
    // Função para a criação do input para o passe
    CriarInputsPasses(idJogador, tipoPasse) {
        let elemento = document.createElement("div");
        elemento.className = "linha_unica";
        // span decremento
        let spanDecremento = document.createElement("span");
        spanDecremento.id = `${idJogador}_diminuir_passe_${tipoPasse}`;
        spanDecremento.innerHTML = `-${tipoPasse}`;
        spanDecremento.className = "saques_span";
        // span incremento
        let spanIncremento = document.createElement("span");
        spanIncremento.id = `${idJogador}_aumentar_passe_${tipoPasse}`;
        spanIncremento.innerHTML = `+${tipoPasse}`;
        spanIncremento.className = "saques_span";
        // input
        let input = document.createElement("input");
        input.type = "number";
        input.className = "input_number";
        input.min = 0;
        input.name = `${idJogador}_passe_${tipoPasse}`;
        input.id = `${idJogador}_passe_${tipoPasse}`;
        input.readOnly = true;
        // colocando os elementos na div
        elemento.appendChild(spanDecremento);
        elemento.appendChild(input);
        elemento.appendChild(spanIncremento);
        return elemento;
    }
    // Função para a criação do input Saque
    CriarInputsSaques(idJogador, tipoSaque, nomeSaque) {
        let span = document.createElement("span");
        span.innerHTML = `${nomeSaque}: `;
        let elemento = document.createElement("div");
        elemento.className = "linha_unica";
        elemento.appendChild(span);
        // span decremento
        let spanDecremento = document.createElement("span");
        spanDecremento.id = `${idJogador}_diminuir_saque_${tipoSaque}`;
        spanDecremento.innerHTML = "-";
        spanDecremento.className = "saques_span";
        // span incremento
        let spanIncremento = document.createElement("span");
        spanIncremento.id = `${idJogador}_aumentar_saque_${tipoSaque}`;
        spanIncremento.innerHTML = '+';
        spanIncremento.className = "saques_span";
        // input
        let input = document.createElement("input");
        input.type = "number";
        input.className = "input_number";
        input.min = 0;
        input.name = `${idJogador}_saque_${tipoSaque}`;
        input.id = `${idJogador}_saque_${tipoSaque}`;
        input.readOnly = true;
        // colocando os elementos na div
        elemento.appendChild(spanDecremento);
        elemento.appendChild(input);
        elemento.appendChild(spanIncremento);
        return elemento;
    }
    CriarInputsAtaques(idJogador) {
        let elemento = `<strong><span>Acertado: </span></strong><span id="${idJogador}_diminuir_ataque_acerto">-</span><input class="form-control input_number" type="number" min="0" name="${idJogador}_ataque_acerto" id="${idJogador}_ataque_acerto" readonly><span id="${idJogador}_aumentar_ataque_acerto">+</span>
        <strong><span>Errado: </span></strong><span id="${idJogador}_diminuir_ataque_erro">-</span><input class="form-control input_number" type="number" min="0" name="${idJogador}_ataque_erro" id="${idJogador}_ataque_erro" readonly><span id="${idJogador}_aumentar_ataque_erro">+</span>`;
        return elemento;
    }
    CriarInputsBloqueios(idJogador) {
        let elemento = `<strong><span>Ponto para este time: </span></strong><span id="${idJogador}_diminuir_bloqueio_ponto_este">-</span><input class="form-control input_number" type="number" min="0" name="${idJogador}_bloqueio_ponto_este" id="${idJogador}_bloqueio_ponto_este" readonly><span id="${idJogador}_aumentar_bloqueio_ponto_este">+</span>
        <strong><span>Ponto adversário: </span></strong><span id="${idJogador}_diminuir_bloqueio_ponto_adversario">-</span><input class="form-control input_number" type="number" min="0" name="${idJogador}_bloqueio_ponto_adversario" id="${idJogador}_bloqueio_ponto_adversario" readonly><span id="${idJogador}_aumentar_bloqueio_ponto_adversario">+</span>`;
        return elemento;
    }
    CriarInputsLevantamentos(idJogador) {
        let elemento = `<strong><span>Ponta: </span></strong><span id="${idJogador}_diminuir_levantamento_ponta">-</span><input class="form-control input_number" type="number" min="0" name="${idJogador}_levantamento_ponta" id="${idJogador}_levantamento_ponta" readonly><span id="${idJogador}_aumentar_levantamento_ponta">+</span>
        <strong><span>Centro: </span></strong><span id="${idJogador}_diminuir_levantamento_centro">-</span><input class="form-control input_number" type="number" min="0" name="${idJogador}_levantamento_centro" id="${idJogador}_levantamento_centro" readonly><span id="${idJogador}_aumentar_levantamento_centro">+</span>
        <strong><span>Oposto: </span></strong><span id="${idJogador}_diminuir_levantamento_oposto">-</span><input class="form-control input_number" type="number" min="0" name="${idJogador}_levantamento_oposto" id="${idJogador}_levantamento_oposto" readonly><span id="${idJogador}_aumentar_levantamento_oposto">+</span>
        <strong><span>Pipe: </span></strong><span id="${idJogador}_diminuir_levantamento_pipe">-</span><input class="form-control input_number" type="number" min="0" name="${idJogador}_levantamento_pipe" id="${idJogador}_levantamento_pipe" readonly><span id="${idJogador}_aumentar_levantamento_pipe">+</span>
        <strong><span>Errou: </span></strong><span id="${idJogador}_diminuir_levantamento_errou">-</span><input class="form-control input_number" type="number" min="0" name="${idJogador}_levantamento_errou" id="${idJogador}_levantamento_errou" readonly><span id="${idJogador}_aumentar_levantamento_errou">+</span>`;
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
                        document.getElementById(`${doc.id}_passe_D`).value
                    ];
                    // saques
                    let saquesIncrementar = [
                        document.getElementById(`${doc.id}_saque_flutuante`).value,
                        document.getElementById(`${doc.id}_saque_ace`).value,
                        document.getElementById(`${doc.id}_saque_viagem`).value,
                        document.getElementById(`${doc.id}_saque_por_cima`).value,
                        document.getElementById(`${doc.id}_saque_fora`).value
                    ];
                    // ataques
                    let ataquesIncrementar = [
                        document.getElementById(`${doc.id}_ataque_acerto`).value,
                        document.getElementById(`${doc.id}_ataque_erro`).value
                    ]
                    // bloqueio
                    let bloqueiosIncrementar = [
                        document.getElementById(`${doc.id}_bloqueio_ponto_este`).value,
                        document.getElementById(`${doc.id}_bloqueio_ponto_adversario`).value
                    ]
                    // Chamada das funções de atualizção no banco
                    // passes
                    this.AtualizarPasseJogador(doc.id, passesIncrementar.map(Number));
                    time.AtualizarPasseJogador(localStorage.getItem("timeAtualID"), passesIncrementar.map(Number), doc.id);
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
            });
            alert("dados atualizados!!");
        }
        catch (e) {
            alert("Falha nas inserções: " + e)
        }
        HideLoading();
        window.location.reload();
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