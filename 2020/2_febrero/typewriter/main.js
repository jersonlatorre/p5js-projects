let N = 15
let t = 0
let dt = 0.006
let CANVAS_SIZE = 900
let MARGIN = 80
let GRID_SIZE = (CANVAS_SIZE - 2 * MARGIN) / N
let timer = 0
let letters = []
let font
let index = 0
let word = 'infinite     '
let gota

function preload() {
  font = loadFont('cocogoose.ttf')
  // gota = loadSound('gota.wav')
  gota = loadSound('click.wav')
}

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE)
  textFont(font)
}

function draw() {
	background('white')
	noStroke()

	let t = millis() / 850 + PI / 4
	let scale = 180 * 2 / (3 - cos(2 * t))
	let mx = 1.5 * scale * cos(t) + width / 2
	let my = 2 * scale * sin(2 * t) / 2 + width / 2

	let minDistance = 99999
	let minI1
	let minJ1

	for (let i = 1; i < N; i++) {
		for (let j = 1; j < N; j++) {
			let x = MARGIN + i * GRID_SIZE
			let y = MARGIN + j * GRID_SIZE
			let distance = dist(x, y, mx, my)

			if (distance < minDistance) {
				minDistance = distance
				minI1 = i
				minJ1 = j
			}

			fill(180)
			circle(x, y, 5)
		}
	}

	fill('black')
	noStroke()
	circle(MARGIN + minI1 * GRID_SIZE, MARGIN + minJ1 * GRID_SIZE, 13)
	strokeWeight(5)
	stroke('black')
	line(MARGIN + minI1 * GRID_SIZE, MARGIN + minJ1 * GRID_SIZE, mx, my)

	minDistance = 9999999
	let minI2
	let minJ2

	for (let i = 1; i < N; i++) {
		for (let j = 1; j < N; j++) {
			let x = MARGIN + i * GRID_SIZE
			let y = MARGIN + j * GRID_SIZE
			let distance = dist(x, y, mx, my)

			if (i == minI1 && j == minJ1) continue
			if (distance < minDistance) {
				minDistance = distance
				minI2 = i
				minJ2 = j
			}
		}
	}

	fill('black')
	noStroke()
	circle(MARGIN + minI2 * GRID_SIZE, MARGIN + minJ2 * GRID_SIZE, 13)
	strokeWeight(5)
	stroke('black')
	line(MARGIN + minI2 * GRID_SIZE, MARGIN + minJ2 * GRID_SIZE, mx, my)

	minDistance = 9999999
	let minI3
	let minJ3

	for (let i = 1; i < N; i++) {
		for (let j = 1; j < N; j++) {
			let x = MARGIN + i * GRID_SIZE
			let y = MARGIN + j * GRID_SIZE
			let distance = dist(x, y, mx, my)

			if (i == minI1 && j == minJ1) continue
			if (i == minI2 && j == minJ2) continue
			if (distance < minDistance) {
				minDistance = distance
				minI3 = i
				minJ3 = j
			}
		}
	}

	fill('black')
	noStroke()
	circle(MARGIN + minI3 * GRID_SIZE, MARGIN + minJ3 * GRID_SIZE, 13)
	strokeWeight(5)
	stroke('black')
	line(MARGIN + minI3 * GRID_SIZE, MARGIN + minJ3 * GRID_SIZE, mx, my)

	noStroke()
	fill('black')
  circle(mx, my, 23)
  fill('red')
	circle(mx, my, 6)

	timer += deltaTime / 1000
	if (timer >= 0.17) {
    timer = 0
    if (index % 13 < 8) gota.play()
    letters.push(new Letter('', mx, my, index))
    index++
	}

	letters.forEach((letter, i) => {
		letter.draw()
		if (letter.isDead) letters.splice(i, 1)
	})
}

class Letter {
	constructor(letter, x, y, index) {
		this.letter = letter
		this.x = x
		this.y = y
		this.size = 20
    this.isDead = false
    this.timer = 0
    this.index = index % word.length
    this.DURATION = 1.5
	}

	draw() {
		this.size += 0.6
    this.y -= 0
    
		if (this.timer > this.DURATION) {
      this.isDead = true
      return
		} else {
      noStroke()
      let alpha = map(this.timer, 0, this.DURATION, 1, -0.5)
      if (alpha < 0) alpha = 0
      fill('rgba(255, 0, 0, ' + alpha + ')')
      textSize(this.size)
			text(word[this.index], this.x, this.y)
    }
    
    this.timer += deltaTime / 1000
	}
}
