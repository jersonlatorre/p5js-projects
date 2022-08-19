class Entity {
	constructor(x, y) {
		this.position = createVector(x, y)
	}
	draw() {
		let distance = dist(mouseSmoothX, mouseSmoothY, this.position.x, this.position.y)
		fill('red')
		noStroke()
		let angle = map(distance, 0, diagonal, 2 * PI, 0)
		angle = atan2(mouseSmoothY - this.position.y, mouseSmoothX - this.position.x)
		let factor = map(distance, 0, diagonal, 1, 0)
		let weight = map(distance, 0, diagonal, 4, 0)
		push()
		translate(this.position.x, this.position.y)
		rotate(angle)
		// -----------------
		// strokeWeight(weight)
		// stroke('rgba(255, 255, 255, 0.5)')
		// line(-size, 0, size, 0)
		fill('white')
		noStroke()
		circle(0, 0, cell_size * factor * 0.9)
		stroke('black')
		strokeWeight(3 * factor)
		line(-cell_size * 0.2 * factor, 0, cell_size * 0.2 * factor, 0)
		// ----------------
		pop()
	}
}