let CANVAS_SIZE = 1080
let LEVELS = 10
let MARGIN = 100
let font
let index = 0
let timer = 0
let colors = ['147,238,89', '177,238,89']
function preload() {
	// font = loadFont('cocogoose.ttf')
	font = loadFont('Coyotris Serif.ttf')
}

function setup() {
	createCanvas(CANVAS_SIZE, CANVAS_SIZE)
	// colorMode(HSB)
	textFont(font)
	textAlign(CENTER, CENTER)
	smooth()
}

function draw() {
	background('white')

	timer += 0.2 * deltaTime / 1000
	if (timer >= 1) {
		timer = 0
	}

	index = 0

	divideRect(
		{
			x1: MARGIN,
			y1: MARGIN,
			x2: width - MARGIN,
			y2: MARGIN,
			x3: width - MARGIN,
			y3: height - MARGIN,
			x4: MARGIN,
			y4: height - MARGIN
		},
		LEVELS
	)
}

function divideRect(rect, level) {
	if (level < 0 || level > 13) return

	index++
	let area =
		0.5 *
		(rect.x1 * rect.y2 -
			rect.y1 * rect.x2 +
			rect.x2 * rect.y3 -
			rect.y2 * rect.x3 +
			rect.x3 * rect.y4 -
			rect.y3 * rect.x4 +
			rect.x4 * rect.y1 -
			rect.y4 * rect.x1)
	let r = sqrt(area / 6)

	// if (level == 0) {
	// fill(map(r, 5, 22, 100, 255))
	stroke(0)
	fill('rgb(' + colors[index % colors.length] + ')')
	strokeWeight(map(level, 0, LEVELS, 1, 15))
	beginShape()
	vertex(rect.x1, rect.y1)
	vertex(rect.x2, rect.y2)
	vertex(rect.x3, rect.y3)
	vertex(rect.x4, rect.y4)
	vertex(rect.x1, rect.y1)
	endShape()

	let cx = (rect.x1 + rect.x2 + rect.x3 + rect.x4) >> 2
	let cy = (rect.y1 + rect.y2 + rect.y3 + rect.y4) >> 2
	noStroke()
	fill(0)
	circle(cx, cy, 5)
	// push()
	// translate(cx, cy)
	// rotate(PI / 2)
	// scale(r / 6)
	// text(':)', 0, 0)
	// pop()
	// }

	let bias = 0.25 // map(mouseX, 0, width, 0, 1)
	let r1 = bias + (1 - 2 * bias) * noise(millis() / 3000, index)
	let r2 = bias + (1 - 2 * bias) * noise(millis() / 4000, index + 5)

	if (level % 2 == 0) {
		divideRect(
			{
				x1: rect.x1,
				y1: rect.y1,
				x2: r1 * rect.x1 + (1 - r1) * rect.x2,
				y2: r1 * rect.y1 + (1 - r1) * rect.y2,
				x3: r2 * rect.x3 + (1 - r2) * rect.x4,
				y3: r2 * rect.y3 + (1 - r2) * rect.y4,
				x4: rect.x4,
				y4: rect.y4
			},
			level - 1
		)
		divideRect(
			{
				x1: r1 * rect.x1 + (1 - r1) * rect.x2,
				y1: r1 * rect.y1 + (1 - r1) * rect.y2,
				x2: rect.x2,
				y2: rect.y2,
				x3: rect.x3,
				y3: rect.y3,
				x4: r2 * rect.x3 + (1 - r2) * rect.x4,
				y4: r2 * rect.y3 + (1 - r2) * rect.y4
			},
			level - 1
		)
	} else {
		divideRect(
			{
				x1: rect.x1,
				y1: rect.y1,
				x2: rect.x2,
				y2: rect.y2,
				x3: r1 * rect.x2 + (1 - r1) * rect.x3,
				y3: r1 * rect.y2 + (1 - r1) * rect.y3,
				x4: r2 * rect.x1 + (1 - r2) * rect.x4,
				y4: r2 * rect.y1 + (1 - r2) * rect.y4
			},
			level - 1
		)
		divideRect(
			{
				x1: r2 * rect.x1 + (1 - r2) * rect.x4,
				y1: r2 * rect.y1 + (1 - r2) * rect.y4,
				x2: r1 * rect.x2 + (1 - r1) * rect.x3,
				y2: r1 * rect.y2 + (1 - r1) * rect.y3,
				x3: rect.x3,
				y3: rect.y3,
				x4: rect.x4,
				y4: rect.y4
			},
			level - 1
		)
	}
}
