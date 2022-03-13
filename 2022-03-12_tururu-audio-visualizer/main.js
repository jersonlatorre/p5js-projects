let p1x = 0
let p1y = 0
let p2x = 0
let p2y = 0
let t1 = 0
let t2 = 100
let simplex
let gap = 0.3

let bass
let treble

let state = 0

let bgHue = 0
let bgSaturation = 0
let bgValue = 0

let lineHue = 0
let lineSaturation = 0
let lineValue = 100
let lineStroke = 1
let circlesMaxRadius = 1
let circlesValue = 0

function preload() {
	sound = loadSound('assets/tururu.mp3')
	colorMode(HSB, 360, 100, 100, 100)
}

function setup() {
	createCanvas(1080, 1920)
	fft = new p5.FFT()
	sound.amp(1)
	simplex = new SimplexNoise(17)
}

function draw() {
	console.log('scene: ' + state)
	switch (state) {
		case 0:
			scene0()
			break
		case 1:
			scene1()
			break
		case 2:
			scene2()
			break
		case 3:
			scene3()
			break
		case 4:
			scene4()
			break
		case 5:
			scene5()
			break
		case 6:
			scene6()
			break
		case 7:
			scene7()
			break
	}
}

function analyze(trableSpeed = 0.1, bassSpeed = 0.15) {
	fft.analyze()
	let bassPeak = fft.getEnergy('bass')
	let highMid = fft.getEnergy('highMid')
	let treblePeak = fft.getEnergy('treble') * 0.8 + highMid * 0.2

	bass = map(bassPeak, 0, 255, 0, 1)
	treble = map(treblePeak, 0, 255, 0, 1)
	if (treble > 0.02) t1 += treble * trableSpeed
	if (bass > 0.02) t2 += treble * bassSpeed
}

function calculatePositions() {
	p1x = map(simplex.noise(t1, 0), 0, 1, gap, 1 - gap) * width
	p1y = map(simplex.noise(0, t1), 0, 1, gap, 1 - gap) * height
	p2x = map(simplex.noise(t2, 0), 0, 1, gap, 1 - gap) * width
	p2y = map(simplex.noise(0, t2), 0, 1, gap, 1 - gap) * height
}

function scene0() {
	fill(bgHue, bgSaturation, bgValue, 50)
	noStroke()
	rect(0, 0, width, height)

	calculatePositions()
	analyze()

	noStroke()
	strokeWeight(lineStroke * width / 400)
	stroke(lineHue, lineSaturation, lineValue, 100)
	line(p1x, p1y, p2x, p2y)
}

function scene1() {
	fill(bgHue, bgSaturation, bgValue, 10)
	noStroke()
	rect(0, 0, width, height)

	gap = lerp(gap, 0.1, 0.1)
	p1x = map(simplex.noise(t1, 0), 0, 1, gap, 1 - gap) * width
	p1y = map(simplex.noise(0, t1), 0, 1, gap, 1 - gap) * height
	p2x = map(simplex.noise(t2, 0), 0, 1, gap, 1 - gap) * width
	p2y = map(simplex.noise(0, t2), 0, 1, gap, 1 - gap) * height

	calculatePositions()
	analyze()

	noStroke()
	strokeWeight(lineStroke * width / 400)
	stroke(lineHue, lineSaturation, lineValue, 100)
	line(p1x, p1y, p2x, p2y)
}

function mousePressed() {
	if (sound.isPlaying()) {
		sound.pause()
	} else {
		sound.loop()
	}
}

function scene2() {
	let n = simplex.noise(millis() / 500, 0)
	let value = map(n, 0, 1, 0, 20)

	fill(bgHue, bgSaturation, value, 20)
	noStroke()
	rect(0, 0, width, height)

	calculatePositions()
	analyze()

	strokeWeight(lineStroke * width / 400)
	stroke(lineHue, lineSaturation, lineValue, 100)
	line(p1x, p1y, p2x, p2y)
}

function scene3() {
	bgHue += 1
	bgHue = bgHue % 360
	bgValue = lerp(bgValue, 50, 0.1)
	bgSaturation = lerp(bgSaturation, 100, 0.1)

	fill(bgHue, bgSaturation, bgValue, 30)
	noStroke()
	rect(0, 0, width, height)

	calculatePositions()
	analyze(0.04, 0.06)

	circlesMaxRadius = lerp(circlesMaxRadius, 5, 0.05)
	circlesValue = lerp(circlesValue, 255, 0.05)

	for (let i = 0; i < 20; i++) {
		let x = random(width)
		let y = random(height)
		fill(circlesValue)
		circle(x, y, random(1, circlesMaxRadius))
	}

	strokeWeight(lineStroke * width / 400)
	stroke(255)
	line(p1x, p1y, p2x, p2y)
}

function scene4() {
	bgValue = lerp(bgValue, 100, 0.1)
	bgSaturation = lerp(bgSaturation, 0, 0.1)

	fill(bgHue, bgSaturation, bgValue, 20)
	noStroke()
	rect(0, 0, width, height)

	calculatePositions()
	analyze()

	circlesMaxRadius = lerp(circlesMaxRadius, 5, 0.05)
	circlesValue = lerp(circlesValue, 0, 0.1)

	for (let i = 0; i < 40; i++) {
		let x = random(width)
		let y = random(height)
		fill(circlesValue)
		circle(x, y, random(1, circlesMaxRadius))
	}

	lineValue = lerp(lineValue, 0, 0.1)
	strokeWeight(lineStroke * width / 400)
	stroke(lineHue, lineSaturation, lineValue, 100)
	line(p1x, p1y, p2x, p2y)
}

function scene5() {
	gap = lerp(gap, 0.4, 0.01)
	bgValue = lerp(bgValue, 100, 0.1)
	bgSaturation = lerp(bgSaturation, 0, 0.3)
	fill(bgHue, bgSaturation, bgValue, 20)
	noStroke()
	rect(0, 0, width, height)

	calculatePositions()
	analyze()

	circlesMaxRadius = lerp(circlesMaxRadius, 20, 0.01)
	for (let i = 0; i < 60; i++) {
		let x = random(width)
		let y = random(height)
		fill(circlesValue)
		circle(x, y, random(1, circlesMaxRadius))
	}

	strokeWeight(lineStroke * width / 400)
	lineValue = lerp(lineValue, 0, 0.1)
	stroke(lineHue, lineSaturation, lineValue, 100)
	line(p1x, p1y, p2x, p2y)
}

function scene6() {
	gap = lerp(gap, 0.5, 0.02)
	bgValue = lerp(bgValue, 0, 0.1)
	fill(bgHue, bgSaturation, bgValue, 20)
	noStroke()
	rect(0, 0, width, height)

	calculatePositions()
	analyze()

	circlesMaxRadius = lerp(circlesMaxRadius, 3, 0.02)
	circlesValue = lerp(circlesValue, 255, 0.1)
	for (let i = 0; i < 60; i++) {
		let x = random(width)
		let y = random(height)
		fill(circlesValue)
		circle(x, y, random(1, circlesMaxRadius))
	}

	lineStroke = lerp(lineStroke, 100, 0.01)
	strokeWeight(lineStroke * width / 400 * bass)
	lineValue = lerp(lineValue, 100, 0.1)
	stroke(lineHue, lineSaturation, lineValue, 100)
	line(p1x, p1y, p2x, p2y)
}

function scene7() {
	gap = lerp(gap, 0.5, 0.05)
	bgValue = lerp(bgValue, 0, 0.1)
	fill(bgHue, bgSaturation, bgValue, 20)
	noStroke()
	rect(0, 0, width, height)

	calculatePositions()
	analyze()

	circlesMaxRadius = lerp(circlesMaxRadius, 1, 0.01)
	circlesValue = lerp(circlesValue, 0, 0.1)
	for (let i = 0; i < 50; i++) {
		let x = random(width)
		let y = random(height)
		fill(circlesValue)
		circle(x, y, random(1, circlesMaxRadius))
	}

	strokeWeight(lineStroke * width / 400 * sqrt(bass))
	lineValue = lerp(lineValue, 100, 0.12)
	lineStroke = lerp(lineStroke, 0, 0.013)
	stroke(lineHue, lineSaturation, lineValue, 100)
	line(p1x, p1y, p2x, p2y)
}

function keyPressed() {
	if (key == ' ') {
		state = (state + 1) % 8
	}
}
