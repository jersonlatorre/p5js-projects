let game

function setup() {
	pixelDensity(1)
	createCanvas(500, 500)
	game = new Game()
}

function draw() {
	// if (!focused) return
	scale(width / 500)
	game.draw()
}
