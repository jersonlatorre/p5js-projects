class Tower {
	radius = 250
	t = 0
	bullets = []

	constructor(x, y) {
		this.position = new p5.Vector(x, y)
	}

	draw() {
		noStroke()
		fill('green')
		circle(this.position.x, this.position.y, 20)
		fill('rgba(0, 0, 0, 0.2)')
		circle(this.position.x, this.position.y, 10)

		let minDist = 9999999999
		let minIndex = -1
		Game.npcs.forEach((npc, i) => {
			let d = p5.Vector.dist(npc.position, this.position)

			if (d < this.radius / 2 && d < minDist) {
				minDist = d
				minIndex = i
			}
		})

		if (minIndex != -1) {
			if (this.t % 15 == 0) {
				let bullet = new Bullet(
					this.position.x,
					this.position.y,
					Game.npcs[minIndex]
				)
				this.bullets.push(bullet)
			}
		}

		this.bullets.forEach((bullet, i) => {
			bullet.draw()
			if (bullet.isDead) {
				this.bullets.splice(i, 1)
			}
		})

		this.t += 1
	}
}
