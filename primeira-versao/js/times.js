// Conexão com o banco de dados
import { timeInDB } from "./acesso_banco.js";
import { onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
// transformando campos em variáveis
const mostrarTimeMasculino = document.getElementById("times_masculinos")
const mostrarTimeFeminino = document.getElementById("times_femininos")
// colocando os times na página
onValue(timeInDB, function (snapshot) {
    let timeArray = Object.entries(snapshot.val())
    console.log(timeArray)
    for (let j = 0; j < timeArray.length; j++) {
        let timeAtual = timeArray[j]
        if (timeAtual[1].sexo = "M") {
            let botaoTime = document.createElement('button')
            botaoTime.id = `${timeAtual[0]}`
            botaoTime.onclick = IrParaPaginaDeInsercaoDeDados(botaoTime.id)
            let link = document.createElement('a')
            link.href = './inserir_informacoes.html'
            link.innerHTML = `${timeAtual[1].nome}`
            link.className = 'nav-link'
            botaoTime.appendChild(link)
            botaoTime.className = 'btn btn-primary'
            mostrarTimeMasculino.appendChild(botaoTime)
        }
        else if (timeAtual[1].sexo = "F") {
            let botaoTime = document.createElement('button')
            botaoTime.id = `${timeAtual[0]}`
            botaoTime.onclick = IrParaPaginaDeInsercaoDeDados(botaoTime.id)
            let link = document.createElement('a')
            link.href = './inserir_informacoes.html'
            link.innerHTML = `${timeAtual[1].nome}`
            link.className = 'nav-link'
            botaoTime.appendChild(link)
            botaoTime.className = 'btn btn-primary'
            mostrarTimeFeminino.appendChild(botaoTime)
        }
    }
})
function IrParaPaginaDeInsercaoDeDados(idTime) {
    localStorage.setItem("timeAtual", idTime)
}