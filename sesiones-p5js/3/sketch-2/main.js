let slider1

function setup() {
	createCanvas(600, 600)
	slider1 = createSlider(0, 100)
	slider1.position(10, 10)
}

function draw() {
	background('white')
	// let radio = slider1.value()
	// circle(300, 300, radio)

	let valor = slider1.value()

	for (let i = 0; i < valor; i++) {
		let x = i * 10
		let y = 300
		circle(x, y, 40)
	}
}


// Raul.P5j
// rbrsuarez@hotmail.com