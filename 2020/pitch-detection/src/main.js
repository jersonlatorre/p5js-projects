let audioContext
let mic
let pitch
let currentFrequency
let prevFrequency
let backgroundColor = 0

function setup() {
	audioContext = getAudioContext()
	mic = new p5.AudioIn()
	mic.start(startPitch)
	createCanvas(600, 600)
}

function draw() {
	background(backgroundColor)
	fill(125)
	textSize(30)
	textAlign(CENTER, CENTER)
	text(currentFrequency + '', 300, 300)
}

function startPitch() {
	pitch = ml5.pitchDetection(
		'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/',
		audioContext,
		mic.stream,
		modelLoaded
	)
}

function modelLoaded() {
	console.log('model loaded')
	getPitch()
}

function onNoteStarted() {
	console.log('note start')
	backgroundColor = 255
}

function onNoteFinished() {
	console.log('note end')
	backgroundColor = 0
}

function getPitch() {
	if (prevFrequency == null && currentFrequency != null) {
		onNoteStarted()
	}

	if (prevFrequency != null && currentFrequency == null) {
		onNoteFinished()
	}

	pitch.getPitch(function(err, f) {
		prevFrequency = currentFrequency
		currentFrequency = f
		getPitch()
	})
}
