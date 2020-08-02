let t = -3.1416 / 2
let factor

function setup() {
	createCanvas(1080, 1920)
	textAlign(CENTER, CENTER)
	colorMode(HSB)
}

function draw() {
	blendMode(BLEND)
	background('black')
	factor = map(sin(t), -1, 1, 0.5, 2)
	drawCircles(width / 2, height / 2, 0.7 * width / 2, 5)

}

function drawCircles(x, y, radius, level) {
	if (level == 0) return

	noFill()
	blendMode(ADD)
	stroke(255, 255, 255, noise(millis() / 500))
	strokeWeight(1.5)
	circle(x, y, radius * factor)

	let N = 6
	for (let i = 0; i < N; i++) {
		let angle = 2 * i * PI / N
		let r = radius / 2
		let xx = x + r * cos(angle)
		let yy = y + r * sin(angle)

		drawCircles(xx, yy, r, level - 1)
	}
}
