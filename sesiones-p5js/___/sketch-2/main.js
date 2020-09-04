let font
let letters

function preload() {
	font = loadFont('assets/cocogoose.ttf')
	letters = loadImage('assets/letters.png')
}

function setup() {
	createCanvas(600, 600)
}

function draw() {
	image(letters, 0, 0)
	push()
	blendMode(EXCLUSION)
	fill('white')
	rectMode(CENTER)
	square(mouseX, mouseY, 200)
	pop()
}
