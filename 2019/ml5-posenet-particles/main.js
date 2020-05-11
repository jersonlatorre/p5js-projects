let poseNet
let pose
let smoother = new PoseSmoother(0.7)

let video
let ps1 = new ParticleSystem()
let ps2 = new ParticleSystem()

function setup() {
	createCanvas(640, 450)

	video = createVideo('assets/video.mp4')
	// video = createCapture(VIDEO)
	video.size(width, height)
	video.hide()

	poseNet = ml5.poseNet(
		video,
		'single',
		modelReady
	)
	poseNet.on('pose', function(result) {
		if (result[0] != null) {
			pose = smoother.smoothPose(
				result[0].pose
			)
		}
	})

	background('black')
	colorMode(HSB)
}

function draw() {
	image(video, 0, 0, width, height)
	background('rgba(0, 0, 0, 0.7)')

	if (pose) {
		stroke(255, 0, 255)
		strokeWeight(2)

		// tronco
		line(
			pose.leftHip.x,
			pose.leftHip.y,
			pose.rightHip.x,
			pose.rightHip.y
		)
		line(
			pose.leftHip.x,
			pose.leftHip.y,
			pose.leftShoulder.x,
			pose.leftShoulder.y
		)
		line(
			pose.rightHip.x,
			pose.rightHip.y,
			pose.rightShoulder.x,
			pose.rightShoulder.y
		)
		line(
			pose.rightShoulder.x,
			pose.rightShoulder.y,
			pose.leftShoulder.x,
			pose.leftShoulder.y
		)

		// pierna izquierda
		line(
			pose.leftHip.x,
			pose.leftHip.y,
			pose.leftKnee.x,
			pose.leftKnee.y
		)
		line(
			pose.leftKnee.x,
			pose.leftKnee.y,
			pose.leftAnkle.x,
			pose.leftAnkle.y
		)

		// pierna derecha
		line(
			pose.rightHip.x,
			pose.rightHip.y,
			pose.rightKnee.x,
			pose.rightKnee.y
		)
		line(
			pose.rightKnee.x,
			pose.rightKnee.y,
			pose.rightAnkle.x,
			pose.rightAnkle.y
		)

		// brazo izquierdo
		line(
			pose.leftShoulder.x,
			pose.leftShoulder.y,
			pose.leftElbow.x,
			pose.leftElbow.y
		)
		line(
			pose.leftElbow.x,
			pose.leftElbow.y,
			pose.leftWrist.x,
			pose.leftWrist.y
		)

		// brazo derecho
		line(
			pose.rightShoulder.x,
			pose.rightShoulder.y,
			pose.rightElbow.x,
			pose.rightElbow.y
		)
		line(
			pose.rightElbow.x,
			pose.rightElbow.y,
			pose.rightWrist.x,
			pose.rightWrist.y
		)

		noStroke()

		// cabeza
		fill('white')
		circle(pose.nose.x, pose.nose.y, 30)
		fill('black')
		circle(pose.nose.x, pose.nose.y, 10)

		// manos
		fill('white')
		circle(
			pose.leftWrist.x,
			pose.leftWrist.y,
			5
		)
		circle(
			pose.rightWrist.x,
			pose.rightWrist.y,
			5
		)

		// pies
		circle(
			pose.leftAnkle.x,
			pose.leftAnkle.y,
			5
		)
		circle(
			pose.rightAnkle.x,
			pose.rightAnkle.y,
			5
		)

		// partículas
		ps1.update(
			pose.rightWrist.x,
			pose.rightWrist.y
		)
		ps1.draw()

		ps2.update(
			pose.leftWrist.x,
			pose.leftWrist.y
		)
		ps2.draw()
	}
}

function modelReady() {
	video.play()
	video.loop()
}
