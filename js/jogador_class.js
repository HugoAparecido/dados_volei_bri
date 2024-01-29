import { db } from "./acesso_banco.js";
import { ShowLoading, HideLoading } from "./loading.js";
import { collection, query, where, doc, orderBy, addDoc, getDocs, increment, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { Time } from "./time_class.js";
export class Jogador {
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
    async PopularNovosJogadores(adicionarJogador) {
        const q = query(collection(db, "jogador"), orderBy("nome"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (!localStorage.getItem("jogadores").includes(doc.id)) {
                adicionarJogador.innerHTML += `<option value="${doc.id}">${doc.data().numero_camisa} ${doc.data().nome}</option>`
            }
        })

    };
    async PopularPasses(colocarJogadoresDoTime) {
        ShowLoading()
        let nomes = []
        let id = []
        let jogadores = JSON.parse(localStorage.getItem("jogadores"))
        jogadores.forEach((jogador) => {
            id.push(jogador.id)
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
                document.getElementById(`${doc.id}_passe_A`).value = 0
                document.getElementById(`${doc.id}_passe_B`).value = 0
                document.getElementById(`${doc.id}_passe_C`).value = 0
                document.getElementById(`${doc.id}_passe_D`).value = 0
                document.getElementById(`${doc.id}_label_A`).addEventListener("click", () => { document.getElementById(`${doc.id}_passe_A`).value++ })
                document.getElementById(`${doc.id}_label_B`).addEventListener("click", () => { document.getElementById(`${doc.id}_passe_B`).value++ })
                document.getElementById(`${doc.id}_label_C`).addEventListener("click", () => { document.getElementById(`${doc.id}_passe_C`).value++ })
                document.getElementById(`${doc.id}_label_D`).addEventListener("click", () => { document.getElementById(`${doc.id}_passe_D`).value++ })
            }
        });
        HideLoading()
    }
    CriarInputsPasses(idJogador, tipoPasse) {
        let elemento = `<input class="form-control input_number" type="number" min="0" name="${idJogador}_passe_${tipoPasse}" id="${idJogador}_passe_${tipoPasse}" readonly><label class="form-label" for="${idJogador}_passe_${tipoPasse}" id="${idJogador}_label_${tipoPasse}">${tipoPasse}+</label>`
        return elemento
    }
    async AtualizarPasseDeTodosJogadores() {
        let nomes = []
        let id = []
        let time = new Time
        let jogadores = JSON.parse(localStorage.getItem("jogadores"))
        jogadores.forEach((jogador) => {
            id.push(jogador.id)
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
        }
    }
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
    async PopularSelectSaqueAtaque(colocarJogadoresDoTime) {
        let nomes = []
        let id = []
        let jogadores = JSON.parse(localStorage.getItem("jogadores"))
        jogadores.forEach((jogador) => {
            id.push(jogador.id)
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
    async CadastrarSaque(valorSelect, nomeSelect, ace, dentroFora, tipoSaque) {
        let id = []
        let jogadores = JSON.parse(localStorage.getItem("jogadores"))
        jogadores.forEach((jogador) => {
            id.push(Object.entries(jogador)[0][0])
        })
        const q = query(collection(db, "jogador"), where("nome", "==", nomeSelect));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (id.includes(doc.id)) {
                this.AtualizarSaqueJogador(valorSelect, ace, dentroFora, tipoSaque);
            }
        });
    }
    async AtualizarSaqueJogador(id, ace, dentroFora, tipoSaque) {
        try {
            let local = `${dentroFora}.${tipoSaque}`
            if (ace === "sim") {
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
    async CadastrarAtaque(valorSelect, nomeSelect, acerto) {
        let id = []
        let jogadores = JSON.parse(localStorage.getItem("jogadores"))
        jogadores.forEach((jogador) => {
            id.push(Object.entries(jogador)[0][0])
        })
        const q = query(collection(db, "jogador"), where("nome", "==", nomeSelect));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (id.includes(doc.id)) {
                this.AtualizarAtaqueJogador(valorSelect, tipoAtaque, acerto);
            }
        });
    }
    async AtualizarAtaqueJogador(id, tipoAtaque, acerto) {
        try {
            let local = "ataque"
            if (acerto === "acertado") {
                local += `.acertado`
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
    async CadastrarLevantamento(valorSelect, nomeSelect, levantamento) {
        let id = []
        let jogadores = JSON.parse(localStorage.getItem("jogadores"))
        jogadores.forEach((jogador) => {
            id.push(Object.entries(jogador)[0][0])
        })
        const q = query(collection(db, "jogador"), where("nome", "==", nomeSelect));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (id.includes(doc.id) && doc.data().posicao === "Levantador") {
                this.AtualizarLevantamento(valorSelect, levantamento);
            }
            else if (doc.data().posicao !== "Levantador") {
                alert("Não foi possível Cadasatrar o levantamento pois o jogador não é um levantador")
            }
        });
    }
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