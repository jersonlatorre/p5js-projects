let poseNet
let pose
let smoother = new PoseSmoother(0.9)
let video
let head
let boxes = []

function preload() {
  head = loadModel('assets/head.obj')
}

function setup() {
  navigator.mediaDevices.enumerateDevices()
  createCanvas(1440, 900, WEBGL)
  setAttributes('antialias', true)

  video = createCapture(VIDEO)
  video.size(width, height)
  video.hide()

  poseNet = ml5.poseNet(video, 'single', modelReady)
  poseNet.on('pose', function(result) {
    if (result[0] != null) {
      pose = smoother.smoothPose(result[0].pose)
    }
  })

  for (let i = 0; i < 300; i++) {
    boxes.push({ x: random(-width, width), y: random(-height, height), z: -random(-1000, 1000) })
  }
}

function draw() {
  translate(-width / 2, -height / 2)
  background('purple')

  if (pose) {
    let nose = createVector(width - pose.nose.x, pose.nose.y)
    let leftEye = createVector(width - pose.leftEye.x, pose.leftEye.y)
    let rightEye = createVector(width - pose.rightEye.x, pose.rightEye.y)
    let area = triangleArea(nose, leftEye, rightEye)
    area = area / 2

    let center = nose.copy().add(leftEye).add(rightEye).mult(0.333)

    push()
    translate(width / 2, height / 2)
    scale(pow(area / 1000, 1 / 3))
    scale(80)
    rotateY(map(center.x, 0, width, PI / 1.8, -PI / 1.8))
    rotateX(map(center.y, 0, height, -PI / 1.8, PI / 1.8))
    stroke('black')
    strokeWeight(0.3)
    fill('orange')
    model(head)
  }
}

function triangleArea(a, b, c) {
  return abs(a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y))
}

function modelReady() {
  video.play()
  video.loop()
}

function onVideoLoaded() {
  console.log('hola')
}
