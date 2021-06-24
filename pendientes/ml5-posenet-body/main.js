let poseNet
let pose
let smoother = new PoseSmoother(0.8)

let video
let bodyGraphics
let frame
let isVideoLoaded = false
let isModelLoaded = false

function setup() {
  createCanvas(500, 500)
  frameRate(60)

  video = createCapture(VIDEO, onVideoLoaded)

  video.hide()
  bodyGraphics = createGraphics(width, height)
  spring = new Spring2D(width / 2, height / 2, 3, 15)
}

function onVideoLoaded() {
  video.play()
  video.loop()
  isVideoLoaded = true

  console.log('video loaded')
  poseNet = ml5.poseNet(video, 'single', onModelLoaded)

  poseNet.on('pose', function(result) {
    if (result[0] != null) {
      pose = smoother.smoothPose(result[0].pose)
    }
  })
}

function draw() {
  background('black')
  frame = frameCount

  if (isVideoLoaded) {
    push()
    translate(25, 25)
    scale(0.5)
    // image(video, 0, 0)
    pop()
  }

  if (isModelLoaded) {
    drawBody()
  }
}

function drawBody() {
  if (pose) {
    with (bodyGraphics) {
      clear()
      colorMode(HSB)
      stroke('white')
      strokeWeight(7)
      strokeJoin(ROUND)

      // tronco
      fill('rgba(0, 0, 0, 0.4)')
      beginShape()
      vertex(pose.leftHip.x, pose.leftHip.y)
      vertex(pose.rightHip.x, pose.rightHip.y)
      vertex(pose.rightShoulder.x, pose.rightShoulder.y)
      vertex(pose.leftShoulder.x, pose.leftShoulder.y)
      endShape(CLOSE)

      // // pierna izquierda
      // line(pose.leftHip.x, pose.leftHip.y, width, height)

      // // pierna derecha
      // line(pose.rightHip.x, pose.rightHip.y, 0, height)

      // brazo izquierdo
      line(pose.leftShoulder.x, pose.leftShoulder.y, pose.leftElbow.x, pose.leftElbow.y)
      line(pose.leftElbow.x, pose.leftElbow.y, pose.leftWrist.x, pose.leftWrist.y)

      // brazo derecho
      line(pose.rightShoulder.x, pose.rightShoulder.y, pose.rightElbow.x, pose.rightElbow.y)
      line(pose.rightElbow.x, pose.rightElbow.y, pose.rightWrist.x, pose.rightWrist.y)

      // cabeza
      noStroke()
      fill('white')
      circle(pose.nose.x, pose.nose.y, 100)

      // texto
      let nx = (pose.leftShoulder.x + pose.rightShoulder.x + pose.leftHip.x + pose.rightHip.x) / 4
      let ny = (pose.leftShoulder.y + pose.rightShoulder.y + pose.leftHip.y + pose.rightHip.y) / 4

      // objeto
      spring.update((pose.leftHip.x + pose.rightHip.x) / 2, (pose.leftHip.y + pose.rightHip.y) / 2)
      stroke('white')
      line((pose.leftHip.x + pose.rightHip.x) / 2, (pose.leftHip.y + pose.rightHip.y) / 2, spring.x, spring.y)

      // manos
      fill('white')
      noStroke()
      circle(pose.leftWrist.x, pose.leftWrist.y, 28)
      circle(pose.rightWrist.x, pose.rightWrist.y, 28)
    }

    image(bodyGraphics, 0, 0)
  }
}

function onModelLoaded() {
  isModelLoaded = true
}
