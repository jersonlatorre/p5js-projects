let FACTOR
let CANVAS_SIZE = 1080

let tree

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	colorMode(HSB)
	smooth()

	FACTOR = CANVAS_SIZE / 1080

	tree = new Tree()
}

function draw() {
	background('white')
	tree.draw()
}

function randseed(n) {
	return frac(Math.sin(n) * 43758.5453)
}

function frac(n) {
	return n - Math.floor(n)
}

function easeIn(t) {
	return pow(t, 3)
}

function easeOut(t) {
	return 1 - pow(1 - t, 3)
}

function easeInOut(t) {
	return t < 0.5 ? 4 * pow(t, 3) : 1 - pow(-2 * t + 2, 3) / 2
}

function easeInBack(t) {
	return 2.70158 * pow(t, 3) - 1.70158 * pow(t, 2)
}

function easeOutBack(t) {
	return 1 + 2.70158 * pow(t - 1, 3) + 1.70158 * pow(t - 1, 2)
}
