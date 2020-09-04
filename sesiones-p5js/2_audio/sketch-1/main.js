function preload() {

}

function setup() {
	createCanvas(600, 600)
	colorMode(HSB)
}

function draw() {
	let hue = map(mouseX, 0, 600, 0, 360)
	let saturation = map(mouseX, 0, 600, 0, 100)
	let brightness = map(mouseX, 0, 600, 0, 100)
	
	//          h    s    b
	background(hue, saturation, brightness)

	let radio = map(mouseX, 0, 600, 100, 500)
	circle(300, 300, radio)
}
