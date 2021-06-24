let dots = []
let simplex
let c1
let c2
let t = 0
let dt = 0.01

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()
  
  simplex = new SimplexNoise()
  // c1 = color('#B3FFAB')
  // c2 = color('#12FFF7')
  c1 = color('#acb6e5')
  c2 = color('#86fde8')
  
  for (let i = 0; i < 0.4 * sqrt(width * height); i++) {
    dots.push(new Dot())
  }
}

function draw() {
  let c = lerpColor(c1, c2, t)
  background(c)
  
  t += dt
  if (t > 1 || t < 0) {
    dt *= -1
  }
  
  dots.forEach((dot) => {
    dot.draw()
  })
}

function windowResized() {
  window.location = '/'
}
