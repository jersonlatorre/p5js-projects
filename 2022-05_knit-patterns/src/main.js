let svg, svg2
let N = 80
let L

function preload() {
	svg = loadImage('assets/knit.svg')
}

function setup() {
	createCanvas(600, 600)
	colorMode(HSB, 360, 100, 100, 100)
	imageMode(CENTER)
  frameRate(5)

	L = width / N
	svg.resize(2 * L, 2 * L)
}

function draw() {
	background('#111')

  let r = 0.71

  console.log(r)
	for (let i = 0; i <= N / 2 ; i++) {
		for (let j = 0; j <= N / 2; j++) {
			let x = i * width / N 
			let y = j * height / N 


			let xx = map(x, 0, width / 2, 0, 2 * PI) * r
			let yy = map(y, 0, height / 2, 0, 2 * PI) * r

			let c = sin(xx % yy + yy % xx)

			c = map(c, -1, 1, 0, 360)
			c = 30 * parseInt(c / 30)
      
			push()
			translate(x, y)
      scale(0.6, 0.8)
			tint(c, 90, 90)
			image(svg, 0, 0)
			pop()

      push()
			translate(width - x, y)
      scale(0.6, 0.8)
			tint(c, 90, 90)
			image(svg, 0, 0)
			pop()

      push()
			translate(width - x, width - y)
      scale(0.6, 0.8)
			tint(c, 90, 90)
			image(svg, 0, 0)
			pop()

      push()
			translate(x, width - y)
      scale(0.6, 0.8)
			tint(c, 90, 90)
			image(svg, 0, 0)
			pop()
		}
	}

  // save(frameCount.toString().padStart(4, '0') + '.png')
  // if (frameCount > 100) {
  //   noLoop()
  // }

	noLoop()
}
