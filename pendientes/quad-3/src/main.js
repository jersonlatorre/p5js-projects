import p from 'p5-sketch'

let texture
let effect
let g

p.preload = () => {
  texture = p.loadImage('../assets/4.png')
  effect = p.loadShader('../shaders/shader.vert', '../shaders/shader.frag')
}

p.setup = () => {
  p.createCanvas(1080, 1080, p.WEBGL)
  g = p.createGraphics(p.width, p.height, p.WEBGL)
}

p.draw = () => {
  let angleX = p.noise(p.millis() / 5000 + 0)
  let angleY = p.noise(p.millis() / 5000 + 1)
  let angleZ = p.noise(p.millis() / 5000 + 2)

  angleX = p.map(angleX, 0, 1, 0, p.PI * 2)
  angleY = p.map(angleY, 0, 1, 0, p.PI * 2)
  angleZ = p.map(angleZ, 0, 1, 0, p.PI * 2)

  // dibuja el graphics
  g.background('white')
  g.push()
  g.rotateX(angleX)
  g.rotateY(angleY)
  g.rotateZ(angleZ)
  g.texture(texture)
  g.noStroke()
  // g.box(0.4 * p.width)
  g.sphere(0.3 * p.width)
  g.pop()

  // p.image(g, -p.width / 2, -p.height / 2)

  // dibuja el shader
  p.shader(effect)
  effect.setUniform('uTexture', g)
  effect.setUniform('uResolution', [p.width, p.height])
  effect.setUniform('uPixelDensity', p.pixelDensity())
  p.noStroke()
  p.rect(-p.width / 2, -p.height / 2, p.width, p.height)  
  
  p.noLoop()
}
