let DISTANCE = 11
let BORDER = 20
let W = 25
let H = 45

let WIDTH = W * DISTANCE + BORDER
let HEIGHT = H * DISTANCE + BORDER

let images = []
let colors = []
let pixels = []
let blanco
let negro
let puntero
let frames
let transformedPixels = W * H

let STATE_SHOW = 0
let STATE_FADE_OUT = 1
let STATE_FADE_IN = 2
let state = STATE_SHOW

let tColor = 0
let dtColor = 0.2

let currentColor = 0
let prevColor = 0
let nextColor = 0

let simplex

function preload() {
	blanco = loadImage('shapes/a.svg')
	negro = loadImage('shapes/b.svg')
	puntero = loadImage('shapes/puntero.svg')

	loadJSON('frames.json', (frames) => {
		images = new Array(frames.length)
		frames.forEach((frame, index) => {
			loadImage('frames/' + frame.nombre, (image) => {
				let array = []
				for (let i = 0; i < W; i++) {
					array.push([])
					for (let j = 0; j < H; j++) {
						let c = image.get(i, j)
						array[i].push(c)
					}
				}
				images[index] = array
			})

			colors.push(color(frame.fondo))
			if (index == 0) currentColor = prevColor = color(frame.fondo)
			if (index == 0) nextColor = color(frame.fondo)
		})
	})
}

function setup() {
	createCanvas(WIDTH, HEIGHT)
	rectMode(CENTER)
	imageMode(CENTER)
	noCursor()

  simplex = new SimplexNoise()

	for (let i = 0; i < W; i++) {
		for (let j = 0; j < H; j++) {
			pixels.push(new Pixel(i, j))
		}
	}
}

function draw() {
  translate(width / 2, height / 2)
	noStroke()
	background('#666')
	currentColor = lerpColor(prevColor, nextColor, tColor)

	pixels.forEach((pixel) => {
		pixel.draw()
	})

	switch (state) {
		case STATE_SHOW: {
			break
		}

		case STATE_FADE_OUT: {
			tColor += dtColor

			if (tColor >= 1) {
				tColor = 1

				state = STATE_FADE_IN
			}
			break
		}

		case STATE_FADE_IN: {
			tColor = 1
			currentColor = nextColor
			break
		}
	}

	push()
	translate(mouseX - width / 2, mouseY - height / 2, 21)
	if (mouseIsPressed) scale(0.8)
	image(puntero, 0, 0)
	pop()
}

function mousePressed() {
	// if (state == STATE_SHOW) {
	// state = STATE_FADE_OUT

	if (transformedPixels == W * H) {
		transformedPixels = 0
		pixels.forEach((pixel) => {
			pixel.startTransform()
		})
	}

	// color del fondo
	// tColor = 0
	// prevColor = colors[currentFrame]
	// if (currentFrame + 1 == images.length) {
	// 	nextColor = colors[0]
	// } else {
	// 	nextColor = colors[currentFrame + 1]
	// }
}
