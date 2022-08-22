const FACTOR = window.innerHeight / 1920

let simplex

// contantes
const NOISE_SPEED = 0.4
const MIN_STARS_SIZE = 4
const MAX_STARS_SIZE = 8
const MIN_STARS_SPEED = 20
const MAX_STARS_SPEED = 50
const TRANSITION_SPEED = 0.8
const CLOUD_RESOLUTION = 25
const CLOUD_WIDTH = 280
const CLOUD_HEIGHT = 130
const CLOUDS_TOP = 1100
const MESSAGE_TOP = 1250 * FACTOR

let open, close
let backgroundColor, cloudColor

let stars = []

function preload() {
	open = loadImage('assets/open.svg')
	close = loadImage('assets/close.svg')
}

function setup() {
	let canvas = createCanvas(windowWidth, 1920 * FACTOR)
	canvas.parent('p5')

	imageMode(CENTER)
	noStroke()

	Global.xFactor = 1920 * windowWidth / windowHeight
	Global.time = 0
	simplex = new SimplexNoise('2')

	for (let i = 0; i < 400; i++) {
		stars.push(new Star())
	}
}

function draw() {
	scale(FACTOR)
	Global.time += deltaTime / 1000

	Global.t = 0
	drawBackground()
	drawStars()
	drawPlanet()
	drawClouds()
	drawEye()
}

function drawBackground() {
	backgroundColor = parseInt(lerp(0, 255, Global.t))
	background(backgroundColor)
	document.body.style.background = color(backgroundColor)
	document.body.style.backgroundColor = color(backgroundColor)
	document.querySelector('meta[name=theme-color]').setAttribute('content', color(backgroundColor))
}

function drawPlanet() {
	let alpha, distanceToCloud, color

	distanceToCloud = -40
	color = 'rgb(240, 240, 240)'

	noStroke()
	fill('#FEE973')
	circle(0.5 * Global.xFactor, CLOUDS_TOP - 350 + distanceToCloud, 85)
}

function drawClouds() {
	drawNoise(10, 0.2)
	drawNoise(20, 0.3)
	drawNoise(30, 0.6)
}

function drawEye() {
	if (Global.t <= 0.5) {
		image(close, 0.5 * Global.xFactor, CLOUDS_TOP - 50)
	} else {
		image(open, 0.5 * Global.xFactor, CLOUDS_TOP - 50)
	}
}

function drawStars() {
	stars.forEach((star) => {
		star.draw()
	})
}

function drawNoise(seed, alpha) {
	noStroke()
	fill(255, alpha * 255)

	beginShape()
	for (let i = -1; i <= CLOUD_RESOLUTION + 1; i++) {
		addVertex(i % CLOUD_RESOLUTION, seed)
	}
	endShape()
}

function addVertex(i, seed) {
	let angle, x, y
	angle = i * 2 * PI / CLOUD_RESOLUTION
	x = 0.5 * Global.xFactor + CLOUD_WIDTH * cos(angle)
	y =
		CLOUDS_TOP +
		(CLOUD_HEIGHT + CLOUD_HEIGHT * (1 + simplex.noise2D(i, Global.time * NOISE_SPEED + seed)) * 0.5) * sin(angle)

	if (y > CLOUDS_TOP) y = CLOUDS_TOP + (y - CLOUDS_TOP) * 0.3
	curveVertex(x, y)
}

function windowResized() {
	window.location = '/'
}
