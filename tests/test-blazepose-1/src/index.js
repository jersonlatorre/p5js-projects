import '@tensorflow/tfjs-core'
import '@tensorflow/tfjs-backend-webgl'
import '@mediapipe/pose'

import * as bodySegmentation from '@tensorflow-models/body-segmentation'
import * as poseDetection from '@tensorflow-models/pose-detection'

import p from 'p5-easy'

const colors = ['#000000', '#FF004D', '#FFA300', '#FFEC27', '#29ADFF', ' #F5EFE7 ']
// let circleSizeA = 0
// let circleSizeB = 0
// let angle = 0
let x1 = 0
let y1 = 0
let x2 = 0
let y2 = 0

const model = poseDetection.SupportedModels.BlazePose
const detectorConfig = {
  runtime: 'mediapipe',
  modelType: 'full',
  enableSmoothing: true,
  enableSegmentation: true,
  smoothSegmentation: true,
  maxPoses: 1,
  refineSteps: 0,
  solutionPath: '../node_modules/@mediapipe/pose',
}

let detector
let webcam
let maskCanvas
let previewCanvas

p.setup = async () => {
  p.createCanvas(640, 640)
  p.background('black')
  p.colorMode(p.HSB)

  webcam = p.createCapture(p.VIDEO, onWebcamLoaded)
  webcam.size(640, 480)
  webcam.hide()

  maskCanvas = p.createGraphics(320, 240)
  previewCanvas = p.createGraphics(640, 480)
}

p.draw = async () => {
  // p.rect(0, 0, p.width, p.height)
  previewCanvas.background('black')
  previewCanvas.imageMode(p.CENTER)

  let estimationConfig = {
    flipHorizontal: true,
    enableSmoothing: true,
  }

  if (!detector) return
  const poses = await detector.estimatePoses(webcam.elt, estimationConfig)
   
  p.fill(0, 0.05)
  p.noStroke()
  p.rect(0, 0, 640, 640)

  p.fill('blue')
  p.circle(x1, y1, 100)
  p.circle(x2, y2, 100)
  // p.push()
  // p.translate(p.width / 2, p.height / 2)
  // p.rotate(angle)
  // p.fill('white')
  // p.stroke('black')
  // p.ellipse(0, 0, circleSizeA, circleSizeB)
  // p.pop()

  p.image(previewCanvas, 0, 0, 200, 200 * 0.75)
}

function onWebcamLoaded() {
  poseDetection.createDetector(model, detectorConfig).then((d) => {
    detector = d
  })
}

function drawBodyLines(keypoints) {
  x1 = keypoints[17].score > 0.6 ? keypoints[17].x : null
  y1 = keypoints[17].score > 0.6 ? keypoints[17].y : null
  x2 = keypoints[18].score > 0.6 ? keypoints[18].x : null
  y2 = keypoints[18].score > 0.6 ? keypoints[18].y : null

  p.fill('blue') 
  if (x1 && y1) previewCanvas.circle(x1, y1, 80)
  if (x2 && y2) previewCanvas.circle(x2, y2, 80)

  // circleSizeA = p.dist(x1, y1, x2, y2)
  // circleSizeB = 640 - (y1 + y2) / 2
  // angle = p.atan2(y2 - y1, x2 - x1)

  // previewCanvas.strokeWeight(8)
  // previewCanvas.stroke('crimson')
  // previewCanvas.line(x1, y1, x2, y2)

  previewCanvas.stroke('white')
  previewCanvas.strokeWeight(4)
  // 11 - 12
  previewCanvas.line(keypoints[11].x, keypoints[11].y, keypoints[12].x, keypoints[12].y)
  // 12 - 14
  previewCanvas.line(keypoints[12].x, keypoints[12].y, keypoints[14].x, keypoints[14].y)
  // 14 - 16
  previewCanvas.line(keypoints[14].x, keypoints[14].y, keypoints[16].x, keypoints[16].y)
  // 16 - 18
  previewCanvas.line(keypoints[16].x, keypoints[16].y, keypoints[18].x, keypoints[18].y)
  // 11 - 13
  previewCanvas.line(keypoints[11].x, keypoints[11].y, keypoints[13].x, keypoints[13].y)
  // 13 - 15
  previewCanvas.line(keypoints[13].x, keypoints[13].y, keypoints[15].x, keypoints[15].y)
  // 15 - 17
  previewCanvas.line(keypoints[15].x, keypoints[15].y, keypoints[17].x, keypoints[17].y)
  // 12 - 24
  previewCanvas.line(keypoints[12].x, keypoints[12].y, keypoints[24].x, keypoints[24].y)
  // 11 - 23
  previewCanvas.line(keypoints[11].x, keypoints[11].y, keypoints[23].x, keypoints[23].y)
  // 24 - 23
  previewCanvas.line(keypoints[24].x, keypoints[24].y, keypoints[23].x, keypoints[23].y)
  // 23 - 25
  previewCanvas.line(keypoints[23].x, keypoints[23].y, keypoints[25].x, keypoints[25].y)
  // 25 - 27
  previewCanvas.line(keypoints[25].x, keypoints[25].y, keypoints[27].x, keypoints[27].y)
  // 27 - 29
  previewCanvas.line(keypoints[27].x, keypoints[27].y, keypoints[29].x, keypoints[29].y)
  // 24 - 26
  previewCanvas.line(keypoints[24].x, keypoints[24].y, keypoints[26].x, keypoints[26].y)
  // 26 - 28
  previewCanvas.line(keypoints[26].x, keypoints[26].y, keypoints[28].x, keypoints[28].y)
  // 28 - 30
  previewCanvas.line(keypoints[28].x, keypoints[28].y, keypoints[30].x, keypoints[30].y)

  // neck
  let middleShoulderX = (keypoints[11].x + keypoints[12].x) / 2
  let middleShoulderY = (keypoints[11].y + keypoints[12].y) / 2
  previewCanvas.line(middleShoulderX, middleShoulderY, keypoints[0].x, keypoints[0].y)

  previewCanvas.noStroke()
  previewCanvas.fill('crimson')
  previewCanvas.circle(keypoints[0].x, keypoints[0].y, 10)
  previewCanvas.circle(keypoints[11].x, keypoints[11].y, 10)
  previewCanvas.circle(keypoints[12].x, keypoints[12].y, 10)
  previewCanvas.circle(keypoints[23].x, keypoints[23].y, 10)
  previewCanvas.circle(keypoints[24].x, keypoints[24].y, 10)
  previewCanvas.circle(keypoints[25].x, keypoints[25].y, 10)
  previewCanvas.circle(keypoints[26].x, keypoints[26].y, 10)
  previewCanvas.circle(keypoints[27].x, keypoints[27].y, 10)
  previewCanvas.circle(keypoints[28].x, keypoints[28].y, 10)
  previewCanvas.circle(keypoints[13].x, keypoints[13].y, 10)
  previewCanvas.circle(keypoints[14].x, keypoints[14].y, 10)
  previewCanvas.circle(keypoints[15].x, keypoints[15].y, 10)
  previewCanvas.circle(keypoints[16].x, keypoints[16].y, 10)
}