let game

function setup() {
	pixelDensity(1)
	createCanvas(640, 640)
	game = new Game()
}

function draw() {
	scale(width / 500)
	game.draw()
}
