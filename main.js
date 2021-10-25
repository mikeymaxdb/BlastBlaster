const NUM_HEALTHY = 5
const NUM_BLAST = 5
const NUM_ROUNDS = 3

let rounds
let currentRound

function startGame() {
    document.getElementById('StartView').style.display = 'none'
    document.getElementById('Review').style.display = 'none'
    document.getElementById('GameView').style.display = 'flex'

    rounds = []
    currentRound = -1

    for (let i = 0; i < NUM_ROUNDS; i += 1) {
        const isHealthy = Math.round(Math.random())
        const limit = isHealthy ? NUM_HEALTHY : NUM_BLAST
        const index = Math.round(Math.random() * (limit - 1)) + 1

        rounds.push([index, isHealthy])
    }

    showNextRound()
}

function showNextRound() {
    currentRound += 1

    const round = rounds[currentRound]
    const imagePrefix = round[1] ? 'healthy_' : 'blast_'
    document.getElementById('TestImage').src = 'images/' + imagePrefix + round[0] + '.jpg'
}
