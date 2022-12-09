let vertSource, fragSource
let effectShader, buffer, img
let time = 0,
  mX = 0,
  mY = 0
let canvas,
  angle = Math.PI / 2,
  radius = 310,
  timer

const MIN_RADIUS = 0.1
const MAX_RADIUS = 0.5
const DEFAULT_RADIUS = 0.23

const MIN_SMOOTH = 0.1
const MAX_SMOOTH = 1.0
const DEFAULT_SMOOTH = 0.8

const MIN_GRAIN = 0.1
const MAX_GRAIN = 0.5
const DEFAULT_GRAIN = 0.4

const MIN_SPEED = 0.0
const MAX_SPEED = 2.0
const DEFAULT_SPEED = 0.0

const MIN_AMOUNT = 0.1
const MAX_AMOUNT = 1.0
const DEFAULT_AMOUNT = 0.4

const MIN_DETAIL = 2.0
const MAX_DETAIL = 8.0
const DEFAULT_DETAIL = 8.0

const cx1 = 190
const cy1 = 35

const cx2 = 610
const cy2 = 35

let pane
let params = {
  radius: DEFAULT_RADIUS,
  smooth: DEFAULT_SMOOTH,
  grain: DEFAULT_GRAIN,
  speed: DEFAULT_SPEED,
  amount: DEFAULT_AMOUNT,
  detail: DEFAULT_DETAIL,
}

function preload() {
  vertSource = loadStrings('shaders/effect.vert')
  fragSource = loadStrings('shaders/effect.frag')
  img = loadImage('assets/logo.png')
}

function setup() {
  createCanvas(800, 800)
  canvas = createGraphics(800, 800, WEBGL)

  pane = new Tweakpane.Pane({
    title: 'parámetros',
  })

  noCursor()

  pane.addInput(params, 'radius', { label: 'tamaño', min: MIN_RADIUS, max: MAX_RADIUS, step: 0.01 })
  pane.addInput(params, 'smooth', { label: 'difuminado', min: MIN_SMOOTH, max: MAX_SMOOTH, step: 0.1 })
  pane.addInput(params, 'grain', { label: 'grano', min: MIN_GRAIN, max: MAX_GRAIN, step: 0.01 })
  pane.addInput(params, 'speed', { label: 'velocidad', min: MIN_SPEED, max: MAX_SPEED, step: 0.1 })
  pane.addInput(params, 'amount', { label: 'potencia', min: MIN_AMOUNT, max: MAX_AMOUNT, step: 0.1 })
  pane.addInput(params, 'detail', { label: 'detalle', min: MIN_DETAIL, max: MAX_DETAIL, step: 1 })
  pane.addButton({ title: 'valores por defecto' }).on('click', () => {
    params.radius = DEFAULT_RADIUS
    params.smooth = DEFAULT_SMOOTH
    params.grain = DEFAULT_GRAIN
    params.speed = DEFAULT_SPEED
    params.amount = DEFAULT_AMOUNT
    params.detail = DEFAULT_DETAIL
    pane.refresh()
  })
  pane.addButton({ title: 'aleatorio' }).on('click', () => {
    params.radius = random(MIN_RADIUS, MAX_RADIUS)
    params.smooth = random(MIN_SMOOTH, MAX_SMOOTH)
    params.grain = random(MIN_GRAIN, MAX_GRAIN)
    params.speed = random(MIN_SPEED, MAX_SPEED)
    params.amount = random(MIN_AMOUNT, MAX_AMOUNT)
    params.detail = random(MIN_DETAIL, MAX_DETAIL)
    pane.refresh()
  })

  vertSource = resolveLygia(vertSource)
  fragSource = resolveLygia(fragSource)
  effectShader = canvas.createShader(vertSource, fragSource)
  buffer = createGraphics(800, 800)
  buffer.image(img, 0, 0, 800, 800)
}

function draw() {
  canvas.background('white')
  canvas.rect(-width / 2, -height / 2, width, height)

  // mX = radius * cos(angle) + cx2
  // mY = radius * sin(angle) + cy2
  // angle -= deltaTime * 0.0006
  // if (angle > PI) angle = 0.5

  mX += (mouseX - mX) * 0.2
  mY += (mouseY - mY) * 0.2

  canvas.shader(effectShader)

  // shader params
  effectShader.setUniform('iTexture', buffer)
  effectShader.setUniform('iTime', time)
  effectShader.setUniform('iResolution', [width, height])
  effectShader.setUniform('iMouse', [mX, mY])

  // pane params
  effectShader.setUniform('radius', params.radius)
  effectShader.setUniform('smooth', params.smooth)
  effectShader.setUniform('grain', params.grain)
  effectShader.setUniform('speed', params.speed)
  effectShader.setUniform('amount', params.amount)
  effectShader.setUniform('detail', params.detail)

  image(canvas, 0, 0)
  noStroke()
  fill(0)
  // circle(mX, mY, 10)
  // console.log(angle)
}
