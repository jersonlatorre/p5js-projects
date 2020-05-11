let poseNet
let pose
let smoother = new PoseSmoother(0.9)
let video

let boxes = []

function setup() {
	createCanvas(640, 480, WEBGL)
	setAttributes('antialiasing', true)

	video = createCapture(VIDEO)
	video.size(width, height)
	video.hide()

	poseNet = ml5.poseNet(video, 'single', modelReady)
	poseNet.on('pose', function(result) {
		if (result[0] != null) {
			pose = smoother.smoothPose(result[0].pose)
		}
	})

	for (let i = 0; i < 100; i++) {
		boxes.push({ x: random(-width / 2, width / 2), y: random(-height / 2, height / 2), z: -random(200, 1000) })
	}
}

function draw() {
	translate(-width / 2, -height / 2)
	background(0)

	// push()
	// translate(width, 0)
	// scale(-1, 1)
	// image(video, 0, 0)
	// pop()

	if (pose) {
		let nose = createVector(width - pose.nose.x, pose.nose.y)
		let leftEye = createVector(width - pose.leftEye.x, pose.leftEye.y)
		let rightEye = createVector(width - pose.rightEye.x, pose.rightEye.y)

		let area =
			nose.x * (leftEye.y - rightEye.y) + leftEye.x * (rightEye.y - nose.y) + rightEye.x * (nose.y - leftEye.y)
		area = abs(area / 2)
		let center = nose.copy().add(leftEye).add(rightEye).mult(1 / 3)

		push()
		translate(width / 2, height / 2)
		scale(pow(area / 1000, 1 / 3))
		rotateY(map(center.x, 0, 640, PI / 3, -PI / 3))
		rotateX(map(center.y, 0, 480, -PI / 3, PI / 3))
		box(100)

		boxes.forEach((b) => {
			push()
			translate(b.x, b.y, b.z)
			box(30)
			pop()
		})
		pop()

		stroke(255, 0, 255)
		strokeWeight(2)

		// beginShape()
		// vertex(nose.x, nose.y)
		// vertex(leftEye.x, leftEye.y)
		// vertex(rightEye.x, rightEye.y)
		// endShape(CLOSE)
	}
}

function modelReady() {
	video.play()
	video.loop()
}

function onVideoLoaded() {
	console.log('hola')
}
