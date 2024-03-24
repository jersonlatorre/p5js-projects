import PoseAnalyzer from './pose-analyzer'
import p from 'p5-easy'

// const colors = ['#000000', '#FF004D', '#FFA300', '#FFEC27', '#29ADFF', ' #F5EFE7 ']

let p1 = p.createVector(0, 0)
let p2 = p.createVector(0, 0)

let webcam
let previewCanvas
let poseAnalyzer

p.setup = async () => {
  p.createCanvas(640, 480)
  p.background('black')
  p.colorMode(p.HSB)

  webcam = p.createCapture(p.VIDEO, onWebcamLoaded)
  webcam.size(640, 480)
  webcam.hide()

  previewCanvas = p.createGraphics(640, 480)
}

p.draw = async () => {
  p.background('black')
  p.circle(p1.x, p1.y, 100)
  p.circle(p2.x, p2.y, 100)

  let response = await poseAnalyzer?.getPose(webcam)
  if (!response) return

  let { mask, keypoints } = response
  if (!mask || !keypoints) return

  previewCanvas.background('black')
  previewCanvas.imageMode(p.CENTER)
  previewCanvas.image(mask, 320, 240, 640, 480)
  drawBodyLines(keypoints)

  let w = 150
  p.imageMode(p.CENTER)
  p.image(previewCanvas, p.width / 2, p.height - w * 0.75 * 0.5, w, w * 0.75)
}

function onWebcamLoaded() {
  poseAnalyzer = new PoseAnalyzer()
}

function drawBodyLines(keypoints) {
  p1.x = keypoints[17].score > 0.6 ? keypoints[17].x : null
  p1.y = keypoints[17].score > 0.6 ? keypoints[17].y : null
  p2.x = keypoints[18].score > 0.6 ? keypoints[18].x : null
  p2.y = keypoints[18].score > 0.6 ? keypoints[18].y : null

  p.fill('white')
  if (p1.x && p1.y) previewCanvas.circle(p1.x, p1.y, 100)
  if (p2.x && p2.y) previewCanvas.circle(p2.x, p2.y, 100)
}
