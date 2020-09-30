
let N = 150
let R = 14
let SCALE = 27
let GOLDEN = 2.399
let TEXT_SIZE = 28

let word
let color
let type = 1

function setup() {
	createCanvas(800, 800)
	textAlign(CENTER, CENTER)
	textSize(TEXT_SIZE)
	frameRate(30)
}

function draw() {
	translate(width / 2, height / 2)

	if (type == 0) 
	{
		word = 'love'
		color = 255
		rotate(-GOLDEN * frameCount)
	} else {
		word = 'fear'
		color = 0
		rotate(GOLDEN * frameCount)
	}

	background(color)

	for (let i = 1; i < N; i++) {
		let r = SCALE * sqrt(i)
		let angle = 2.3999 * i

		let x = r * cos(angle)
		let y = r * sin(angle)

		fill(255 - color, r / 0.6)
		push()
		translate(x, y)
		rotate(atan2(y, x) + PI / 2)
		scale(sqrt((N - i) / N))
		text(word, 0, 0)
		pop()
	}
}
