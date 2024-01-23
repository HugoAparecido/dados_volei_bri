import { db } from "./acesso_banco.js";
import { ShowLoading, HideLoading } from "./loading.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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
        } catch (e) {
            alert("Erro ao adicionar o documento: " + e);
            HideLoading();
        }
    }
    async MostrarTodosJogadores(mostrarJogador) {
        mostrarJogador().innerHTML = ""
        const querySnapshot = await getDocs(collection(db, "jogador"));
        querySnapshot.forEach((doc) => {
            mostrarJogador().innerHTML += `<tr>
            <td>
            ${doc.id}
            </td>
            <td>
            ${doc.data().nome}
            </td>
            <td>
            ${doc.data().numero_camisa}
            </td>
            <td>
            ${doc.data().posicao}
            </td>
            <td>
            ${doc.data().sexo}
            </td>
            </tr>`
        });
    }
}