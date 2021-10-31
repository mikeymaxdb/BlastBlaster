const NUM_HEALTHY = 40
const NUM_BLAST = 10
const NUM_ROUNDS = 10

const rotations = [
    'rotate0',
    'rotate90',
    'rotate180',
    'rotate270',
]

const flips = [
    'noVFlip',
    'vFlip',
    'noHFlip',
    'hFlip',
]

/*
 * A round is:
 * [0] Image index
 * [1] If it is healthy (1) or not (0)
 * [2] CSS classname modifiers to flip/rotate the image
 */

let rounds // Array of rounds for the test
let currentRound // Index of current round
let score

function startGame() {
    // Reset views
    document.getElementById('StartView').style.display = 'none'
    document.getElementById('Review').style.display = 'none'
    document.getElementById('GameView').style.display = 'flex'

    // Reset test state
    rounds = []
    currentRound = -1
    score = 0

    // Generate rounds
    for (let i = 0; i < NUM_ROUNDS; i += 1) {
        // 0 is unhealthy, 1 is healthy
        const isHealthy = Math.round(Math.random())
        // Number of images to choose from
        const limit = isHealthy ? NUM_HEALTHY : NUM_BLAST
        // Generate an image index
        const index = Math.round(Math.random() * (limit - 1)) + 1

        // Random flip or rotation
        const rotation = rotations[Math.round(Math.random() * (rotations.length - 1))]
        const flip = flips[Math.round(Math.random() * (flips.length - 1))]
        const modifier = rotation + ' ' + flip

        // Build the round as definder above
        rounds.push([index, isHealthy, modifier])
    }

    showNextRound()
}

function showNextRound() {
    currentRound += 1

    if (currentRound < rounds.length) {
        const round = rounds[currentRound]
        const imagePrefix = round[1] ? 'healthy_' : 'blast_'

        document.getElementById('TestImage').src = 'images/' + imagePrefix + round[0] + '.jpg'
        document.getElementById('TestImage').className = round[2]
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
