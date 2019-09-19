let angle = 0

function setup() {
	createCanvas(600, 600)
	colorMode(HSB)
	noStroke()
	rectMode(CENTER)
}

function draw() {
	background(255)
	push()
	translate(width / 2, height / 2)
	angle += 0.01
	rotate(angle)
	strokeWeight(0.3)
	fractal(0, 0, 300)
	pop()
}

function fractal(x, y, radio) {
	if (radio < 10) return

	let distance = dist(x, y, 0, 0)
	let hue = map(distance, 0, height * 0.6, 255, 0)
	let p = (1 + sin(angle * 5)) * .5
	let q = 1 + .5 * p
	fill(hue, 255, 255, 0.8)
	circle(x, y, radio * q)
	fill(hue, 0, 255, 1)
	circle(x, y, radio * 0.7)
	fill(hue, 0, 0, 0.8)
	circle(x, y, radio * 0.3)
	fractal(x - radio, y, radio / 2)
	fractal(x + radio, y, radio / 2)
	fractal(x, y - radio, radio / 2)
	fractal(x, y + radio, radio / 2)
}
