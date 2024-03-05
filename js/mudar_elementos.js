// Receber os seletores
const containerItem = document.querySelectorAll(".containerItem")
document.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
});
document.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
});
containerItem.forEach((item) => {
    item.addEventListener("dragover", (e) => {
        const dragging = document.querySelector(".dragging");
        const apllyAfter = getNewPosition(item, e.clientY);
        if (apllyAfter) {
            apllyAfter.insertAdjacentElement("afterend", dragging);
        } else {
            item.prepend(dragging);
        }
    })
})
function getNewPosition(column, posY) {
    const cards = column.querySelectorAll(".itemArrastavel:not(.dragging)");
    let result;
    for (let refer_card of cards) {
        const box = refer_card.getBoundingClientRect();
        const boxCenter = box.y + box.height / 2
        if (posY >= boxCenter) result = refer_card;
    }
    return result;
}