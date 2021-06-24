let CANVAS_SIZE = 950
let MARGIN = CANVAS_SIZE / 12
let N_DOTS = 22
let GRID_SIZE
let timer1 = 0
let timer2 = 0

let dotsCanvas
let pulsesCanvas
let heartCanvas

let sistole
let diastole

let pulse
let heart
let heartScale = 1

let DURATION = 0.8

function preload() {
	heart = loadModel('heart.obj')
	sistole = loadSound('sistole-2.wav')
	diastole = loadSound('sistole-2.wav')
}

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	GRID_SIZE = (CANVAS_SIZE - 2 * MARGIN) / N_DOTS
	dotsCanvas = createGraphics(CANVAS_SIZE, CANVAS_SIZE)
	pulsesCanvas = createGraphics(CANVAS_SIZE, CANVAS_SIZE)
	heartCanvas = createGraphics(CANVAS_SIZE, CANVAS_SIZE, WEBGL)
	// pulse = new Pulse()
}

function draw() {
	timer1 += deltaTime / 5000
	timer2 += deltaTime / 5000

	if (timer1 >= DURATION) {
		timer1 = 0
	}

	if (timer2 >= DURATION / 4) {
		timer2 = 0
		pulse = new Pulse()
		sistole.play()

		setTimeout(() => {
			diastole.play()
		}, 240)
		heartScale = 1.2
	}

	if (heartScale > 1.01) {
		heartScale *= 0.991
	} else {
		heartScale = 1
	}

	background('white')
	if (pulse) pulse.draw()
	drawDots()
	draeHeart()
}

function draeHeart() {
	try {
		heartCanvas.smooth()
	} catch (error) {}

	heartCanvas.clear()
	heartCanvas.push()
	heartCanvas.translate(-10, 30, 50)
	heartCanvas.scale(CANVAS_SIZE / 10 * heartScale)
	heartCanvas.rotateX(PI)
	heartCanvas.rotateY(timer1 * 2 * PI / DURATION)
  heartCanvas.fill('rgba(250, 250, 250, 0.85)')
  heartCanvas.stroke('rgba(0, 0, 0, 0.5)')
  heartCanvas.strokeWeight(CANVAS_SIZE / 800)
	heartCanvas.model(heart)
  heartCanvas.pop()
  
	image(heartCanvas, 0, 0)
}

function drawDots() {
	dotsCanvas.clear()
	for (let i = 0; i < N_DOTS; i++) {
		for (let j = 0; j < N_DOTS; j++) {
			let x = MARGIN + i * GRID_SIZE + GRID_SIZE / 2
			let y = MARGIN + j * GRID_SIZE + GRID_SIZE / 2

			dotsCanvas.fill('rgba(0, 0, 0, 0.2)')
			dotsCanvas.noStroke()
			dotsCanvas.circle(x, y, CANVAS_SIZE / 220)
		}
	}

	image(dotsCanvas, 0, 0)
}

// let recorder

// setTimeout(() => {
// 	const canvas = document.getElementById('defaultCanvas0')
// 	console.log(canvas)
// 	// recorder = new CanvasRecorder(canvas)
// 	const recorder = new CanvasRecorder(canvas, 4500000)
// 	recorder.start()

// 	setTimeout(() => {
// 		recorder.stop()
// 		// recorder.save('web.avi')
// 		recorder.save('web.mp4')
// 	}, 20000)
// }, 100)
