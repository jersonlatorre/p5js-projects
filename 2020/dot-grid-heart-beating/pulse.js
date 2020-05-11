class Pulse {
	constructor() {
		this.firstIndex = 0
		this.index = this.firstIndex
		this.isDead = false
		this.timer = 0
	}

	draw() {
		pulsesCanvas.background('rgba(255, 255, 255, 0.2)')
		pulsesCanvas.colorMode(HSB)

		pulsesCanvas.push()
		let color = map(this.index, this.firstIndex, N_DOTS - 1, 0, 255)

		pulsesCanvas.noStroke()
		pulsesCanvas.fill(color, 255, 255)
		pulsesCanvas.rect(
			MARGIN + GRID_SIZE / 2,
			MARGIN + GRID_SIZE / 2 + (N_DOTS - this.index) * GRID_SIZE,
			GRID_SIZE * (N_DOTS - 1),
			GRID_SIZE
		)
		pulsesCanvas.pop()
		this.timer += deltaTime / 1000
		if (this.timer >= 0.01) {
			this.timer = 0
			this.next()
		}

		pulsesCanvas.fill('white')
		pulsesCanvas.stroke('white')
		pulsesCanvas.push()
		pulsesCanvas.rect(MARGIN + GRID_SIZE / 2, 0, GRID_SIZE * (N_DOTS - 1), MARGIN + GRID_SIZE / 2)
		pulsesCanvas.rect(MARGIN + GRID_SIZE / 2, height - MARGIN - GRID_SIZE / 2, GRID_SIZE * (N_DOTS - 1), GRID_SIZE * 10)
		pulsesCanvas.pop()
		
		image(pulsesCanvas, 0, 0)
	}

	next() {
		this.index++
		if (this.index == N_DOTS + 5) {
			this.isDead = true
		}
	}
}
