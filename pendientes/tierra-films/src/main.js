let vertSource, fragSource
let shaderEffect
let container
let logo
let pointerPosition
let startPosition
let endPosition
let t = 0
let dt = 0.002

const SIZE = 700

function preload() {
  vertSource = loadStrings('shaders/effect.vert')
  fragSource = loadStrings('shaders/effect.frag')
  logo = loadImage('assets/oscuro-h.png')
}

function setup() {
  createCanvas(SIZE, SIZE, WEBGL)
  vertSource = resolveLygia(vertSource)
  fragSource = resolveLygia(fragSource)
  shaderEffect = createShader(vertSource, fragSource)
  container = createGraphics(width, height)

  startPosition = createVector(width * 0.25, height * 0.44)
  endPosition = createVector(width * 0.75, height * 0.44)
  pointerPosition = startPosition.copy()
}

function draw() {
  pointerPosition = p5.Vector.lerp(startPosition, endPosition, easeInOut(t))
  t += dt
  if (t > 1) t = 0

  let radius = map(symSmoothstep(t), 0, 1, 0.0, 0.1)
  let force = map(symSmoothstep(t), 0, 1, 0, 1)

  container.background('white')
  container.fill('black')
  container.image(logo, 0, 0, width, height)

  shaderEffect.setUniform('iTexture', container)
  shaderEffect.setUniform('iResolution', [width, height])
  shaderEffect.setUniform('iRadius', radius)
  shaderEffect.setUniform('iForce', force)
  shaderEffect.setUniform('iMouse', [pointerPosition.x, pointerPosition.y])

  shaderEffect.setUniform('iTime', millis() / 1500)
  shader(shaderEffect)

  rect(0, 0, 1, 1)
}

function symSmoothstep(t) {
  if (t < 0.5) return smoothstep(t * 2)
  else return smoothstep((1 - t) * 2)
}

function smoothstep(t) {
  return t * t * (3 - 2 * t)
}
