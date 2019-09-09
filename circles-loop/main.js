let t = 0
let color = 0

function setup() {
	createCanvas(500, 500)
}

function draw() {
	noStroke()

	if (t > 1000) {
		color = 255 - color
		t = 0
	}

	fill(color)
	circle(width / 2 + random(-0, 0), height / 2 + random(-0, 0), t)
	t += 15
}