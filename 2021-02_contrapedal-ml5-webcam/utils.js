let featureExtractor
let regressor
let video
let canvas
let value = 0

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

function initModel() {
  video = createCapture(VIDEO)
  video.hide()
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady)
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

