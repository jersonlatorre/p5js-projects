const N = 25

let canvas1, canvas2
let g, mask
let simplex
let dmouseX = 0
let dmouseY = 0
let factor = 0

function setup() {
	createCanvas(windowWidth, windowHeight)
	canvas1 = createGraphics(windowWidth, windowHeight)
	canvas2 = createGraphics(windowWidth, windowHeight)
	mask = createGraphics(windowWidth, windowHeight)
	simplex = new SimplexNoise()
	rectMode(CENTER)
}

function draw() {
	generateCanvas1()
	generateCanvas2()

	image(canvas1, 0, 0, windowWidth, windowHeight)
	generateMask()

	let masked = canvas2.get()
	masked.mask(mask)
	image(masked, 0, 0, windowWidth, windowHeight)

	if (mouseIsPressed) {
		dmouseX += (mouseX - dmouseX) * 0.1
		dmouseY += (mouseY - dmouseY) * 0.1
		factor = lerp(factor, 0.4, 0.1)
	} else {
		factor = lerp(factor, 0, 0.1)
	}
}

function generateCanvas1() {
	canvas1.background('#f0f0f0')
	canvas1.noStroke()
	canvas1.fill('white')
	let size = min(canvas1.width, canvas1.height) * 0.9
	canvas1.circle(canvas1.width / 2, canvas1.height / 2, size)
}

function generateCanvas2() {
	canvas2.background('white')
	canvas2.noStroke()
	canvas2.fill('black')
	let size = min(canvas2.width, canvas2.height) * 0.9
	canvas2.circle(canvas2.width / 2, canvas2.height / 2, size)
}

function generateMask() {
	mask.clear()
	let w = mask.width / N
	let h = mask.height / N

	for (let i = 0; i <= w; i++) {
		for (let j = 0; j <= h; j++) {
			let x = i * width / w
			let y = j * height / h
			let r = simplex.noise(5 * x / width, 5 * y / height, millis() / 1500)

			let distance = dist(dmouseX, dmouseY, x, y)
			distance = constrain(distance, 0, min(width, height) * factor)
			let falloff = factor > 0 ? map(distance, 0, min(width, height) * factor, 1, 0) : 0
			falloff = 3 * falloff * falloff - 2 * falloff * falloff * falloff

			let v = r * falloff < 0.1 ? 0 : 1

			mask.noStroke()
			mask.fill(255, v * 255)
			mask.textSize(20)
			mask.textAlign(CENTER, CENTER)
			mask.text(random([ 'c', 'o', 'd', 'e' ]), x, y)
		}
	}
}

function mousePressed() {
	dmouseX = mouseX
	dmouseY = mouseY
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
	canvas1 = createGraphics(windowWidth, windowHeight)
	canvas2 = createGraphics(windowWidth, windowHeight)
	g = createGraphics(windowWidth, windowHeight)
	mask = createGraphics(windowWidth, windowHeight)
}
