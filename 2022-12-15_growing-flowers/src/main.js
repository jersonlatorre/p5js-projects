let easycam

let vertSource, fragSource
let buffer
let sketch
let time = 0
let shaderEffect, shaderCanvas
let colors = ['#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#89ED8D']
let pixelDensity = 2

function preload() {
  vertSource = loadStrings('../shaders/effect.vert')
  fragSource = loadStrings('../shaders/effect.frag')
}

function setup() {
  createCanvas(600, 600, WEBGL)
  frameRate(10)
  buffer = createGraphics(600, 600, WEBGL)
  shaderCanvas = createGraphics(600, 600, WEBGL)

  easycam = new Dw.EasyCam(buffer._renderer, { distance: 600 })
  easycam.rotateX(radians(-80))
  easycam.panY(-120)
  sketch = new Sketch()

  vertSource = resolveLygia(vertSource)
  fragSource = resolveLygia(fragSource)

  shaderEffect = shaderCanvas.createShader(vertSource, fragSource)
  shaderCanvas.pixelDensity(pixelDensity)
}

function draw() {
  translate(-width / 2, -height / 2)
  time += deltaTime / 1000
  easycam.rotateY((0.4 * deltaTime) / 1000)
  
  sketch.draw(buffer)
  
  shaderCanvas.translate(-shaderCanvas.width / 2, -shaderCanvas.height / 2)
  shaderCanvas.fill(0)
  shaderCanvas.rect(0, 0, 1, 1)
  shaderCanvas.shader(shaderEffect)
  
  shaderEffect.setUniform('iTexture', buffer)
  shaderEffect.setUniform('iResolution', [width, height])
  shaderEffect.setUniform('iPixelDensity', pixelDensity)
  
  image(shaderCanvas, 0, 0)
}
