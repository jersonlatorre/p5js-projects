let audio
let amplitud

function preload() {
	audio = loadSound('assets/bgm.mp3')
}

function setup() {
	createCanvas(600, 600)
	colorMode(HSB)

	amplitud = new p5.Amplitude()
}

function draw() {
	background('white')
	let level = amplitud.getLevel()
	let radio = map(level, 0, 1, 0, 200)
	let x = map(level, 0, 1, 0, 600)

	circle(x, 300, radio)
}

function mousePressed() {
	if (!audio.isPlaying()) {
		audio.play()
	} else {
		audio.stop()
	}
}

function keyPressed() {
	if (key == 'p') {
		audio.play()
	}

	if (key == 's') {
		audio.stop()
	}
}