class Tower {
	attackRadius = 250
	actionRadius = 50
	bullets = []
	position
	basePosition
	t = 0
	velocity = new p5.Vector(0, 0)
	steer
	maxForce = 1
	maxSteer = 0.9

	zzzs = []
	timerZzz = 0

	State = { SLEEPING: 0, ATTACKING: 1, RETURNING: 2 }
	state = this.State.SLEEPING

	constructor(x, y) {
		this.position = new p5.Vector(x, y)
		this.basePosition = new p5.Vector(x, y)
	}

	draw() {
		switch (this.state) {
			case this.State.SLEEPING: {
				if (this.timerZzz > 0.3) {
					this.timerZzz = 0
					this.spawnZzz()
				}

				this.timerZzz += 0.01

				noStroke()
				fill('rgba(100, 180, 0, 1)')
				circle(this.position.x, this.position.y, 20)
				fill('rgba(0, 0, 0, 0.2)')
				circle(this.position.x, this.position.y, 10)

				if (this.getNearestNpc() != null) {
					this.state = this.State.ATTACKING
				}

				break
			}

			case this.State.ATTACKING: {
				let nearest = this.getNearestNpc()

				if (nearest != null) {
					this.steer = new p5.Vector(0, 0)
					this.steer.add(SteeringBehaviours.arrive(this, this.basePosition, this.actionRadius))
					this.steer.add(SteeringBehaviours.seek(this, nearest.position))

					if (this.t % 15 == 0) {
						let bullet = new Bullet(this.position.x, this.position.y, nearest)
						this.bullets.push(bullet)
					}

					this.t += 1
				} else {
					this.state = this.State.RETURNING
				}

				this.velocity.add(this.steer)
				this.position.add(this.velocity)

				noStroke()
				fill('rgba(100, 180, 0, 1)')
				circle(this.position.x, this.position.y, 20)
				fill('rgba(0, 0, 0, 0.2)')
				circle(this.position.x, this.position.y, 10)

				break
			}

			case this.State.RETURNING: {
				this.steer = SteeringBehaviours.arrive(this, this.basePosition, this.actionRadius)
				this.velocity.add(this.steer)
				this.position.add(this.velocity)

				if (this.velocity.mag() < 0.1) {
					this.state = this.State.SLEEPING
				}

				if (this.getNearestNpc() != null) {
					this.state = this.State.ATTACKING
				}

				noStroke()
				fill('rgba(100, 180, 0, 1)')
				circle(this.position.x, this.position.y, 20)
				fill('rgba(0, 0, 0, 0.2)')
				circle(this.position.x, this.position.y, 10)
				break
			}
		}

		this.bullets.forEach((bullet, i) => {
			bullet.draw()
			if (bullet.isDead) {
				this.bullets.splice(i, 1)
			}
		})

		this.zzzs.forEach((zzz, i) => {
			zzz.draw()
			if (zzz.isDead) {
				this.zzzs.splice(i, 1)
			}
		})
	}

	spawnZzz() {
		let zzz = new Zzz(this.position.x, this.position.y)
		this.zzzs.push(zzz)
	}

	getNearestNpc() {
		let minDist = 9999999999
		let minIndex = -1
		Game.npcs.forEach((npc, i) => {
			let d = p5.Vector.dist(npc.position, this.position)

			if (d < this.attackRadius / 2 && d < minDist) {
				minDist = d
				minIndex = i
			}
		})

		if (minIndex < 0) return null
		else return Game.npcs[minIndex]
	}
}
