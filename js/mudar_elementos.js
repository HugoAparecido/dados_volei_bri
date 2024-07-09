// Receber os seletores
const containerItem = document.querySelectorAll(".containerItem")
const containerItemPrncipal = document.querySelectorAll(".containerItemPrincipal")
//Quando um item começa a ser arrastado (dragstart), ele adiciona a classe CSS .dragging ao elemento que está sendo arrastado (e.target).
document.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
});
//Quando o arraste é encerrado (dragend), a classe .dragging é removida do elemento (e.target), indicando que ele não está mais sendo arrastado.
document.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
});
//O evento dragover ocorre quando um elemento arrastado é movido sobre um elemento alvo (item).
containerItem.forEach((item) => {
    item.addEventListener("dragover", (e) => {
        //Seleciona o elemento que está sendo arrastado.
        const dragging = document.querySelector(".dragging");
        //Chama a função getNewPosition para determinar onde o elemento arrastado deve ser posicionado em relação ao item alvo e à posição vertical do cursor (e.clientY).
        const apllyAfter = getNewPosition(item, e.clientY);
        //Verifica se getNewPosition retornou um elemento alvo (applyAfter). Se sim, insere o elemento arrastado após esse elemento alvo (applyAfter). Caso contrário, insere o elemento arrastado no início de item.
        if (apllyAfter) {
            apllyAfter.insertAdjacentElement("afterend", dragging);
        } else {
            item.prepend(dragging);
        }
    })
})
//Esta função recebe dois parâmetros: column, que é o elemento alvo onde o item está sendo arrastado, e posY, a posição vertical do cursor.
function getNewPosition(column, posY) {
    //Seleciona todos os elementos com a classe .itemArrastavel dentro de column, excluindo aqueles que têm a classe .dragging (que é o elemento atualmente arrastado).
    const cards = column.querySelectorAll(".itemArrastavel:not(.dragging)");
    let result;
    //A função itera sobre esses elementos (refer_card) e verifica se posY está maior ou igual ao centro vertical do retângulo (boxCenter) do refer_card. Se for verdadeiro, refer_card é definido como result.
    for (let refer_card of cards) {
        const box = refer_card.getBoundingClientRect();
        const boxCenter = box.y + box.height / 2
        if (posY >= boxCenter) result = refer_card;
    }
    //A função retorna o refer_card onde posY é maior ou igual ao centro vertical, ou undefined se nenhum refer_card atender à condição.
    return result;
}
//O evento dragover ocorre quando um elemento arrastado é movido sobre um elemento alvo (item).
containerItemPrncipal.forEach((item) => {
    item.addEventListener("dragover", (e) => {
        if (item.textContent.trim() === '') {
            //Seleciona o elemento que está sendo arrastado.
            const dragging = document.querySelector(".dragging");
            //Chama a função getNewPosition para determinar onde o elemento arrastado deve ser posicionado em relação ao item alvo e à posição vertical do cursor (e.clientY).
            const apllyAfter = getNewPosition(item, e.clientY);
            //Verifica se getNewPosition retornou um elemento alvo (applyAfter). Se sim, insere o elemento arrastado após esse elemento alvo (applyAfter). Caso contrário, insere o elemento arrastado no início de item.
            if (apllyAfter) {
                apllyAfter.insertAdjacentElement("afterend", dragging);
            } else {
                item.prepend(dragging);
            }
        }
    })
})