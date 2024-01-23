export function ShowLoading() {
    const div = document.createElement("div")
    div.classList.add("loading", "centralize")
    const label = document.createElement("span")
    label.innerText = "Carregando..."
    div.appendChild(label)
    document.body.appendChild(div)
}
export function HideLoading() {
    const loadings = document.getElementsByClassName("loading");
    if (loadings.length) {
        loadings[0].remove();
    }
}