let font

function preload() {
	font = loadFont('assets/cocogoose.ttf')
}

function setup() {
	createCanvas(600, 600)
	colorMode(HSB)
	textFont(font)
	textAlign(CENTER, CENTER)
	textSize(100)
}

function draw() {
	background('white')

	let x = constrain(mouseX, 0, 600)
	let factor = map(x, 0, 600, 0, 0.1)
	let points = font.textToPoints('hola', 185, 330, 100, {
		sampleFactor: factor
	})

	fill('red')
	beginShape()
	points.forEach((p) => {
		circle(p.x, p.y, 20)
		// curveVertex(p.x, p.y)
	})
	endShape(CLOSE)
}
