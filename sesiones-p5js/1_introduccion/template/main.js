let hue = 0
let tamaño = 50

function setup() {
	createCanvas(600, 600)
	colorMode(HSB, 100, 100, 100)
	frameRate(10)
}

function draw() {
	hue = 10 * parseInt(random(100) / 10)
	tamaño = random(50, 200)

	background((hue + 50) % 100, 100, 100)

	let x = width * noise(millis() / 1000)
	let y = height * noise(millis() / 1000 + 10)
	fill(hue, 100, 100)
	noStroke()
	circle(x, y, tamaño)

	// stroke('black')
	// strokeWeight(5)
	// line(300, 300, x, y)
}

function mousePressed() {}
