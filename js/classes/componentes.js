export class Componentes {
  TabelaJogadores(id, nome, numero, posicao, sexo) {
    return `<tr>
              <td>${id}</td>
              <td>${nome}</td>
              <td>${numero}</td>
              <td>${posicao}</td>
              <td>${sexo}</td>
            </tr>`;
  }
  SelectJogadores(id, numero, nome, posicao) {
    return `<option value="${id}">${numero == undefined ? " " : numero}: ${nome} (${posicao})</option>`;
  }
  DivJogador(id, posicao, numero, nome) {
    let divJogador = `<div class="itemArrastavel jogador_dados" draggable="true">
                        <h3>${posicao}: ${numero == undefined ? " " : numero} ${nome}</h3>
                        <div class="insercao_individual">
                          <div class="defesa">
                            <span><strong>Def: </strong></span>
                            <div>
                              <span id="${id}_aumentar_defesa" class="atributos_span" onclick="document.getElementById('${id}_defesa').value++">+</span>
                              <input type="number" value="0" readonly class="input_number" name="${id}_defesa" id="${id}_defesa"/>
                              <span id="${id}_diminuir_defesa" class="atributos_span" onclick="document.getElementById('${id}_defesa').value == 0 ? document.getElementById('${id}_defesa').value = 0 : document.getElementById('${id}_defesa').value--">-</span>
                            </div>
                          </div>`;
    if (posicao != "Levantador")
      divJogador += `<div class="passes">
                              <span><strong>Pas: </strong></span>
                              <div>
                                <span id="${id}_aumentar_passe_A" class="atributos_span"  onclick="document.getElementById('${id}_passe_A').value++">+A</span>
                                <input type="number" value="0" readonly class="input_number" min="0" name="${id}_passe_A" id="${id}_passe_A"/>
                                <span id="${id}_diminuir_passe_A" class="atributos_span"  onclick="document.getElementById('${id}_passe_A').value == 0 ? document.getElementById('${id}_passe_A').value = 0 : document.getElementById('${id}_passe_A').value--">-A</span>
                              </div>
                              <div>
                                <span id="${id}_aumentar_passe_B" class="atributos_span"  onclick="document.getElementById('${id}_passe_B').value++">+B</span>
                                <input type="number" value="0" readonly class="input_number" min="0" name="${id}_passe_B" id="${id}_passe_B"/>
                                <span id="${id}_diminuir_passe_B" class="atributos_span"  onclick="document.getElementById('${id}_passe_B').value == 0 ? document.getElementById('${id}_passe_B').value = 0 : document.getElementById('${id}_passe_B').value--">-B</span>
                              </div>
                              <div>
                                <span id="${id}_aumentar_passe_C" class="atributos_span"  onclick="document.getElementById('${id}_passe_C').value++">+C</span>
                                <input type="number" value="0" readonly class="input_number" min="0" name="${id}_passe_C" id="${id}_passe_C"/>
                                <span id="${id}_diminuir_passe_C" class="atributos_span"  onclick="document.getElementById('${id}_passe_C').value == 0 ? document.getElementById('${id}_passe_C').value = 0 : document.getElementById('${id}_passe_C').value--">-C</span>
                              </div>
                              <div>
                                <span id="${id}_aumentar_passe_D" class="atributos_span"  onclick="document.getElementById('${id}_passe_D').value++">+D</span>
                                <input type="number" value="0" readonly class="input_number" min="0" name="${id}_passe_D" id="${id}_passe_D"/>
                                <span id="${id}_diminuir_passe_D" class="atributos_span"  onclick="document.getElementById('${id}_passe_D').value == 0 ? document.getElementById('${id}_passe_D').value = 0 : document.getElementById('${id}_passe_D').value--">-D</span>
                              </div>
                      </div>`;
    if (posicao != "Líbero")
      divJogador += `<div class="saques">
                      <strong><span>Saq: </span></strong>
                      <div>
                        <span>Flu</span>
                        <span id="${id}_aumentar_saque_flutuante" class="atributos_span"  onclick="document.getElementById('${id}_saque_flutuante').value++">+</span>
                        <input type="number" value="0" readonly class="input_number" min="0" name="${id}_saque_flutuante" id="${id}_saque_flutuante"/>
                        <span id="${id}_diminuir_saque_flutuante" class="atributos_span"  onclick="document.getElementById('${id}_saque_flutuante').value == 0 ? document.getElementById('${id}_saque_flutuante').value = 0 : document.getElementById('${id}_saque_flutuante').value--">-</span>
                      </div>
                      <div>
                        <span>ACE</span>
                        <span id="${id}_aumentar_saque_ace" class="atributos_span"  onclick="document.getElementById('${id}_saque_ace').value++">+</span>
                        <input type="number" value="0" readonly class="input_number" min="0" name="${id}_saque_ace" id="${id}_saque_ace"/>
                        <span id="${id}_diminuir_saque_ace" class="atributos_span"  onclick="document.getElementById('${id}_saque_ace').value == 0 ? document.getElementById('${id}_saque_ace').value = 0 : document.getElementById('${id}_saque_ace').value--">-</span>
                      </div>
                      <div>
                        <span>Via</span>
                        <span id="${id}_aumentar_saque_viagem" class="atributos_span"  onclick="document.getElementById('${id}_saque_viagem').value++">+</span>
                        <input type="number" value="0" readonly class="input_number" min="0" name="${id}_saque_viagem" id="${id}_saque_viagem"/>
                        <span id="${id}_diminuir_saque_viagem" class="atributos_span"  onclick="document.getElementById('${id}_saque_viagem').value == 0 ? document.getElementById('${id}_saque_viagem').value = 0 : document.getElementById('${id}_saque_viagem').value--">-</span>
                      </div>
                      <div>
                        <span>Cima</span>
                        <span id="${id}_aumentar_saque_por_cima" class="atributos_span"  onclick="document.getElementById('${id}_saque_por_cima').value++">+</span>
                        <input type="number" value="0" readonly class="input_number" min="0" name="${id}_saque_por_cima" id="${id}_saque_por_cima"/>
                        <span id="${id}_diminuir_saque_por_cima" class="atributos_span"  onclick="document.getElementById('${id}_saque_por_cima').value == 0 ? document.getElementById('${id}_saque_por_cima').value = 0 : document.getElementById('${id}_saque_por_cima').value--">-</span>
                      </div>
                      <div>
                        <span>Fora</span>
                        <span id="${id}_aumentar_saque_fora" class="atributos_span"  onclick="document.getElementById('${id}_saque_fora').value++">+</span>
                        <input type="number" value="0" readonly class="input_number" min="0" name="${id}_saque_fora" id="${id}_saque_fora"/>
                        <span id="${id}_diminuir_saque_fora" class="atributos_span"  onclick="document.getElementById('${id}_saque_fora').value == 0 ? document.getElementById('${id}_saque_fora').value = 0 : document.getElementById('${id}_saque_fora').value--">-</span>
                      </div>
                    </div>
                    <div class="ataques">
                      <strong><span>Ataq: </span></strong>
                      <div>
                        <span>Dentro</span>
                        <span id="${id}_aumentar_ataque_acerto" class="atributos_span"  onclick="document.getElementById('${id}_ataque_acerto').value++">+</span>
                        <input type="number" value="0" readonly class="input_number" min="0" name="${id}_ataque_acerto" id="${id}_ataque_acerto"/>
                        <span id="${id}_diminuir_ataque_acerto" class="atributos_span"  onclick="document.getElementById('${id}_ataque_acerto').value == 0 ? document.getElementById('${id}_ataque_acerto').value = 0 : document.getElementById('${id}_ataque_acerto').value--">-</span>
                      </div>
                      <div>
                        <span>Fora</span>
                        <span id="${id}_aumentar_ataque_erro" class="atributos_span"  onclick="document.getElementById('${id}_ataque_erro').value++">+</span>
                        <input type="number" value="0" readonly class="input_number" min="0" name="${id}_ataque_erro" id="${id}_ataque_erro"/>
                        <span id="${id}_diminuir_ataque_erro" class="atributos_span"  onclick="document.getElementById('${id}_ataque_erro').value == 0 ? document.getElementById('${id}_ataque_erro').value = 0 : document.getElementById('${id}_ataque_erro').value--">-</span>
                      </div>
                    </div>
                    <div class="bloqueios">
                      <strong><span>Bloq: </span></strong>
                      <div>
                        <span>Convertido</span>
                        <span id="${id}_aumentar_bloqueio_ponto_este" class="atributos_span"  onclick="document.getElementById('${id}_bloqueio_ponto_este').value++">+</span>
                        <input type="number" value="0" readonly class="input_number" min="0" name="${id}_bloqueio_ponto_este" id="${id}_bloqueio_ponto_este"/>
                        <span id="${id}_diminuir_bloqueio_ponto_este" class="atributos_span"  onclick="document.getElementById('${id}_bloqueio_ponto_este').value == 0 ? document.getElementById('${id}_bloqueio_ponto_este').value = 0 : document.getElementById('${id}_bloqueio_ponto_este').value--">-</span>
                      </div>
                      <div>
                        <span>Errado</span>
                        <span id="${id}_aumentar_bloqueio_ponto_adversario" class="atributos_span"  onclick="document.getElementById('${id}_bloqueio_ponto_adversario').value++">+</span>
                        <input type="number" value="0" readonly class="input_number" min="0" name="${id}_bloqueio_ponto_adversario" id="${id}_bloqueio_ponto_adversario"/>
                        <span id="${id}_diminuir_bloqueio_ponto_adversario" class="atributos_span"  onclick="document.getElementById('${id}_bloqueio_ponto_adversario').value == 0 ? document.getElementById('${id}_bloqueio_ponto_adversario').value = 0 : document.getElementById('${id}_bloqueio_ponto_adversario').value--">-</span>
                      </div>
                    </div>`
    if (posicao === "Levantador")
      divJogador += `<div class="levantamentos">
                      <strong><span>Levant: </span></strong>
                      <div>
                        <span>Ponta</span>
                        <span id="${id}_aumentar_levantamento_ponta" class="atributos_span"  onclick="document.getElementById('${id}_levantamento_ponta').value++">+</span>
                        <input type="number" value="0" readonly class="input_number" min="0" name="${id}_levantamento_ponta" id="${id}_levantamento_ponta"/>
                        <span id="${id}_diminuir_levantamento_ponta" class="atributos_span"  onclick="document.getElementById('${id}_levantamento_ponta').value == 0 ? document.getElementById('${id}_levantamento_ponta').value = 0 : document.getElementById('${id}_levantamento_ponta').value--">-</span>
                      </div>
                      <div>
                        <span>Pipe</span>
                        <span id="${id}_aumentar_levantamento_pipe" class="atributos_span"  onclick="document.getElementById('${id}_levantamento_pipe').value++">+</span>
                        <input type="number" value="0" readonly class="input_number" min="0" name="${id}_levantamento_pipe" id="${id}_levantamento_pipe"/>
                        <span id="${id}_diminuir_levantamento_pipe" class="atributos_span"  onclick="document.getElementById('${id}_levantamento_pipe').value == 0 ? document.getElementById('${id}_levantamento_pipe').value = 0 : document.getElementById('${id}_levantamento_pipe').value--">-</span>
                      </div>
                      <div>
                        <span>Centro</span>
                        <span id="${id}_aumentar_levantamento_centro" class="atributos_span"  onclick="document.getElementById('${id}_levantamento_centro').value++">+</span>
                        <input type="number" value="0" readonly class="input_number" min="0" name="${id}_levantamento_centro" id="${id}_levantamento_centro"/>
                        <span id="${id}_diminuir_levantamento_centro" class="atributos_span"  onclick="document.getElementById('${id}_levantamento_centro').value == 0 ? document.getElementById('${id}_levantamento_centro').value = 0 : document.getElementById('${id}_levantamento_centro').value--">-</span>
                      </div>
                      <div>
                        <span>Oposto</span>
                        <span id="${id}_aumentar_levantamento_oposto" class="atributos_span"  onclick="document.getElementById('${id}_levantamento_oposto').value++">+</span>
                        <input type="number" value="0" readonly class="input_number" min="0" name="${id}_levantamento_oposto" id="${id}_levantamento_oposto"/>
                        <span id="${id}_diminuir_levantamento_oposto" class="atributos_span"  onclick="document.getElementById('${id}_levantamento_oposto').value == 0 ? document.getElementById('${id}_levantamento_oposto').value = 0 : document.getElementById('${id}_levantamento_oposto').value--">-</span>
                      </div>
                      <div>
                        <span>Errou</span>
                        <span id="${id}_aumentar_levantamento_errou" class="atributos_span"  onclick="document.getElementById('${id}_levantamento_errou').value++">+</span>
                        <input type="number" value="0" readonly class="input_number" min="0" name="${id}_levantamento_errou" id="${id}_levantamento_errou"/>
                        <span id="${id}_diminuir_levantamento_errou" class="atributos_span"  onclick="document.getElementById('${id}_levantamento_errou').value == 0 ? document.getElementById('${id}_levantamento_errou').value = 0 : document.getElementById('${id}_levantamento_errou').value--">-</span>
                      </div>
                    </div>`
    divJogador += `</div>
                      </div>`;
    return divJogador;
  }
}
