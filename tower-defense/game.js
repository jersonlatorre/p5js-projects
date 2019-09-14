class Game {
	static waypoints = [
		new p5.Vector(100, 100),
		new p5.Vector(200, 100),
		new p5.Vector(300, 100),
		new p5.Vector(400, 200),
		new p5.Vector(400, 300),
		new p5.Vector(200, 200),
		new p5.Vector(300, 200),
		new p5.Vector(300, 300),
		new p5.Vector(300, 400),
		new p5.Vector(100, 200),
		new p5.Vector(100, 300),
		new p5.Vector(100, 400),
		new p5.Vector(200, 400)
	]

	towerPositions = [
		new p5.Vector(200, 300),
		new p5.Vector(400, 100),
		new p5.Vector(400, 400)
	]

	paths = [
		[ 0, 1, 2, 3, 4 ],
		[ 0, 5, 6, 7, 8 ],
		[ 0, 9, 10, 11, 12 ]
	]

	towers = []
	timer = 0
	
	static npcs = []
	static effects = []
	static isShaking = false

	constructor() {
		this.towerPositions.forEach((p) => {
			let tower = new Tower(p.x, p.y)
			this.towers.push(tower)
		})

		this.spawnNpc()
	}

	draw() {
		clear()
		background('rgba(0, 0, 0, 0.12)')

		push()
		if (Game.isShaking) {
			translate(
				-Global.shakeAmplitude / 2 +
					Global.shakeAmplitude *
						noise(millis() / Global.shakeFrequency),
				-Global.shakeAmplitude / 2 +
					Global.shakeAmplitude *
						noise(millis() / Global.shakeFrequency + 10)
			)
		}

		
		this.drawPaths()
		this.drawPoints()
		this.drawTowers()
		this.drawNpcs()
		this.drawEffects()

		this.timer += deltaTime / 1000

		if (this.timer >= random(0.8, 1.8)) {
			this.timer = 0
			this.spawnNpc()
		}
		pop()
	}

	drawEffects() {
		Game.effects.forEach((effect, i) => {
			effect.draw()
			if (effect.isDead) {
				Game.effects.splice(i, 1)
			}
		})
	}

	drawPoints() {
		Game.waypoints.forEach((p, i) => {
			noStroke()
			fill('rgba(0, 0, 0, 0.1)')
			circle(p.x, p.y, 4)
		})

		let p = Game.waypoints[0]
		fill('rgba(0, 0, 0, 0.07)')
		circle(p.x, p.y, 25)
	}

	drawPaths() {
		this.paths.forEach((path) => {
			for (let i = 0; i < path.length; i++) {
				if (i == path.length - 1) {
					let p = Game.waypoints[path[i]]
					noStroke()
					fill('rgb(230, 230, 230)')
					circle(p.x, p.y, 60)
					fill('rgba(250, 200, 0, 0.5)')
					circle(p.x, p.y, 30)
				} else {
					let p1 = Game.waypoints[path[i]]
					let p2 = Game.waypoints[path[i + 1]]
					stroke('rgb(230, 230, 230)')
					strokeWeight(45)
					line(p1.x, p1.y, p2.x, p2.y)
				}
			}
		})
	}

	drawNpcs() {
		Game.npcs.forEach((npc, i) => {
			npc.draw()
			if (npc.isDead) {
				Game.npcs.splice(i, 1)
			}
		})
	}

	spawnNpc() {
		let npc = new Npc(this.paths[parseInt(random(0, 3))])
		Game.npcs.push(npc)
	}

	drawTowers() {
		this.towers.forEach((tower) => {
			tower.draw()
		})
	}
}
