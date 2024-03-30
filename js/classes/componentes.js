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
  DivJogador(posicao, numero, nome) {
    let divJogador = `<div class="itemArrastavel jogador_dados" draggable="true">
                        <h3>${posicao}: ${numero == undefined ? " " : numero} ${nome}</h3>
                        <div class="insercao_individual">`;
    if (posicao != "Levantador")
      divJogador += `<div class="passes">
                              <span><strong>Pas: </strong></span>
                              <div>
                                <span id="${id}_diminuir_passe_A" class="atributos_span">-A</span>
                                <input type="number" class="input_number" min="0" name="${id}_passe_A" id="${id}_passe_A"/>
                                <span id="${id}_aumentar_passe_A" class="atributos_span">+A</span>
                              </div>
                              <div>
                                <span id="${id}_diminuir_passe_B" class="atributos_span">-B</span>
                                <input type="number" class="input_number" min="0" name="${id}_passe_B" id="${id}_passe_B"/>
                                <span id="${id}_aumentar_passe_B" class="atributos_span">+B</span>
                              </div>
                              <div>
                                <span id="${id}_diminuir_passe_C" class="atributos_span">-C</span>
                                <input type="number" class="input_number" min="0" name="${id}_passe_C" id="${id}_passe_C"/>
                                <span id="${id}_aumentar_passe_C" class="atributos_span">+C</span>
                              </div>
                              <div>
                                <span id="${id}_diminuir_passe_D" class="atributos_span">-D</span>
                                <input type="number" class="input_number" min="0" name="${id}_passe_D" id="${id}_passe_D"/>
                                <span id="${id}_aumentar_passe_D" class="atributos_span">+D</span>
                              </div>
                      </div>`;
    if (posicao != "Líbero")
      divJogador += `</div>
                      </div>`;
    return;
  }
}
