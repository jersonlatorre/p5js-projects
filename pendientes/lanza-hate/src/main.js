let jijiBody
let jijiLeft
let jijiRight
let jijiUp
let jijiDown
let yOffset = 0
let words = []
let mouthPosition

function preload() {
	jijiBody = loadImage('../assets/jiji-body.png')
	jijiLeft = loadImage('../assets/jiji-left.png')
	jijiRight = loadImage('../assets/jiji-right.png')
	jijiUp = loadImage('../assets/jiji-up.png')
	jijiDown = loadImage('../assets/jiji-down.png')
}

function setup() {
	createCanvas(800, 800)
	imageMode(CENTER)
}

function draw() {
	background('white')

	let angle = atan2(mouseY - 335, mouseX - 400)

	let x = mouseX - 400
	let y = mouseY - 335

	yOffset = 10 * sin(millis() / 500)
	translate(0, yOffset)

	push()
	image(jijiBody, 400, 450)
	translate(400, 335)

	if (x > y) {
		if (x > -y) {
			rotate(angle)
			image(jijiRight, 0, 0)
			mouthPosition = createVector(400, 335)
		} else {
			rotate(angle + PI / 2)
			image(jijiUp, 0, 0)
			mouthPosition = createVector(400, 335)
		}
	} else {
		if (x > -y) {
			rotate(angle + 3 * PI / 2)
			image(jijiDown, 0, 0)
			let offset = createVector(50 * cos(angle), 50 * sin(angle))
			mouthPosition = createVector(400, 335).add(offset)
		} else {
			rotate(angle + PI)
			image(jijiLeft, 0, 0)
			mouthPosition = createVector(400, 335)
		}
	}
	pop()

	words.forEach((word, i) => {
		word.draw()
		if (word.isDead) {
			words.splice(i, 1)
		}
	})
}

function mousePressed(e) {
	words.push(new Word(mouthPosition))
}
