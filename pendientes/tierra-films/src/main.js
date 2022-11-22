let testVertSource
let testFragSource
let test
let buffer
let time = 0
let img
let mx, my

let pane
let params = {
  radius: 0.24,
  smooth: 0.35,
  noise: 0.35,
  speed: 1.3,
  amount: 0.5,
  detail: 15.0,
}

function preload() {
  testVertSource = loadStrings('shaders/test.vert')
  testFragSource = loadStrings('shaders/test.frag')
  img = loadImage('assets/texto.png')
}

function setup() {
  createCanvas(600, 600, WEBGL)

  mx = width / 2
  my = height / 2

  pane = new Tweakpane.Pane()
  pane.addInput(params, 'radius', { min: 0.1, max: 0.5, step: 0.01 })
  pane.addInput(params, 'smooth', { min: 0.05, max: 1.0, step: 0.01 })
  pane.addInput(params, 'noise', { min: 0.01, max: 0.5, step: 0.01 })
  pane.addInput(params, 'speed', { min: 0.0, max: 3.0, step: 0.1 })
  pane.addInput(params, 'amount', { min: 0.0, max: 1.0, step: 0.1 })
  pane.addInput(params, 'detail', { min: 0.0, max: 30.0, step: 0.1 })
  pane.addButton({ title: 'reset to default' }).on('click', () => {
    params.radius = 0.3
    params.noise = 0.2
    params.smooth = 0.6
    params.speed = 1.0
    params.amount = 0.5
    params.detail = 15.0
    pane.refresh()
  })
  pane.addButton({ title: 'randomize' }).on('click', () => {
    params.radius = random(0.1, 0.5)
    params.noise = random(0.01, 0.5)
    params.smooth = random(0.05, 1.0)
    params.speed = random(0.0, 3.0)
    params.amount = random(0.0, 1.0)
    params.detail = random(0.0, 30.0)
    pane.refresh()
  })

  testVertSource = resolveLygia(testVertSource)
  testFragSource = resolveLygia(testFragSource)
  test = createShader(testVertSource, testFragSource)
  buffer = createGraphics(600, 600)
  buffer.image(img, 0, 0, 600, 600)
}

function draw() {
  background('blue')
  rect(0, 0, width, height)

  mx += (mouseX - mx) * 0.08
  my += (mouseY - my) * 0.08

  time += deltaTime * 0.001

  shader(test)
  // shader params
  test.setUniform('iTexture', buffer)
  test.setUniform('iTime', time)
  test.setUniform('iResolution', [width, height])
  test.setUniform('iMouse', [mx, my])

  // pane params
  test.setUniform('radius', params.radius)
  test.setUniform('smooth', params.smooth)
  test.setUniform('noise', params.noise)
  test.setUniform('speed', params.speed)
  test.setUniform('amount', params.amount)
  test.setUniform('detail', params.detail)
}
