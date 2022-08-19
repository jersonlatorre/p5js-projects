let entities = []
let cell_size = 40
let diagonal
let mouseSmoothX = 0, mouseSmoothY = 0

function setup() {
	createCanvas(windowWidth, windowHeight)
	let nw = int(windowWidth / cell_size)
	let nh = int(windowHeight / cell_size)
	let offsetx = (windowWidth - cell_size * nw) / 2
	let offsety = (windowHeight - cell_size * nh) / 2
	diagonal = sqrt(windowWidth * windowWidth + windowHeight * windowHeight)

	for (let i = 0; i <= nw; i++) {
		for (let j = 0; j <= nh; j++) {
			entities.push(new Entity(i * cell_size + offsetx, j * cell_size + offsety))
		}
	}
}

function draw() {
	background('black')
	mouseSmoothX = lerp(mouseSmoothX, mouseX, 0.06)
	mouseSmoothY = lerp(mouseSmoothY, mouseY, 0.06)
	fill('red')
	entities.forEach(entity => {
		entity.draw()
	})
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}
