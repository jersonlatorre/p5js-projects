let easycam
let pixelDensity = 2
let shaderEffect, shaderCanvas, sketchBuffer
let sketch
let colors = ['#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#89ED8D']

function preload() {
  vertSource = loadStrings('../shaders/effect.vert')
  fragSource = loadStrings('../shaders/effect.frag')
}

function setup() {
  createCanvas(600, 600)
  sketch = new Sketch()
  shaderCanvas = createGraphics(600, 600, WEBGL).pixelDensity(pixelDensity)

  sketchBuffer = createGraphics(600, 600, WEBGL)
  easycam = new Dw.EasyCam(sketchBuffer._renderer, { distance: 600 })
  easycam.attachMouseListeners(_renderer)

  shaderEffect = shaderCanvas.createShader(resolveLygia(vertSource), resolveLygia(fragSource))
}

function draw() {
  sketch.draw(sketchBuffer)

  shaderCanvas.rect(0, 0, 1, 1)
  shaderCanvas.shader(shaderEffect)

  shaderEffect.setUniform('uTexture', sketchBuffer)
  shaderEffect.setUniform('uResolution', [width, height])
  shaderEffect.setUniform('uPixelDensity', pixelDensity)

  image(shaderCanvas, 0, 0)
}
