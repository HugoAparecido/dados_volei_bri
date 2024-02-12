import { db } from "../acesso_banco.js";
import { ShowLoading, HideLoading } from "../loading.js";
import { collection, query, where, doc, orderBy, addDoc, getDocs, increment, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { Time } from "./time_class.js";
export class Jogador {
    // Cadastro Jogador
    async CadastrarJogador(nomeConst, sexoConst, numeroCamisa, posicaoConst, alturaConst, pesoConst) {
        ShowLoading();
        let atributos = {
            nome: nomeConst,
            numero_camisa: numeroCamisa,
            posicao: posicaoConst,
            sexo: sexoConst,
            altura: alturaConst,
            peso: pesoConst,
            saque_fora: {
                por_baixo: 0,
                viagem_fundo_do_mar: 0,
                flutuante: 0,
            },
            saque_dentro: {
                por_baixo: 0,
                viagem_fundo_do_mar: 0,
                flutuante: 0,
                ace: {
                    por_baixo: 0,
                    viagem_fundo_do_mar: 0,
                    flutuante: 0,
                }
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
            window.location.reload()

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
                    adicionarJogador.innerHTML += `<option value="${doc.id}">${doc.data().numero_camisa} ${doc.data().nome}</option>`
                }
            })
        } else {
            const q = query(collection(db, "jogador"), orderBy("nome"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (!localStorage.getItem("jogadores").includes(doc.id)) {
                    adicionarJogador.innerHTML += `<option value="${doc.id}">${doc.data().numero_camisa} ${doc.data().nome}</option>`
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
                numeroCamisa.value = doc.data().numero_camisa
                posicao.value = doc.data().posicao
                sexo.value = doc.data().sexo
                altura.value = doc.data().altura
                peso.value = doc.data().peso
                if (doc.data().posicao === "Levantador") {
                    dadosLevantador = true
                }
            }
        })
    }
    // Update do Jogador
    async AtualizarJogador(idJogador, nomeJogador, novoNome, numeroCamisa, posicao, sexo, altura, peso, dadosLevantador) {
        ShowLoading()
        try {
            if (nomeJogador != "") {
                const timeDocRef = doc(db, "jogador", idJogador)
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
                alert("Atualização Bem sucedida!!!")
            }
            else alert("é necessário escolher um jogador")
        }
        catch (e) {
            alert(e)
        }
        HideLoading()
    }
    // Popular com a iserção de passes conforme os jogadores inseridos no time
    async PopularInsercoes(colocarJogadoresDoTime) {
        ShowLoading()
        colocarJogadoresDoTime.innerHTML = "";
        let nomes = []
        let id = []
        let jogadores = JSON.parse(localStorage.getItem("jogadores"))
        if (jogadores.length != 0) {
            jogadores.forEach((jogador) => {
                id.push(Object.entries(jogador)[0][1])
                nomes.push(jogador.nome)
            })
            const q = query(collection(db, "jogador"), where("nome", "in", nomes), orderBy("nome"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (id.includes(doc.id)) {
                    let divJogador = document.createElement("div")
                    let spanInformacoesJogador = document.createElement("span")
                    spanInformacoesJogador.innerHTML = `${doc.data().posicao}: ${doc.data().numero_camisa} ${doc.data().nome}`
                    divJogador.appendChild(spanInformacoesJogador)
                    let divPasses = document.createElement("div")
                    divPasses.className = "passes"
                    divPasses.innerHTML += `<span>Passe: </span>`
                    divPasses.innerHTML += this.CriarInputsPasses(doc.id, "A")
                    divPasses.innerHTML += this.CriarInputsPasses(doc.id, "B")
                    divPasses.innerHTML += this.CriarInputsPasses(doc.id, "C")
                    divPasses.innerHTML += this.CriarInputsPasses(doc.id, "D")
                    divJogador.appendChild(divPasses)
                    colocarJogadoresDoTime.appendChild(divJogador)
                    this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_passe_A`), document.getElementById(`${doc.id}_diminuir_passe_A`), document.getElementById(`${doc.id}_passe_A`));
                    this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_passe_B`), document.getElementById(`${doc.id}_diminuir_passe_B`), document.getElementById(`${doc.id}_passe_B`));
                    this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_passe_C`), document.getElementById(`${doc.id}_diminuir_passe_C`), document.getElementById(`${doc.id}_passe_C`));
                    this.CriarListenersIncrementoDecremento(document.getElementById(`${doc.id}_aumentar_passe_D`), document.getElementById(`${doc.id}_diminuir_passe_D`), document.getElementById(`${doc.id}_passe_D`));
                }
            });
        }
        HideLoading()
    }
    // Função para a criação do input para o passe
    CriarInputsPasses(idJogador, tipoPasse) {
        let elemento = `<span id="${idJogador}_diminuir_passe_${tipoPasse}">-${tipoPasse}</span><input class="form-control input_number" type="number" min="0" name="${idJogador}_passe_${tipoPasse}" id="${idJogador}_passe_${tipoPasse}" readonly><span class="form-label" for="${idJogador}_passe_${tipoPasse}" id="${idJogador}_aumentar_passe_${tipoPasse}">${tipoPasse}+</span>`
        return elemento
    }
    // Função para aumentar e diminuir a quantidade dos atributos
    CriarListenersIncrementoDecremento(idIncremento, idDecremento, idAtributo) {
        idAtributo.value = 0;
        idIncremento.addEventListener("click", () => idAtributo.value++);
        idDecremento.addEventListener("click", () => idAtributo.value == 0 ? idAtributo.value : idAtributo.value--);
    }
    // Atualização de todos os passes de todos os jogadores presentes
    async AtualizarPasseDeTodosJogadores() {
        ShowLoading()
        let nomes = []
        let id = []
        let time = new Time
        let jogadores = JSON.parse(localStorage.getItem("jogadores"))
        jogadores.forEach((jogador) => {
            id.push(Object.entries(jogador)[0][1])
            nomes.push(jogador.nome)
        })
        const q = query(collection(db, "jogador"), where("nome", "in", nomes));
        const querySnapshot = await getDocs(q);
        try {
            querySnapshot.forEach((doc) => {
                if (id.includes(doc.id)) {
                    let passesIncrementar = [document.getElementById(`${doc.id}_passe_A`).value, document.getElementById(`${doc.id}_passe_B`).value, document.getElementById(`${doc.id}_passe_C`).value, document.getElementById(`${doc.id}_passe_D`).value]
                    this.AtualizarPasseJogador(doc.id, passesIncrementar.map(Number))
                    time.AtualizarPasseJogador(localStorage.getItem("timeAtualID"), passesIncrementar.map(Number), doc.id)
                }
            });
            alert("dados atualizados!!")
        }
        catch (e) {
            alert("Falha nas inserções: " + e)
        } await new Promise(resolve => setTimeout(resolve, 2000));
        HideLoading()
        window.location.reload()
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
            alert("Falha ao inserir: " + e)
        }
    }
    // População do select para escolher o jogador que fará o saque, ou o ataque, ou o bloqueio, ou o levantamento
    async PopularSelectSaqueAtaque(colocarJogadoresDoTime) {
        let nomes = []
        let id = []
        await new Promise(resolve => setTimeout(resolve, 2000));
        let jogadores = JSON.parse(localStorage.getItem("jogadores"))
        if (jogadores.length != 0) {
            jogadores.forEach((jogador) => {
                id.push(Object.entries(jogador)[0][1])
                nomes.push(jogador.nome)
            })
            const q = query(collection(db, "jogador"), where("nome", "in", nomes), orderBy("nome"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (id.includes(doc.id)) {
                    colocarJogadoresDoTime.innerHTML += `<option value="${doc.id}">${doc.data().numero_camisa} ${doc.data().nome}</option>`
                }
            });
        }
    }
    // Cadastro do saque no time e no jogador
    async CadastrarSaque(valorSelect, nomeSelect, ace, dentroFora, tipoSaque) {
        ShowLoading()
        let time = new Time
        let id = []
        let jogadores = JSON.parse(localStorage.getItem("jogadores"))
        jogadores.forEach((jogador) => {
            id.push(Object.entries(jogador)[0][1])
        })
        const q = query(collection(db, "jogador"), where("nome", "==", nomeSelect));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (id.includes(doc.id)) {
                this.AtualizarSaqueJogador(valorSelect, ace, dentroFora, tipoSaque);
                time.AtualizarSaqueJogador(localStorage.getItem("timeAtualID"), ace, dentroFora, tipoSaque, doc.id)
            }
        });
        HideLoading()
    }
    // cadastro do saque no banco
    async AtualizarSaqueJogador(id, ace, dentroFora, tipoSaque) {
        try {
            let local = `${dentroFora}.${tipoSaque}`
            if (ace === "sim" && dentroFora === "saque_dentro") {
                let dividir = local.split(".")
                local = `${dividir[0]}.ace.${dividir[1]}`
            }
            const timeDocRef = doc(db, "jogador", id)
            await updateDoc(timeDocRef, {
                [local]: increment(1)
            });
            alert("Saque Cadastrado")
        }
        catch (e) {
            alert("Falha ao inserir: " + e)
        }
    }
    // chamada de cadastro ataque
    async CadastrarAtaque(valorSelect, nomeSelect, acerto) {
        ShowLoading()
        let id = []
        let jogadores = JSON.parse(localStorage.getItem("jogadores"))
        let time = new Time
        jogadores.forEach((jogador) => {
            id.push(Object.entries(jogador)[0][1])
        })
        console.log(id)
        const q = query(collection(db, "jogador"), where("nome", "==", nomeSelect));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (id.includes(doc.id)) {
                this.AtualizarAtaqueJogador(valorSelect, acerto);
                time.AtualizarAtaqueJogador(localStorage.getItem("timeAtualID"), acerto, valorSelect)
            }
        });
        HideLoading()
    }
    // cadastro do ataque no banco
    async AtualizarAtaqueJogador(id, acerto) {
        try {
            let local = "ataque"
            if (acerto === "acertado") {
                local += ".acertado"
            }
            else {
                local += ".errado"
            }
            const timeDocRef = doc(db, "jogador", id)
            await updateDoc(timeDocRef, {
                [local]: increment(1)
            });
            alert("Ataque Cadastrado")
        }
        catch (e) {
            alert("Falha ao inserir: " + e)
        }
    }
    // Chamada de cadastro bloqueio
    async CadastrarBloqueio(valorSelect, nomeSelect, acerto) {
        ShowLoading()
        let id = []
        let jogadores = JSON.parse(localStorage.getItem("jogadores"))
        let time = new Time
        jogadores.forEach((jogador) => {
            id.push(Object.entries(jogador)[0][1])
        })
        const q = query(collection(db, "jogador"), where("nome", "==", nomeSelect));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (id.includes(doc.id)) {
                this.AtualizarBloqueioJogador(valorSelect, acerto);
                time.AtualizarBloqueioJogador(localStorage.getItem("timeAtualID"), acerto, valorSelect)
            }
        });
        HideLoading()
    }
    // Cadastro do Bloqueio no banco
    async AtualizarBloqueioJogador(id, acerto) {
        try {
            let local = "bloqueio"
            if (acerto === "ponto_adversario") {
                local += ".ponto_adversario"
            }
            else {
                local += ".ponto_bloqueando"
            }
            const timeDocRef = doc(db, "jogador", id)
            await updateDoc(timeDocRef, {
                [local]: increment(1)
            });
            alert("Bloqueio Cadastrado")
        }
        catch (e) {
            alert("Falha ao inserir: " + e)
        }
    }
    // Chamada de Cadastro levantamento
    async CadastrarLevantamento(valorSelect, nomeSelect, levantamento) {
        let id = []
        let jogadores = JSON.parse(localStorage.getItem("jogadores"))
        let time = new Time
        jogadores.forEach((jogador) => {
            id.push(Object.entries(jogador)[0][1])
        })
        const q = query(collection(db, "jogador"), where("nome", "==", nomeSelect));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (id.includes(doc.id) && doc.data().posicao === "Levantador") {
                this.AtualizarLevantamento(valorSelect, levantamento);
                time.AtualizarLevantamento(localStorage.getItem("timeAtualID"), levantamento, valorSelect)
            }
            else if (doc.data().posicao !== "Levantador") {
                alert("Não foi possível Cadasatrar o levantamento pois o jogador não é um levantador")
            }
        });
    }
    // cadastro do levantamento no banco
    async AtualizarLevantamento(id, levantamento) {
        try {
            let local = `levantou_para.${levantamento}`
            const timeDocRef = doc(db, "jogador", id)
            await updateDoc(timeDocRef, {
                [local]: increment(1)
            });
            alert("Levantamento Cadastrado")
        }
        catch (e) {
            alert("Falha ao inserir: " + e)
        }
    }
}