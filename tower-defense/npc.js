class Npc {
	position = new p5.Vector(0, 0)
	speed = 0.7
	maxhp = 100
	minSize = 5
	maxSize = 15
	isDead = false
	index = 0
	t = 0
	tAppear = 0
	size = 0
	state = 'APPEARING'
	hp = this.maxhp

	constructor(path) {
		this.path = path
	}

	draw() {
		switch (this.state) {
			case 'APPEARING':
				let p = Game.waypoints[this.path[this.index]]
				push()
				translate(p.x, p.y)
				fill('rgb(220, 80, 0)')
				noStroke()
				circle(0, 0, this.size)
				fill('rgba(0, 0, 0, 0.2)')
				circle(0, 0, this.size / 2)
				pop()

				this.size = this.maxSize * this.easing(this.tAppear)
				this.tAppear += 0.05
				if (this.tAppear >= 1) {
					this.state = 'MOVING'
					this.tAppear = 0
				}

				break

			case 'MOVING':
				let p1 = Game.waypoints[this.path[this.index]]
				let p2 = Game.waypoints[this.path[this.index + 1]]
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

				rectMode(CORNER)
				noStroke()
				fill('rgba(0, 0, 0, 0.5)')
				rect(-7, -15, 14, 5)
				fill('rgb(100, 255, 0)')
				rect(-6, -14, 12 * this.hp / this.maxhp, 3)
				pop()

				break
		}
	}

	easing(t) {
		return 4.3 * t - 3.3 * t * t
	}

	next() {
		this.t = 0
		this.index++
		if (this.index > this.path.length - 2) {
			this.win()
		}
	}

	hit() {
		this.hp -= 20

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

		Game.effects.push(explosion)
	}

	win() {
		let endPoint = Game.waypoints[this.path[this.index]]
		this.isDead = true
		let wave = new Wave(endPoint.x, endPoint.y)
		Game.effects.push(wave)
	}
}
