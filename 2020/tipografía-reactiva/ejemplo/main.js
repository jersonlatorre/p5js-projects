let font
let sound
let amplitude

function preload() {
	font = loadFont('cocogoose.ttf')
	sound = loadSound('bgm2.mp3')
	amplitude = new p5.Amplitude()
}

function setup() {
	createCanvas(600, 600)
	textFont(font)
	textAlign(CENTER, CENTER)
	colorMode(HSB)
}

function draw() {
	background('black')

	stroke('rgba(255, 255, 255, 0.6)')
	strokeWeight(2)
	line(random(width), random(width), random(height), random(height))

	noStroke()
	let hue = map(amplitude.getLevel(), 0, 1, 0, 255)
	fill(hue, 255, 255)
	let amp = 200 + 200 * amplitude.getLevel()
	textSize(amp)
	text('p5', 300, 250)
}

function mousePressed() {
	sound.play()
	sound.amp(1)
}
