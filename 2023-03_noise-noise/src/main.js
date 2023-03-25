let content
let vertSource, fragSource
let shaderEffect
let container

function preload() {
  vertSource = loadStrings('shaders/effect.vert')
  fragSource = loadStrings('shaders/effect.frag')
}

function setup() {
  createCanvas(1080, 1080, WEBGL)
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
  shaderEffect.setUniform('iTime', millis() / 1500)
  shader(shaderEffect)
  rect(0, 0, 1, 1)
}
