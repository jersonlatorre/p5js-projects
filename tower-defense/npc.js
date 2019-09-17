class Npc {
	position = new p5.Vector(0, 0)
	velocity = new p5.Vector(0, 0)
	steer = new p5.Vector(0, 0)
	maxForce = 1.5
	maxSteer = 0.08

	speed
	maxHp = 100
	minSize = 5
	maxSize = 18
	isDead = false
	index = 0
	t = 0
	tAppear = 0
	size = 0
	State = { APPEARING: 0, MOVING: 1, DEAD: 2 }
	state = this.State.APPEARING
	hp = this.maxHp

	constructor(path) {
		this.path = path
		this.speed = Global.npcSpeed
	}

	draw() {
		switch (this.state) {
			case this.State.APPEARING: {
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
				this.tAppear += 0.03
				if (this.tAppear >= 1) {
					this.size = this.maxSize
					this.state = this.State.MOVING
					this.tAppear = 0
					this.position = new p5.Vector(p.x, p.y)
				}

				break
			}

			case this.State.MOVING: {
				// usando steering behaviours
				let p = Game.waypoints[this.path[this.index]]
				let pos = new p5.Vector(p.x, p.y)
				this.velocity.add(SteeringBehaviours.seek(this, pos))
				this.position.add(this.velocity)
				if (p5.Vector.dist(p, this.position) < 10) {
					this.index++
					if (this.index > this.path.length - 1) {
						this.state = this.State.DEAD
						this.win()
					}
				}

				// usando LERP
				// let p1 = Game.waypoints[this.path[this.index]]
				// let p2 = Game.waypoints[this.path[this.index + 1]]
				// this.position = p5.Vector.lerp(p1, p2, this.t)
				// this.t += this.speed * 0.02
				// if (this.t >= 1) this.next()

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
				rect(-7, -16, 14, 4)
				fill('rgb(100, 255, 0)')
				rect(-6, -15, 12 * this.hp / this.maxHp, 2)
				pop()

				break
			}
		}
	}

	easing(t) {
		return 4 * t - 3 * t * t
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

		this.size = map(this.hp, 0, this.maxHp, this.minSize, this.maxSize)

		fill('yellow')
		noStroke()
		circle(this.position.x, this.position.y, this.size + 6)
	}

	die() {
		this.isDead = true
		let explosion = new Explosion(this.position.x, this.position.y)

		Game.effects.push(explosion)
	}

	win() {
		let endPoint = Game.waypoints[this.path[this.path.length - 1]]
		this.isDead = true
		let wave = new Wave(endPoint.x, endPoint.y)
		Game.effects.push(wave)
	}
}
