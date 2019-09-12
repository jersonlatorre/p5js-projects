class Npc {
	constructor(path) {
		this.position = new p5.Vector(0, 0)
		this.path = path

		this.speed = 0.7
		this.maxhp = 100
		this.minSize = 5
		this.maxSize = 15
		this.isDead = false

		this.hp = this.maxhp
		this.index = 0
		this.t = 0
		this.size = 0

		this.state = 'APPEARING'
	}

	draw() {
		switch (this.state) {
			case 'APPEARING':
				let p = waypoints[this.path[this.index]]
				push()
				translate(p.x, p.y)
				fill('rgb(220, 80, 0)')
				noStroke()
				circle(0, 0, this.size)
				fill('rgba(0, 0, 0, 0.2)')
				circle(0, 0, this.size / 2)
				pop()

				this.size += 0.7
				if (this.size >= this.maxSize) {
					this.size = this.maxSize
					this.state = "MOVING"
				}
				break

			case 'MOVING':
				let p1 = waypoints[this.path[this.index]]
				let p2 = waypoints[this.path[this.index + 1]]
				this.position = p5.Vector.lerp(p1, p2, this.t)

				this.t += this.speed * deltaTime / 1000
				if (this.t >= 1) this.next()

				push()
				translate(this.position.x, this.position.y)
				fill('rgb(220, 80, 0)')
				noStroke()
				circle(0, 0, this.size)
				fill('rgba(0, 0, 0, 0.2)')
				circle(0, 0, this.size / 2)

				noStroke()
				fill('rgba(0, 0, 0, 0.5)')
				rect(-7, -15, 14, 5)
				fill('rgb(100, 255, 0)')
				rect(-6, -14, 12 * this.hp / this.maxhp, 3)
				pop()
				break
		}
	}

	next() {
		this.t = 0
		this.index++
		if (this.index > this.path.length - 2) {
			this.win()
		}
	}

	hit() {
		this.hp -= 10

		if (this.hp <= 0) {
			this.die()
		}

		this.size = map(
			this.hp,
			0,
			this.maxhp,
			this.minSize,
			this.maxSize
		)

		fill('yellow')
		noStroke()
		circle(this.position.x, this.position.y, this.size + 6)
	}

	die() {
		this.isDead = true
		let explosion = new Explosion(
			this.position.x,
			this.position.y
		)

		explosions.push(explosion)
	}

	win() {
		let endPoint = waypoints[this.path[this.index]]
		this.isDead = true
		let wave = new Wave(endPoint.x, endPoint.y)
		waves.push(wave)
	}
}
