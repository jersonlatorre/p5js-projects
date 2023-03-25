let colors = ['#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#89ED8D']
let content
let vertSource, fragSource
let shaderEffect
let container
let sound

function preload() {
  vertSource = loadStrings('shaders/effect.vert')
  fragSource = loadStrings('shaders/effect.frag')
  sound = loadSound('assets/kick.mp3')
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
  shaderEffect.setUniform('iTime', millis() / 1000)
  shaderEffect.setUniform('iPunch', map(content.bright, 180, 255, 0.5, 1))
  shader(shaderEffect)
  rect(0, 0, 1, 1)
}

function mousePressed() {
  userStartAudio()
}
