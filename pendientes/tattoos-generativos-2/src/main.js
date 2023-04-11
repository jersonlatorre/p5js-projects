let content
let vertSource, fragSource
let shaderEffect
let container

function preload() {
  vertSource = loadStrings('shaders/effect.vert')
  fragSource = loadStrings('shaders/effect.frag')
}

function setup() {
  createCanvas(800, 800, WEBGL)
  content = new Content()
  vertSource = resolveLygia(vertSource)
  fragSource = resolveLygia(fragSource)
  shaderEffect = createShader(vertSource, fragSource)
  container = createGraphics(width, height, WEBGL)
}

function draw() {
  content.draw()
  container.image(content.graphics, -width / 2, -height / 2)
  shaderEffect.setUniform('iTexture', container)
  shaderEffect.setUniform('iResolution', [width, height])
  shaderEffect.setUniform('iTime', map(mouseX, 0, width, 50, 100))
  shader(shaderEffect)
  rect(0, 0, 1, 1)
}
