class Explosion {
	particles = []
	numParticles = 25
	isDead = false

	constructor(x, y) {
		this.x = x
		this.y = y

		for (let i = 0; i < this.numParticles; i++) {
			let particle = new Particle(this.x, this.y)
			this.particles.push(particle)
		}

		Game.isShaking = true
		setTimeout(() => {
			Game.isShaking = false
		}, Global.shakeDuration)
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
	velocity = p5.Vector.random2D().mult(random(0.5, 4))
	maxSize = 4
	size = this.maxSize
	isDead = false

	constructor(x, y) {
		this.position = new p5.Vector(x, y)
	}

	draw() {
		this.size -= 0.1

		if (this.size < 0) {
			this.size = 0
			this.isDead = true
		}

		this.position.add(this.velocity)
		this.velocity.mult(0.93)
		let opacity = map(this.size, 0, this.maxSize, 0, 1)
		fill('rgba(160, 160, 160,' + opacity + ')')
		noStroke()
		circle(this.position.x, this.position.y, this.size)
	}
}
