class S {
	constructor() {
		this.center = createVector(540, 370)
		this.focus = createVector(540, 600)
		this.angle = 0
		this.radius = 100
		this.DISTANCE = 345

		// point moving around the reference circle
		this.movingPoint = createVector(540, 540 + 220)
		this.reflectedPoint = createVector(540, 540)
		this.history = []
		this.nHistory = 110
	}

	draw() {
		this.angle -= 3 * deltaTime / 1000
		if (this.angle <= -2 * PI) this.angle = 0

		this.movingPoint = createVector(
			this.center.x + this.radius * cos(this.angle),
			this.center.y + this.radius * sin(this.angle)
		)

		let u = this.focus.copy().sub(this.movingPoint).normalize()
		let p = this.movingPoint.copy().add(u.mult(this.DISTANCE))

		noFill()
		stroke(255, 50)
		strokeWeight(5)
		circle(this.center.x, this.center.y, 2 * this.radius)

		stroke(255, 100)
		line(this.focus.x, this.focus.y, p.x, p.y)

		stroke('#ccc')
		line(this.movingPoint.x, this.movingPoint.y, p.x, p.y)

		noStroke()
		fill(colors.red)
		circle(this.movingPoint.x, this.movingPoint.y, 30)

		this.history.push({ position: p, opacity: 255})
		if (this.history.length == this.nHistory) {
			this.history.splice(0, 1)
		}

		// locus
		noFill()
		stroke(colors.white)
		strokeWeight(10)
		for (let i = 0; i < this.history.length - 1; i++) {
			let p = this.history[i]
			let q = this.history[i + 1]
			stroke(255, p.opacity)
			line(p.position.x, p.position.y, q.position.x, q.position.y)
		}

		noStroke()
		fill(colors.gray)
		circle(p.x, p.y, 30)

		noStroke()
		fill(colors.blue)
		circle(this.focus.x, this.focus.y, 30)
	}
}
