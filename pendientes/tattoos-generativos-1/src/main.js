let content
let vertSource, fragSource
let shaderEffect
let container
let slider 
let label

function preload() {
  vertSource = loadStrings('shaders/effect.vert')
  fragSource = loadStrings('shaders/effect.frag')
}

function setup() {
  let canvas = createCanvas(1080, 1080, WEBGL)
  content = new Content()
  vertSource = resolveLygia(vertSource)
  fragSource = resolveLygia(fragSource)
  shaderEffect = createShader(vertSource, fragSource)
  container = createGraphics(width, height, WEBGL)

  let cx = canvas.canvas.getBoundingClientRect().x
  let cy = canvas.canvas.getBoundingClientRect().y
  slider = createSlider(0, 100, 0)
  slider.position(cx + width / 2, cy + height * 0.9)
  slider.style('width', '400px')
  slider.style('transform', 'translate(-50%, 0)')
  slider.input(() => {
    label.html(slider.value())
  })

  label = createP('0')
  label.position(cx + width / 2, cy + height * 0.85)
}

function draw() {
  content.draw()
  container.image(content.graphics, -width / 2, -height / 2)
  shaderEffect.setUniform('iTexture', container)
  shaderEffect.setUniform('iResolution', [width, height])
  shaderEffect.setUniform('iTime', map(slider.value(), 0, 100, 18 , 30))
  shader(shaderEffect)
  rect(0, 0, 1, 1)
}
