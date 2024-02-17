// Criar uma div que ocupa a página toda exercendo a função de tela de carregamento
export function ShowLoading() {
    const div = document.createElement("div")
    div.classList.add("loading", "centralize")
    const span = document.createElement("span")
    span.innerText = "Carregando..."
    div.appendChild(span)
    document.body.appendChild(div)
}
// removendo a div de carregamento
export function HideLoading() {
    const loadings = document.getElementsByClassName("loading");
    if (loadings.length) {
        loadings[0].remove();
    }
}