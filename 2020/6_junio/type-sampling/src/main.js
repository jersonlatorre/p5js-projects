let fuente
let temporal
let puntos = []

function preload() {
	fuente = loadFont('assets/FoundersGrotesk-Bold.otf')
}

function setup() {
	createCanvas(600, 600)

	frameRate(3)
	temporal = createGraphics(600, 600)
	temporal.background('white')
	temporal.textFont(fuente)
	temporal.textSize(450)
	temporal.text('P', 180, 450)

	samplearImagen()
}

function draw() {
	background('white')

	puntos.forEach((punto, i) => {
		let x = punto.x
		let y = punto.y

		// tipo 1
		// let xx = punto.x + 15 * noise(i, millis() / 500)
		// let yy = punto.y + 15 * noise(i + 1, millis() / 500)
		
		// tipo 2
		let xx = punto.x + random(-15, 15)
		let yy = punto.y + random(-15, 15)
		
		// let distancia = dist(mouseX, mouseY, x, y)
		// strokeWeight(map(distancia, 0, 400, 5, 1))

		line(x, y, xx, yy)
	})
}

function samplearImagen() {
	let n = 60

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			let x = i * 600 / n + random(-3, 3)
			let y = j * 600 / n + random(-3, 3)
			if (temporal.get(x, y)[0] == 0 && x > 10 && y > 10) {
				puntos.push(createVector(x, y))
			}
		}
	}
}
