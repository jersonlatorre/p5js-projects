let featureExtractor
let regressor
let video
let value = 0
let smoothValue = 0

function setup() {
  createCanvas(600, 600)
  colorMode(HSB, 100, 100, 100)

  video = createCapture(VIDEO)
  video.hide()

  featureExtractor = ml5.featureExtractor('MobileNet', modelReady)
}

function draw() {
  background('black')
  smoothValue = lerp(smoothValue, value, 0.1)
  
  let size = map(smoothValue, 0, 1, 0, 50)
  let color = map(smoothValue, 0, 1, 0, 100)
  
  noStroke()
  for (let i = 0; i < 100; i++) {
    textSize(size)
    textAlign(CENTER, CENTER)
    fill(random(100), color, color)
    text('hola', random(600), random(600))
  }
}

function modelReady() {
  featureExtractor.load('model/model.json', myModelReady)
}

function myModelReady() {
  regressor = featureExtractor.regression(video, videoReady)
}

function videoReady() {
  video.size(320, 320 * video.height / video.width)
  predict()
}

function predict() {
  regressor.predict(gotResults)
}

function gotResults(err, result) {
  if (err) {
    console.error(err)
  }
  if (result && result.value) {
    value = result.value
    predict()
  }
}
