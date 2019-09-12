class Tower {
	constructor(x, y) {
		this.position = new p5.Vector(x, y)
		this.radius = 250
		this.t = 0
	}

	draw() {
		noStroke()
		fill('green')
		circle(this.position.x, this.position.y, 20)
		fill('rgba(0, 0, 0, 0.2)')
		circle(this.position.x, this.position.y, 10)

		let minDist = 9999999999
		let minIndex = -1
		npcs.forEach((npc, i) => {
			let d = p5.Vector.dist(npc.position, this.position)

			if (d < this.radius / 2 && d < minDist) {
				minDist = d
				minIndex = i
			}
		})

		let nearest

		if (minIndex != -1) {
			nearest = npcs[minIndex].position
			if (this.t % 8 == 0) {
				npcs[minIndex].hit()
				stroke('gray')
				strokeWeight(3)
				line(
					nearest.x,
					nearest.y,
					this.position.x,
					this.position.y
				)
			}
		}

		this.t += 1
	}
}