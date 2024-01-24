import { db } from "./acesso_banco.js";
import { ShowLoading, HideLoading } from "./loading.js";
import { collection, query, where, updateDoc, addDoc, doc, getDocs, arrayUnion } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
export class Time {
    async CadastrarTime(nomeConst, sexoConst) {
        ShowLoading();
        try {
            const docRef = await addDoc(collection(db, "time"), {
                nome: String(nomeConst.value),
                sexo: sexoConst.value,
                jogadores: []
            });
            alert("Time cadastrado com sucesso com o ID: " + docRef.id);
            HideLoading();
        } catch (e) {
            alert("Erro ao adicionar o documento: " + e);
            HideLoading();
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
    async OrdenarTimesPorSexo(mostrarTimeMasculino, mostrarTimeFeminino) {
        const querySnapshot = await getDocs(collection(db, "time"));
        querySnapshot.forEach((doc) => {
            if (doc.data().sexo == 'M') {
                let botaoTime = document.createElement('button')
                botaoTime.id = `${doc.id}`
                botaoTime.onclick = this.IrParaPaginaDeInsercaoDeDados(doc.data().nome, doc.id)
                let link = document.createElement('a')
                link.href = './inserir_informacoes.html'
                link.innerHTML = `${doc.data().nome}`
                link.className = 'nav-link'
                botaoTime.appendChild(link)
                botaoTime.className = 'btn btn-primary'
                mostrarTimeMasculino().appendChild(botaoTime)
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
                mostrarTimeFeminino().appendChild(botaoTime)
            }
        });
    }
    IrParaPaginaDeInsercaoDeDados(nomeTime, idTime) {
        localStorage.clear();
        localStorage.setItem("timeAtualID", idTime)
        localStorage.setItem("timeAtualNome", nomeTime)
    }
    async PopularCabecalhoInserirInformacoes(timeExportado, timeSexo) {
        const q = query(collection(db, "time"), where("nome", "==", localStorage.getItem("timeAtualNome")));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === localStorage.getItem("timeAtualID")) {
                timeExportado.innerHTML = `Time: ${doc.data().nome}`
                timeSexo.innerHTML = `${doc.data().sexo === "M" ? "Sexo: Masculino" : "Sexo: Feminino"}`
                localStorage.setItem("jogadores", JSON.stringify(doc.data().jogadores))
            }
        });
    }
    async InserirJogador(nomeJogador, idJogador) {
        let id = ""
        const q = query(collection(db, "time"), where("nome", "==", localStorage.getItem("timeAtualNome")));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === localStorage.getItem("timeAtualID")) {
                id = doc.id
            }
        });
        try {
            const timeDocRef = doc(db, "time", id)
            await updateDoc(timeDocRef, {
                "jogadores": arrayUnion({ nome: nomeJogador, id: idJogador })
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
}