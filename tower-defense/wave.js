class Wave {
	constructor(x, y) {
		this.position = new p5.Vector(x, y)
		this.radius = 5
		this.isDead = false
	}

	draw() {
		let opacity = map(this.radius, 5, 50, 1, 0)
		noFill()
		stroke('rgba(255, 150, 0, ' + opacity + ')')
		strokeWeight(5)
		circle(this.position.x, this.position.y, this.radius)
		this.radius += 3
		if (this.radius > 50) {
			this.isDead = true
		}
	}
}