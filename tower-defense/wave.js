class Wave {
	radius = 5
	isDead = false

	constructor(x, y) {
		this.position = new p5.Vector(x, y)
	}

	draw() {
		noFill()
		let opacity = map(this.radius, 5, 50, 1, 0)
		stroke('rgba(255, 150, 0, ' + opacity + ')')
		strokeWeight(10)
		circle(this.position.x, this.position.y, this.radius)

		this.radius += 3
		if (this.radius > 45) {
			this.isDead = true
		}
	}
}
