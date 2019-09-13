class Explosion {
	particles = []
	isDead = false

	constructor(x, y) {
		this.x = x
		this.y = y

		for (let i = 0; i < 15; i++) {
			let particle = new Particle(this.x, this.y)
			this.particles.push(particle)
		}

		Game.isShaking = true
		setTimeout(() => {
			Game.isShaking = false
		}, Game.shakeDuration)
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
	velocity = p5.Vector.random2D().mult(random(0.5, 3))
	size = 10
	isDead = false

	constructor(x, y) {
		this.position = new p5.Vector(x, y)
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
