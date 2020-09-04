let audio
let amplitud
let fft

function preload() {
	audio = loadSound('assets/bgm.mp3')
}

function setup() {
	createCanvas(600, 600)
	colorMode(HSB)

	amplitud = new p5.Amplitude()
	fft = new p5.FFT()
}

function draw() {
	background('white')
	// let level = amplitud.getLevel()
	// let radio = map(level, 0, 1, 0, 200)
	// circle(300, 300, radio)

	let waveform = fft.waveform()

	waveform.forEach((valor, indice) => {
		// print(i, valor)

		let x = map(indice, 0, 1023, 0, 600)
		let radio = map(valor, 0, 1, 0, 100)

		rect(x, 300, 1, radio)
	})
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