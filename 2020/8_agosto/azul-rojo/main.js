let angle = 0
let factor = 1080 / 600
let SIZE = 58 * factor
let simplex = new SimplexNoise()
let margin = 0

function setup() {
	createCanvas(1080, 1080)
	colorMode(HSB)
	noStroke()
	rectMode(CENTER)
	background('black')
}

function draw() {
	blendMode(BLEND)
	fill('rgba(0, 0, 0, 0.2)')
	rect(width / 2, width / 2, width, width)
	angle += deltaTime / 2500
	blendMode(ADD)
	drawSpace()
	drawSpace1()
	drawSpace2()

	margin = map(sin(angle * 1), -1, 1, 150, 500)
}

function drawSpace() {
	for (let i = 0; i < 20 * factor; i++) {
		let x = random(width)
		let y = random(width)
		fill('rgba(255, 255, 255, 0.4)')
		circle(x, y, 2 * factor)
	}
}

function drawSpace1() {
	let rx = simplex.noise2D(angle, angle)
	rx = map(rx, -1, 1, margin, width - margin)
	let ry = simplex.noise2D(angle, angle + 10)
	ry = map(ry, -1, 1, margin, width - margin)

	for (let i = 0; i < 1500 * factor; i++) {
		let x = random(width)
		let y = random(width)
		let distance = dist(rx, ry, x, y)
		let s = map(constrain(distance, 0, SIZE), 0, SIZE, 8 * factor, 0)
		let h = map(s, 8, 0, 200, 250)
		fill(h, 255, 255 - h)
		circle(x, y, s)
	}
}

function drawSpace2() {
	let rx = simplex.noise2D(angle, angle + 20)
	rx = map(rx, -1, 1, margin, width - margin)
	let ry = simplex.noise2D(angle, angle + 30)
	ry = map(ry, -1, 1, margin, width - margin)
	
	for (let i = 0; i < 1500 * factor; i++) {
		let x = random(width)
		let y = random(width)
		let distance = dist(rx, ry, x, y)
		let s = map(constrain(distance, 0, SIZE), 0, SIZE, 8 * factor, 0)
		let h = map(s, 8, 0, 180, 255)
		fill(0.25 * (255 - h), 255, 255 - h)
		circle(x, y, s)
	}
}