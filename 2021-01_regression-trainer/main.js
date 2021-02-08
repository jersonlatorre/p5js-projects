let featureExtractor
let regressor
let video
let canvas
let value = 0
let smoothValue = 0

let numSamples1 = 0
let numSamples2 = 0

let VIDEO_SIZE = 320

let isTrained = false

function setup() {
  canvas = createCanvas(VIDEO_SIZE, VIDEO_SIZE)
  canvas.parent('videoContainer')

  initModel()
  setupButtons()
}

function initModel() {
  if (video) video.remove()
  video = createCapture(VIDEO)
  video.hide()
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady)
  regressor = featureExtractor.regression(video, videoReady)

  select('#modelStatusMessage').html('cargando modelo...')
  select('#modelStatusIndicator').style('background-color', 'red')

  select('#videoStatusMessage').html('cargando webcam')
  select('#videoStatusIndicator').style('background-color', 'red')
}

function draw() {
  background('black')
  image(video, 0, 0, video.width, video.height)

  if (isTrained) {
    smoothValue = lerp(smoothValue, value, 0.1)
    let x = map(smoothValue, 0, 1, 0, width)
    fill('red')
    circle(x, height / 2, 20)
  }
}

// A function to be called when the model has been loaded
function modelReady() {
  select('#modelStatusMessage').html('modelo cargado')
  select('#modelStatusIndicator').style('background-color', 'rgb(0, 140, 255)')
}

// A function to be called when the video has loaded
function videoReady() {
  let aspectRatio = video.width / video.height
  resizeCanvas(VIDEO_SIZE, VIDEO_SIZE / aspectRatio)
  video.size(VIDEO_SIZE, VIDEO_SIZE / aspectRatio)
  select('#videoStatusMessage').html('webcam cargada')
  select('#videoStatusIndicator').style('background-color', 'rgb(0, 140, 255)')
}

// Classify the current frame.
function predict() {
  regressor.predict(gotResults)
}

// A util function to create UI buttons
function setupButtons() {
  select('#state1').mousePressed(() => {
    regressor.addImage(0.01)
    numSamples1++
    select('#stateCounter1').html(numSamples1 + ' muestras')
  })

  select('#state2').mousePressed(() => {
    regressor.addImage(1)
    numSamples2++
    select('#stateCounter2').html(numSamples2 + ' muestras')
  })

  // Train Button
  select('#train').mousePressed(() => {
    if (isTrained) {
      console.log('descargar')
    } else {
      regressor.train(function(lossValue) {
        if (lossValue) {
          select('#train').html(`Loss: ${lossValue}`)
        } else {
          isTrained = true
          predict()
          select('#train').html(`Modelo Entrenado! <br> Descargar`)
        }
      })
    }
  })

  select('#reset').mousePressed(() => {
    isTrained = false
    numSamples1 = 0
    numSamples2 = 0
    select('#stateCounter1').html('0 muestras')
    select('#stateCounter2').html('0 muestras')
    select('#train').html('Entrenar Modelo')
    initModel()
  })
}

// Show the results
function gotResults(err, result) {
  if (err) {
    console.error(err)
  }
  if (result && result.value && isTrained) {
    value = result.value
    predict()
  }
}
