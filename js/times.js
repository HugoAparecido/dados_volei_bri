// Conexão com o banco de dados
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
const appSettings = {
    databaseURL: "https://voleibri-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const timeInDB = ref(database, "time")
// transformando campos em variáveis
const mostrarTimeMasculino = document.getElementById("times_masculinos")
const mostrarTimeFeminino = document.getElementById("times_femininos")
// colocando valores nos selects
onValue(timeInDB, function (snapshot) {
    let timeArray = Object.values(snapshot.val())
    for (let j = 0; j < timeArray.length; j++) {
        let timeAtual = timeArray[j]
        if (timeAtual.sexo = "M") {
            mostrarTimeMasculino.innerHTML += `<button class="btn btn-primary"><a class="nav-link" ./inserir_informacoes.html>${timeAtual.nome}</a></button>`
        }
        else if (timeAtual.sexo = "F") {
            mostrarTimeFeminino.innerHTML += `<button class="btn btn-primary"><a class="nav-link">${timeAtual.nome}</a></button>`
        }
    }
})