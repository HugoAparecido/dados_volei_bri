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
    return `<option value="${id}">${
      numero == undefined ? " " : numero
    }: ${nome} (${posicao})</option>`;
  }
  DivJogador(posicao, numero, nome) {
    let divJogador = `<div class="itemArrastavel jogador_dados" draggable="true">
                        <h3>${posicao}: ${
      numero == undefined ? " " : numero
    } ${nome}</h3>
                        <div class="insercao_individual">`;
    if (posicao != "Levantador")
      divJogador += `<div class="passes">
                        <span><strong>Pas: </strong></span>
                    </div>`;
    divJogador += `</div></div>`;
    return;
  }
}
