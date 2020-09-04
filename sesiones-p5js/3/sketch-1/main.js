let canvasImg
let canvasMask
let p5Img

function preload() {
	p5Img = loadImage('assets/p5.png')
}

function setup() {
	createCanvas(600, 600)
	canvasImg = createGraphics(600, 600)
	canvasMask = createGraphics(600, 600)
}

function draw() {
	background('white')

	// se dibujan los canvas
	canvasImg.background('yellow')
	canvasImg.rectMode(CENTER)
	canvasImg.square(300, 300, 300)

	canvasMask.clear()
	canvasMask.circle(mouseX, mouseY, 300)

	// se convierten en imágenes
	let img = createImage(600, 600)
	img.copy(canvasImg, 0, 0, 600, 600, 0, 0, 600, 600)
	
	let mask = createImage(600, 600)
	mask.copy(canvasMask, 0, 0, 600, 600, 0, 0, 600, 600)
	
	// se dibuja le imagen
	img.mask(mask)
	image(img, 0, 0)

	push()
	blendMode(LIGHTEST)
	image(p5Img, 0, 0, 300, 300)
	pop()
}
