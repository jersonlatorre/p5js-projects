let waypoints = [
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

let paths = [
	[ 0, 1, 2, 3, 4 ],
	[ 0, 5, 6, 7, 8 ],
	[ 0, 9, 10, 11, 12 ]
]

let npcs = []
let towers = []
let explosions = []
let timer = 0

function setup() {
	createCanvas(640, 640)
	towerPositions.forEach((p) => {
		let tower = new Tower(p.x, p.y)
		towers.push(tower)
	})

	spawnNpc()
}

function draw() {
	scale(width / 500)
	clear()
	background('rgba(0, 0, 0, 0.15)')

	drawPaths()
	drawPoints()
	drawNpcs()
	drawTowers()
	drawExplosions()

	timer += deltaTime / 1000

	if (timer >= random(0.8, 1.2)) {
		timer = 0
		spawnNpc()
	}
}

function drawExplosions() {
	explosions.forEach((explosion, i) => {
		explosion.draw()
		if (explosion.isDead) {
			explosions.splice(i, 1)
		}
	})
}

function drawPoints() {
	waypoints.forEach((p, i) => {
		noStroke()
		fill('rgba(0, 0, 0, 0.1)')
		circle(p.x, p.y, 4)
	})
}

function drawPaths() {
	paths.forEach((path) => {
		for (let i = 0; i < path.length; i++) {
			if (i == path.length - 1) {
				let p = waypoints[path[i]]
				noStroke()
				fill('rgb(230, 230, 230)')
				circle(p.x, p.y, 60)
				fill('rgba(230, 230, 0, 0.5)')
				circle(p.x, p.y, 30)
			} else {
				let p1 = waypoints[path[i]]
				let p2 = waypoints[path[i + 1]]
				stroke('rgb(230, 230, 230)')
				strokeWeight(45)
				line(p1.x, p1.y, p2.x, p2.y)
			}
		}
	})
}

function drawNpcs() {
	npcs.forEach((npc, i) => {
		npc.draw()
		if (npc.isDead) {
			npcs.splice(i, 1)
		}
	})
}

function spawnNpc() {
	let npc = new Npc(paths[parseInt(random(0, 3))])
	npcs.push(npc)
}

function drawTowers() {
	towers.forEach((tower) => {
		tower.draw()
	})
}
