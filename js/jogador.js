import { jogadorInDB } from "./acesso_banco.js";
import { push, getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
export class Jogador {
    constructor(idJogador) {
        this.idJogador = idJogador;
        this.atributos = {}
    }
    async DefinirAtibutos() {
        let jogadorProcurar = this.idJogador
        let atributos = {}
        let retorno = await onValue(jogadorInDB, function (snapshot) {
            let jogadoresArray = Object.entries(snapshot.val())
            for (let i = 0; i < jogadoresArray.length; i++) {
                let jogadorAtual = jogadoresArray[i]
                if (jogadorAtual[0] === jogadorProcurar) {
                    atributos = {
                        nome: jogadorAtual[1].nome,
                        numero_camisa: jogadorAtual[1].numero_camisa,
                        posicao: jogadorAtual[1].posicao,
                        sexo: jogadorAtual[1].sexo,
                        altura: jogadorAtual[1].altura,
                        peso: jogadorAtual[1].peso,
                        saque_fora: {
                            por_baixo: jogadorAtual[1].saque_fora.por_baixo,
                            lateral_asiatico: jogadorAtual[1].saque_fora.lateral_asiatico,
                            por_cima: jogadorAtual[1].saque_fora.por_cima,
                            viagem_fundo_do_mar: jogadorAtual[1].viagem_fundo_do_mar,
                            flutuante: jogadorAtual[1].saque_fora.flutuante,
                            hibrido_misto: jogadorAtual[1].saque_fora.hibrido_misto
                        },
                        saque_dentro: {
                            por_baixo: jogadorAtual[1].saque_dentro.por_baixo,
                            lateral_asiatico: jogadorAtual[1].saque_dentro.lateral_asiatico,
                            por_cima: jogadorAtual[1].saque_dentro.por_cima,
                            viagem_fundo_do_mar: jogadorAtual[1].viagem_fundo_do_mar,
                            flutuante: jogadorAtual[1].saque_dentro.flutuante,
                            hibrido_misto: jogadorAtual[1].saque_dentro.hibrido_misto,
                            ace: {
                                por_baixo: jogadorAtual[1].saque_dentro.ace.por_baixo,
                                lateral_asiatico: jogadorAtual[1].saque_dentro.ace.lateral_asiatico,
                                por_cima: jogadorAtual[1].saque_dentro.ace.por_cima,
                                viagem_fundo_do_mar: jogadorAtual[1].viagem_fundo_do_mar,
                                flutuante: jogadorAtual[1].saque_dentro.ace.flutuante,
                                hibrido_misto: jogadorAtual[1].saque_dentro.ace.hibrido_misto
                            }
                        }, passe: {
                            passe_A: jogadorAtual[1].passe.passe_A,
                            passe_B: jogadorAtual[1].passe.passe_B,
                            passe_C: jogadorAtual[1].passe.passe_C,
                            passe_D: jogadorAtual[1].passe.passe_D
                        },
                        ataque_paralelo: {
                            acertado: {
                                defendido: jogadorAtual[1].ataque_paralelo.acertado.defendido,
                                ponto: jogadorAtual[1].ataque_paralelo.acertado.ponto
                            },
                            errado: jogadorAtual[1].ataque_paralelo.errado
                        },
                        ataque_diagonal: {
                            acertado: {
                                defendido: jogadorAtual[1].ataque_diagonal.acertado.defendido,
                                ponto: jogadorAtual[1].ataque_diagonal.acertado.ponto
                            },
                            errado: jogadorAtual[1].ataque_diagonal.errado
                        }
                    }
                    if (jogadorAtual[1].posicao === "Levantador") {
                        atributos = {
                            ...atributos,
                            ...{
                                levantou_para: {
                                    ponta: jogadorAtual[1].levantou_para.ponta,
                                    centro: jogadorAtual[1].levantou_para.centro,
                                    oposto: jogadorAtual[1].levantou_para.oposto,
                                    pipe: jogadorAtual[1].levantou_para.pipe,
                                    errou: jogadorAtual[1].levantou_para.errou
                                }
                            }
                        };
                    }
                }
            }
        }
        );
        this.atributos = atributos
    }
    CadastrarJogador(nomeJogador, numeroCamisa, posicao, sexo, altura, peso,) {
        let valorCadastar = {
            nome: nomeJogador,
            numero_camisa: numeroCamisa,
            posicao: posicao,
            sexo: sexo,
            altura: altura,
            peso: peso,
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
        if (posicao === "Levantador") {
            valorCadastar = {
                ...valorCadastar,
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
        push(jogadorInDB, valorCadastar)
        alert("Jogador Cadastrado com Sucesso!!")
    }
    async AtualizarPasses(quantidadeNovosPasse_A, quantidadeNovosPasse_B, quantidadeNovosPasse_C, quantidadeNovosPasse_D) {
        const db = getDatabase();
        // A post entry.
        const postData = {
            passe_A: this.atributos.passe.passe_A + quantidadeNovosPasse_A,
            passe_B: this.atributos.passe.passe_A + quantidadeNovosPasse_B,
            passe_C: this.atributos.passe.passe_A + quantidadeNovosPasse_C,
            passe_D: this.atributos.passe.passe_A + quantidadeNovosPasse_D
        };
        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/jogador/' + this.idJogador + '/passe'] = postData;
        return await update(ref(db), updates);
    }
}