let t = 0
let color = 0
let osc

function setup() {
	createCanvas(600, 600)
}

function draw() {
	noStroke()

	if (t > 1000) {
		color = 255 - color
		t = 0
	}

	background(255 - color)
	fill(color)
	circle(width / 2 + random(-0, 0), height / 2 + random(-0, 0), t)
	t += 15
}

function mousePressed()
{
	env.play()
	osc.amp(env)
	osc.freq(random(200, 800))
}

function mouseReleased()
{
	osc.stop()
}


