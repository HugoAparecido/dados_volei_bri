import { db } from "./acesso_banco.js";
import { ShowLoading, HideLoading } from "./loading.js";
import { collection, query, where, orderBy, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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
                lateral_asiatico: 0,
                por_cima: 0,
                viagem_fundo_do_mar: 0,
                flutuante: 0,
                hibrido_misto: 0
            },
            saque_dentro: {
                por_baixo: 0,
                lateral_asiatico: 0,
                por_cima: 0,
                viagem_fundo_do_mar: 0,
                flutuante: 0,
                hibrido_misto: 0,
                ace: {
                    por_baixo: 0,
                    lateral_asiatico: 0,
                    por_cima: 0,
                    viagem_fundo_do_mar: 0,
                    flutuante: 0,
                    hibrido_misto: 0
                }
            }, passe: {
                passe_A: 0,
                passe_B: 0,
                passe_C: 0,
                passe_D: 0
            },
            ataque_paralelo: {
                acertado: {
                    defendido: 0,
                    ponto: 0
                },
                errado: 0
            },
            ataque_diagonal: {
                acertado: {
                    defendido: 0,
                    ponto: 0
                },
                errado: 0
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
    SalvarNovoJogadorAoTime() { }
    async PopularNovosJogadores(adicionarJogador) {
        const q = query(collection(db, "jogador"), orderBy("nome"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (!localStorage.getItem("jogadores").includes(doc.id)) {
                adicionarJogador.innerHTML += `<option value="${doc.id}">${doc.data().numero_camisa} ${doc.data().nome}</option>`
            }
            // let divJogador = document.createElement("div")
            // let spanInformacoesJogador = document.createElement("span")
            // spanInformacoesJogador.innerHTML = `${doc.data().posicao}: ${doc.data().numero_camisa} ${doc.data().nome}`
            // divJogador.appendChild(spanInformacoesJogador)
            // let divPasses = document.createElement("div")
            // divPasses.className = "passes"
            // divPasses.innerHTML += `<span>Passe: </span>`
            // divPasses.innerHTML += CriarInputsPasses(doc.id, "A")
            // divPasses.innerHTML += CriarInputsPasses(doc.id, "B")
            // divPasses.innerHTML += CriarInputsPasses(doc.id, "C")
            // divPasses.innerHTML += CriarInputsPasses(doc.id, "D")
            // divJogador.appendChild(divPasses)
            // colocarJogadoresDoTime.appendChild(divJogador)
            // document.getElementById(`${doc.id}_passe_A`).value = 0
            // document.getElementById(`${doc.id}_passe_B`).value = 0
            // document.getElementById(`${doc.id}_passe_C`).value = 0
            // document.getElementById(`${doc.id}_passe_D`).value = 0
            // document.getElementById(`${doc.id}_label_A`).addEventListener("click", () => { document.getElementById(`${doc.id}_passe_A`).value++ })
            // document.getElementById(`${doc.id}_label_B`).addEventListener("click", () => { document.getElementById(`${doc.id}_passe_B`).value++ })
            // document.getElementById(`${doc.id}_label_C`).addEventListener("click", () => { document.getElementById(`${doc.id}_passe_C`).value++ })
            // document.getElementById(`${doc.id}_label_D`).addEventListener("click", () => { document.getElementById(`${doc.id}_passe_D`).value++ })

            if (doc.id === localStorage.getItem("timeAtualID")) {
                timeExportado.innerHTML = `Time: ${doc.data().nome}`
                timeSexo.innerHTML = `${doc.data().sexo === "M" ? "Sexo: Masculino" : "Sexo: Feminino"}`
                localStorage.setItem("jogadores", doc.data().jogadores)
            }
        })

    };
    CriarInputsPasses(idJogador, tipoPasse) {
        let elemento = `<input class="form-control input_number" type="number" min="0" name="${idJogador}_passe_${tipoPasse}" id="${idJogador}_passe_${tipoPasse}" readonly><label class="form-label" for="${idJogador}_passe_${tipoPasse}" id="${idJogador}_label_${tipoPasse}">${tipoPasse}+</label>`
        return elemento
    }
}