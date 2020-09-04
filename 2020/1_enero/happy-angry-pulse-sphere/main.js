let t = 0
let R = 300
let DENSITY = 12

let lastUpdate = Date.now()

let font
let letters = [ ':)', ':(' ]
let letterIndex = 0

let bgColor = 0
let fgColor = 255

let happyFace
let angryFace
let clapSound
let booSound

let CAMERA_DISTANCE = 1200

function preload() {
	font = loadFont('Coyotris Serif.ttf')
	happyFace = loadImage('happy.png')
	sadFace = loadImage('sad.png')
	clapSound = loadSound('claps.mp3')
	booSound = loadSound('boo.mp3')
}

function setup() {
	createCanvas(1080, 1080, WEBGL)
	textSize(22)
	textFont(font)
	textAlign(CENTER, CENTER)
	imageMode(CENTER, CENTER)
	smooth()
}

function draw() {
	calculateColors()
	background(bgColor)

	drawSphere()
	t += 0.5 * deltaTime / 1000

	if (t >= 1) {
		t = 0
		letterIndex++
		if (letterIndex == letters.length) {
			letterIndex = 0
		}

		// if (letterIndex == 0) {
		// 	clapSound.play()
		// } else {
		// 	booSound.play()
		// }
	}
}

function drawSphere() {
	let cameraDistance = CAMERA_DISTANCE - R * sin(PI * t)
	let cx = cameraDistance * cos(2 * PI * t / 4 - PI / 4)
	let cz = cameraDistance * sin(2 * PI * t / 4 - PI / 4)
	camera(cx, 0, cz, 0, 0, 0, 0, 1, 0)

	noStroke()
	fill(bgColor)
	sphere(R)

	for (let i = 0; i <= DENSITY; i++) {
		lat = i * PI / DENSITY
		dLon = PI / constrain(floor(DENSITY * sin(lat)), 0.5, parseInt(DENSITY))
		for (let lon = 0; lon < 2 * PI; lon += dLon) {
			push()
			let x = R * cos(lon) * sin(lat)
			let y = R * sin(lon) * sin(lat)
			let z = R * cos(lat)

			let nx = sin(lat)
			let ny = sin(lon / 2)

			translate(x, y, z)
			rotateZ(lon)
			rotateY(lat)
			rotateZ(t * PI - PI / 2)

			let alpha = map(dist(x, y, z, cx, 0, cz), cameraDistance - R, cameraDistance + R, 255, 0)
			fill(fgColor, alpha)
			noStroke()
			scale(0.1)
			scale(sin(t * PI))
			// text(letters[letterIndex], 0, 0)
			if (letterIndex == 0) image(happyFace, 0, 0)
			else image(sadFace, 0, 0)
			pop()
		}
	}
}

function calculateColors() {
	let bias = 0.07
	if (letterIndex == 0) {
		// blanco
		if (t >= 0 && t < bias) {
			let p = map(t, 0, bias, 125, 255)
			fgColor = 0
			bgColor = p
		} else if (t <= 1 && t > 1 - bias) {
			let p = map(t, 1 - bias, 1, 255, 125)
			fgColor = 0
			bgColor = p
		} else {
			fgColor = 0
			bgColor = 255
		}
	} else {
		// negro
		if (t >= 0 && t < bias) {
			let p = map(t, 0, bias, 125, 0)
			fgColor = 255
			bgColor = p
		} else if (t <= 1 && t > 1 - bias) {
			let p = map(t, 1 - bias, 1, 0, 125)
			fgColor = 255
			bgColor = p
		} else {
			fgColor = 255
			bgColor = 0
		}
	}
}
