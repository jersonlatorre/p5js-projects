let CANVAS_SIZE = 1080
let s

function preload() {}

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	s = new S()
}

function draw() {
	scale(CANVAS_SIZE / 1080)
	background('white')
	s.draw()
}
