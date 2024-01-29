import { db } from "./acesso_banco.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
export class Graficos {
    async PasseTime(idTime, nomeTime, localGrafico) {
        const q = query(collection(db, "time"), where("nome", "==", nomeTime));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === idTime) {
                let jogadores = Object.entries(doc.data().jogadores)
                let passeA = 0
                let passeB = 0
                let passeC = 0
                let passeD = 0
                jogadores.forEach((jogador) => {
                    passeA += jogador[1].passe.passe_A
                    passeB += jogador[1].passe.passe_B
                    passeC += jogador[1].passe.passe_C
                    passeD += jogador[1].passe.passe_D
                })
                const canva = document.createElement('canvas')
                canva.id = 'saqueChart'
                localGrafico.appendChild(canva)
                const ctx = document.getElementById("saqueChart")
                const data = {
                    labels: [
                        'Passe A',
                        'Passe B',
                        'Passe C',
                        'Passe D'
                    ],
                    datasets: [{
                        label: 'Passes',
                        data: [passeA, passeB, passeC, passeD],
                        backgroundColor: [
                            'rgb(0, 37, 228)',
                            'rgb(2, 183, 86)',
                            'rgb(230, 197, 1)',
                            'rgb(242, 92, 5)'
                        ],
                        hoverOffset: 4
                    }]
                };
                const config = {
                    type: 'pie',
                    data: data,
                };
                new Chart(ctx, config);
            }
        });
    }
}