import { db } from "../acesso_banco.js";
import { ShowLoading, HideLoading } from "../loading.js";
import { collection, query, where, updateDoc, addDoc, doc, getDocs, increment, Timestamp, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
export class Time {
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
        } catch (e) {
            alert("Erro ao adicionar o documento: " + e);
        }
        finally {
            HideLoading();
            window.location.reload()
        }
    }
    async MostrarTodosTimes(mostrarTime) {
        mostrarTime().innerHTML = ""
        const querySnapshot = await getDocs(collection(db, "time"));
        querySnapshot.forEach((doc) => {
            mostrarTime().innerHTML += `<tr>
            <td>${doc.id}</td>
            <td>${doc.data().nome}</td>
            <td>${doc.data().sexo}</td>
            <td>${doc.data().jogadores}</td>
            </tr>`
        });
    }
    async OrdenarTimesPorSexo(mostrarTimeMasculino, mostrarTimeFeminino, mostrarTimeMisto) {
        ShowLoading()
        const q = query(collection(db, "time"), orderBy("data_criacao", "desc"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data().sexo == 'M') {
                let botaoTime = document.createElement('button')
                botaoTime.id = `${doc.id}`
                botaoTime.onclick = () => this.IrParaPaginaDeInsercaoDeDados(doc.data().nome, doc.id)
                let link = document.createElement('a')
                link.href = './inserir_informacoes.html'
                link.innerHTML = `${doc.data().nome}`
                link.className = 'nav-link'
                botaoTime.appendChild(link)
                botaoTime.className = 'btn btn-primary'
                mostrarTimeMasculino().appendChild(botaoTime)
            }
            else if (doc.data().sexo == 'F') {
                let botaoTime = document.createElement('button')
                botaoTime.id = `${doc.id}`
                botaoTime.onclick = () => this.IrParaPaginaDeInsercaoDeDados(doc.data().nome, doc.id)
                let link = document.createElement('a')
                link.href = './inserir_informacoes.html'
                link.innerHTML = `${doc.data().nome}`
                link.className = 'nav-link'
                botaoTime.appendChild(link)
                botaoTime.className = 'btn btn-primary'
                mostrarTimeFeminino().appendChild(botaoTime)
            }
            else {
                let botaoTime = document.createElement('button')
                botaoTime.id = `${doc.id}`
                botaoTime.onclick = () => this.IrParaPaginaDeInsercaoDeDados(doc.data().nome, doc.id)
                let link = document.createElement('a')
                link.href = './inserir_informacoes.html'
                link.innerHTML = `${doc.data().nome}`
                link.className = 'nav-link'
                botaoTime.appendChild(link)
                botaoTime.className = 'btn btn-primary'
                mostrarTimeMisto().appendChild(botaoTime)
            }
        });
        HideLoading()
    }
    async PopularSelect(localSelect) {
        const querySnapshot = await getDocs(collection(db, "time"));
        querySnapshot.forEach((doc) => {
            localSelect.innerHTML += `<option value="${doc.id}">${doc.data().nome}</option>`
        });
    }
    IrParaPaginaDeInsercaoDeDados(nomeTime, idTime) {
        localStorage.setItem("timeAtualID", idTime)
        localStorage.setItem("timeAtualNome", nomeTime)
    }
    async PopularCabecalhoInserirInformacoes(timeExportado, timeSexo) {
        const q = query(collection(db, "time"), where("nome", "==", localStorage.getItem("timeAtualNome")));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === localStorage.getItem("timeAtualID")) {
                timeExportado.innerHTML = `Time: ${doc.data().nome}`
                timeSexo.innerHTML = `${doc.data().sexo === "M" ? "Sexo: Masculino" : doc.data().sexo === "F" ? "Sexo: Feminino" : "Time Misto"}`
                localStorage.setItem('sexo', doc.data().sexo)
                let jogadoresExportar = []
                let jogadores = Object.entries(doc.data().jogadores)
                jogadores.forEach((jogador) => {
                    jogadoresExportar.push({ id: jogador[0], nome: jogador[1].nome })
                })
                localStorage.setItem("jogadores", JSON.stringify(jogadoresExportar))
            }
        });
    }
    async InserirJogador(nomeJogador, idJogador) {
        let id = ""
        let posicao_j = ""
        let camisa = ""
        let jogadoresAnteriores = {}
        let novoJogador
        const q = query(collection(db, "time"), where("nome", "==", localStorage.getItem("timeAtualNome")));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === localStorage.getItem("timeAtualID")) {
                id = doc.id
                jogadoresAnteriores = doc.data().jogadores
            }
        });
        const qJogador = query(collection(db, "jogador"), where("nome", "==", nomeJogador));
        const querySnapshotJogador = await getDocs(qJogador);
        querySnapshotJogador.forEach((doc) => {
            if (doc.id === idJogador) {
                console.log(doc.data().posicao)
                camisa = doc.data().numero_camisa
                posicao_j = doc.data().posicao
            }
        });
        camisa = camisa === undefined ? "" : camisa
        novoJogador = {
            nome: nomeJogador,
            numero_camisa: camisa,
            posicao: posicao_j,
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
        }
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
            }
        }
        novoJogador = { [idJogador]: novoJogador }
        try {
            const timeDocRef = doc(db, "time", id)
            await updateDoc(timeDocRef, {
                "jogadores": {
                    ...jogadoresAnteriores,
                    ...novoJogador
                }
            });
            alert('jogador inserido ao time com sucesso!!');
        }
        catch (e) {
            alert("Falha ao cadastrar: " + e)
        }
        finally {
            window.location.reload()
        }
    }
    async AtualizarPasseJogador(idTime, aIncrementar, idJogador) {
        try {
            let inserirNovamenteID
            let local = [`jogadores.${idJogador}.passe.passe_A`, `jogadores.${idJogador}.passe.passe_B`, `jogadores.${idJogador}.passe.passe_C`, `jogadores.${idJogador}.passe.passe_D`]
            const timeDocRef = doc(db, "time", idTime)
            await updateDoc(timeDocRef, {
                [local[0]]: increment(aIncrementar[0]),
                [local[1]]: increment(aIncrementar[1]),
                [local[2]]: increment(aIncrementar[2]),
                [local[3]]: increment(aIncrementar[3])
            });
            inserirNovamenteID = await this.VerificarSeEhMisto(idTime, idJogador)
            if (inserirNovamenteID != "") {
                const timeDocRef = doc(db, "time", inserirNovamenteID)
                await updateDoc(timeDocRef, {
                    [local[0]]: increment(aIncrementar[0]),
                    [local[1]]: increment(aIncrementar[1]),
                    [local[2]]: increment(aIncrementar[2]),
                    [local[3]]: increment(aIncrementar[3])
                });
            }
        }
        catch (e) {
            alert("Falha ao inserir: " + e)
        }
    }
    async AtualizarSaqueJogador(idTime, ace, dentroFora, tipoSaque, idJogador) {
        try {
            let inserirNovamenteID
            let local = `jogadores.${idJogador}.${dentroFora}.${tipoSaque}`
            if (ace === "sim" && dentroFora === "saque_dentro") {
                let dividir = local.split(".")
                local = `${dividir[0]}.${dividir[1]}.${dividir[2]}.ace.${dividir[3]}`
            }
            const timeDocRef = doc(db, "time", idTime)
            await updateDoc(timeDocRef, {
                [local]: increment(1)
            });
            inserirNovamenteID = await this.VerificarSeEhMisto(idTime, idJogador)
            if (inserirNovamenteID != "") {
                const timeDocRef = doc(db, "time", inserirNovamenteID)
                await updateDoc(timeDocRef, {
                    [local]: increment(1)
                });
            }
        }
        catch (e) {
            alert("Falha ao inserir: " + e)
        }
    }
    async AtualizarAtaqueJogador(idTime, acerto, idJogador) {
        try {
            let inserirNovamenteID
            let local = `jogadores.${idJogador}.ataque`
            if (acerto === "acertado") {
                local += `.acertado`
            }
            else {
                local += ".errado"
            }
            const timeDocRef = doc(db, "time", idTime)
            await updateDoc(timeDocRef, {
                [local]: increment(1)
            });
            inserirNovamenteID = await this.VerificarSeEhMisto(idTime, idJogador)
            if (inserirNovamenteID != "") {
                const timeDocRef = doc(db, "time", inserirNovamenteID)
                await updateDoc(timeDocRef, {
                    [local]: increment(1)
                });
            }
        }
        catch (e) {
            alert("Falha ao inserir: " + e)
        }
    }
    async AtualizarBloqueioJogador(idTime, acerto, idJogador) {
        try {
            let inserirNovamenteID
            let local = `jogadores.${idJogador}.bloqueio`
            if (acerto === "ponto_adversario") {
                local += ".ponto_adversario"
            }
            else {
                local += ".ponto_bloqueando"
            }
            const timeDocRef = doc(db, "time", idTime)
            await updateDoc(timeDocRef, {
                [local]: increment(1)
            });
            inserirNovamenteID = await this.VerificarSeEhMisto(idTime, idJogador)
            if (inserirNovamenteID != "") {
                const timeDocRef = doc(db, "time", inserirNovamenteID)
                await updateDoc(timeDocRef, {
                    [local]: increment(1)
                });
            }
        }
        catch (e) {
            alert("Falha ao inserir: " + e)
        }
    }
    async AtualizarLevantamento(idTime, levantamento, idJogador) {
        try {
            let inserirNovamenteID
            let local = `jogadores.${idJogador}.levantou_para.${levantamento}`
            const timeDocRef = doc(db, "time", idTime)
            await updateDoc(timeDocRef, {
                [local]: increment(1)
            });
            inserirNovamenteID = await this.VerificarSeEhMisto(idTime, idJogador)
            if (inserirNovamenteID != "") {
                const timeDocRef = doc(db, "time", inserirNovamenteID)
                await updateDoc(timeDocRef, {
                    [local]: increment(1)
                });
            }
        }
        catch (e) {
            alert("Falha ao inserir: " + e)
        }
    }
    async VerificarSeEhMisto(idTime, idJogador, tipoInsercao, local, valor) {
        let idTimeAnterior = ""
        if (localStorage.getItem("sexo") === "Mis") {
            idTimeAnterior = await this.ResultadoQueryUltimoTimeDesteJogador(idJogador)
        }
        return idTimeAnterior
    }
    async ResultadoQueryUltimoTimeDesteJogador(idJogador) {
        let idTime
        const q = query(collection(db, "time"), orderBy("data_criacao"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data().sexo != "Mis") {
                console.log(doc.data().nome)
                Object.entries(doc.data().jogadores).forEach((jogador) => {
                    if (idJogador === jogador[0]) {
                        console.log(jogador[0])
                        idTime = doc.id
                    }
                })
            }
        })
        return idTime
    }
}