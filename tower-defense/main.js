let game

function setup() {
	createCanvas(500, 500)
	game = new Game()
}

function draw() {
	scale(width / 500)
	clear()
	background('rgba(0, 0, 0, 0.15)')

	game.draw()
}
