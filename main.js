const NUM_HEALTHY = 5
const NUM_BLAST = 5
const NUM_ROUNDS = 3

let rounds
let currentRound
let score

function startGame() {
    document.getElementById('StartView').style.display = 'none'
    document.getElementById('Review').style.display = 'none'
    document.getElementById('GameView').style.display = 'flex'

    rounds = []
    currentRound = -1
    score = 0

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

    if (currentRound < rounds.length) {
        const round = rounds[currentRound]
        const imagePrefix = round[1] ? 'healthy_' : 'blast_'
        document.getElementById('TestImage').src = 'images/' + imagePrefix + round[0] + '.jpg'
    } else {
        showReview()
    }
}

function submit(guess) {
    if (rounds[currentRound][1] === guess) {
        score += 1
    }
    showNextRound()
}

function showReview() {
    document.getElementById('GameView').style.display = 'none'
    document.getElementById('Review').style.display = 'flex'

    document.getElementById('Score').innerHTML = score + ' / ' + NUM_ROUNDS
}
