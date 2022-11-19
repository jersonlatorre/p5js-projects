let testVertSource
let testFragSource
let test
let buffer
let time = 0
let img

function preload() {
  testVertSource = loadStrings('shaders/test.vert')
  testFragSource = loadStrings('shaders/test.frag')
  img = loadImage('assets/untitled.jpg')
}

function setup() {
  createCanvas(600, 600, WEBGL)

  testVertSource = resolveLygia(testVertSource)
  testFragSource = resolveLygia(testFragSource)
  test = createShader(testVertSource, testFragSource)
  buffer = createGraphics(600, 600)
  buffer.background(0)
  // buffer.stroke(255, 100)
  // for (let i = 0; i < 500; i++) {
  //   let x1 = random(0, 600)
  //   let y1 = random(0, 600)
  //   let x2 = random(0, 600)
  //   let y2 = random(0, 600)
  //   // buffer.line(x1, y1, x2, y2)
  //   buffer.circle(x1, y1, 30)
  // }
  buffer.image(img, 0, 0, 600, 600)
}

function draw() {
  background('blue')
  rect(0, 0, width, height)

  time += deltaTime * 0.001

  shader(test)
  test.setUniform('iTexture', buffer)
  test.setUniform('iTime', time)
  test.setUniform('iResolution', [width, height])
  test.setUniform('iMouse', [mouseX, mouseY])
}
