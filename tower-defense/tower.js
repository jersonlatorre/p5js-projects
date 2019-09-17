class Tower {
	attackRadius = 250
	actionRadius = 60
	bullets = []
	position
	basePosition
	t = 0
	velocity = new p5.Vector(0, 0)
	steer
	maxForce = 0.5
	maxSteer = 0.5

	constructor(x, y) {
		this.position = new p5.Vector(x, y)
		this.basePosition = new p5.Vector(x, y)
	}

	draw() {
		let nearest = this.getNearestNpc()
		// this.steer = new p5.Vector(0, 0)
		this.steer = SteeringBehaviours.arrive(this, this.basePosition, this.actionRadius)
		if (nearest != null) {
			this.steer.add(SteeringBehaviours.seek(this, nearest.position))
			if (this.t % 15 == 0) {
				let bullet = new Bullet(this.position.x, this.position.y, nearest)
				this.bullets.push(bullet)
			}
		}

		this.velocity.add(this.steer)
		this.position.add(this.velocity)

		this.bullets.forEach((bullet, i) => {
			bullet.draw()
			if (bullet.isDead) {
				this.bullets.splice(i, 1)
			}
		})

		this.t += 1

		noStroke()
		fill('rgba(100, 180, 0, 1)')
		circle(this.position.x, this.position.y, 20)
		fill('rgba(0, 0, 0, 0.2)')
		circle(this.position.x, this.position.y, 10)
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
