class Explosion {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.particles = []
		this.isDead = false

		for (let i = 0; i < 15; i++) {
			let particle = new Particle(this.x, this.y)
			this.particles.push(particle)
		}
	}

	draw() {
		this.particles.forEach((particle, i) => {
			particle.draw()
			if (particle.isDead) {
				this.particles.splice(i, 1)
			}

			if (this.particles.length == 0) {
				this.isDead = true
			}
		})
	}
}

class Particle {
	constructor(x, y) {
		this.position = new p5.Vector(x, y)
		this.velocity = p5.Vector.random2D()
		this.velocity.mult(random(1, 2))
		this.size = 10
		this.isDead = false
	}

	draw() {
		this.size--

		if (this.size < 0) {
			this.size = 0
			this.isDead = true
		}

		this.position.add(this.velocity)
		let opacity = map(this.size, 0, 10, 0, 1)
		fill('rgba(180, 180, 180,' + opacity + ')')
		noStroke()
		circle(this.position.x, this.position.y, this.size)
	}
}
