class Tree {
	constructor() {
		this.LEVELS = 8
		this.LENGTH = 90
		this.t = 0
		this.tGrow = 0
		this.timer = 0
		this.seed = random(0, 1000) | 0
		this.index = 0
		this.state = TreeState.GROWING_UP
	}

	draw() {
		switch (this.state) {
			case TreeState.GROWING_UP: {
				this.index = 0
				this.tGrow = lerp(0, 1, easeOut(this.t))
				this.drawBranch(createVector(0.5 * width, 0.665 * height), createVector(0, -1), this.LEVELS, this.LENGTH * FACTOR)

				noStroke()
				fill('white')
				rectMode(CENTER)
				rect(0.5 * width, 0.665 * height + 20, 40, 40)

				stroke(8)
				strokeWeight(1)
				line(width * 0.5 - 10 * FACTOR, height * 0.665, width * 0.5 + 10 * FACTOR, height * 0.665)

				textAlign(CENTER, CENTER)
				textSize(22 * FACTOR)
				fill(8, this.tGrow)
				noStroke()
				text('-  ' + this.seed + '  -', width * 0.5, height * 0.665 + 20)

				this.t += 0.01
				if (this.t >= 1) {
					this.t = 1
					this.state = TreeState.STAND
					this.timer = 0
				}

				break
			}

			case TreeState.STAND: {
				this.index = 0
				this.tGrow = 1
				this.drawBranch(createVector(0.5 * width, 0.665 * height), createVector(0, -1), this.LEVELS, this.LENGTH * FACTOR)

				noStroke()
				fill('white')
				rectMode(CENTER)
				rect(0.5 * width, 0.665 * height + 20, 40, 40)

				stroke(8)
				strokeWeight(1)
				line(width * 0.5 - 10 * FACTOR, height * 0.665, width * 0.5 + 10 * FACTOR, height * 0.665)

				textAlign(CENTER, CENTER)
				textSize(22 * FACTOR)
				fill(8, this.tGrow)
				noStroke()
				text('-  ' + this.seed + '  -', width * 0.5, height * 0.665 + 20)

				this.timer += deltaTime / 1000
				if (this.timer >= 4) {
					this.state = TreeState.GROWING_DOWN
					this.t = 0
				}
				break
			}

			case TreeState.GROWING_DOWN: {
				this.index = 0
				this.tGrow = lerp(1, 0, easeIn(this.t))
				this.drawBranch(createVector(0.5 * width, 0.665 * height), createVector(0, -1), this.LEVELS, this.LENGTH * FACTOR)

				noStroke()
				fill('white')
				rectMode(CENTER)
				rect(0.5 * width, 0.665 * height + 20, 40, 40)

				stroke(8)
				strokeWeight(1)
				line(width * 0.5 - 10 * FACTOR, height * 0.665, width * 0.5 + 10 * FACTOR, height * 0.665)

				textAlign(CENTER, CENTER)
				textSize(22 * FACTOR)
				fill(8, this.tGrow)
				noStroke()
				text('-  ' + this.seed + '  -', width * 0.5, height * 0.665 + 20)

				this.t += 0.02
				if (this.t >= 1) {
					this.t = 0
					this.state = TreeState.GROWING_UP
					this.seed = random(0, 1000) | 0
				}

				break
			}
		}
	}

	reset() {
		if (this.t < 1) return
		this.t = 0
		this.seed = random(0, 1000) | 0
		this.index = 0
	}

	drawBranch(position, direction, level, length) {
		this.index++

		if (level == 0) {
			let seed = map(randseed(this.index), 0, 1, 0.3, 1)
			noStroke()
			fill(307 + 50 * seed, 60, 100)
			circle(position.x, position.y, 20 * FACTOR * this.tGrow * seed)
			return
		}

		let factor = map(level, 0, this.LEVELS, 0, 1)
		let seed1 = map(randseed(level + this.seed + 100), 0, 1, 0.6, 1)
		let seed2 = map(randseed(level + this.seed + 200), 0, 1, 0.6, 1)
		let end
		if (this.LEVELS == level) {
			end = position.copy().add(direction.copy().mult(this.tGrow * length * 1.8 * seed1))
		} else {
			end = position.copy().add(direction.copy().mult(this.tGrow * length * seed1))
		}

		stroke(8)
		strokeWeight(14 * FACTOR * factor)
		line(position.x, position.y, end.x, end.y)

		let n1 = noise(position.x / 1000, end.x / 1000, millis() / 4000)
		let n2 = noise(position.x / 1000 + 20, end.x / 1000 + 20, millis() / 4000 + 20)

		let offset1 = map(n1, 0, 1, 0, 0.24 * PI)
		let offset2 = map(n2, 0, 1, 0, -0.24 * PI)

		let dir1 = direction.copy().rotate(offset1)
		let dir2 = direction.copy().rotate(offset2)

		this.drawBranch(createVector(end.x, end.y), dir1, level - 1, length * seed1 * this.tGrow)
		this.drawBranch(createVector(end.x, end.y), dir2, level - 1, length * seed2 * this.tGrow)
	}
}

class TreeState {}
TreeState.GROWING_UP = 0
TreeState.STAND = 1
TreeState.GROWING_DOWN = 2
