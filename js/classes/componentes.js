export class Componentes{
  TabelaJogadores(id, nome, numero, posicao, sexo){
    return `<tr>
              <td>${id}</td>
              <td>${nome}</td>
              <td>${numero}</td>
              <td>${posicao}</td>
              <td>${sexo}</td>
            </tr>`
  }
  SelectJogadores(id, numero , nome, posicao){
    return `<option value="${id}">${numero == undefined ? " " : numero}: ${nome} (${posicao})</option>`;
  }
}