let points = []
let letters = 'weird'
let N = letters.length + 1
let R1 = 9
let R2 = 15
let simplex
let font

function preload() {
  font = loadFont('Karla-Bold.ttf')
}

function setup() {
  createCanvas(1080, 1080)
  colorMode(HSB)
  simplex = new SimplexNoise()
  textFont(font)
}

function draw() {
  // background('rgba(255, 255, 255, 0.01)')
  fill('rgba(255, 255, 255, 0.02)')
  noStroke()
  rect(0, 0, width, height)

  let t = millis() / 120.0
  let x = 0.5 * width + 0.4 * width * simplex.noise2D(t, 0)
  let y = 0.5 * width + 0.4 * width * simplex.noise2D(0, t)
  points.push({ x: x, y: y })

  if (points.length >= N) {
    points.splice(0, 1)
  }

  points.forEach((p, i) => {
    stroke(0)
    strokeWeight(R2)
    if (i < points.length - 1) {
      line(p.x, p.y, points[i + 1].x, points[i + 1].y)
    }
  })

  points.forEach((p, i) => {
    // let c = map(i + 1, 0, N - 1, 255, 0)
    // stroke(c, 0, 255)
    strokeWeight(R1)
    if (i < points.length - 1) {
      line(p.x, p.y, points[i + 1].x, points[i + 1].y)
    }

    fill('black')
    noStroke()
    circle(p.x, p.y, 55)
    fill('white')
    textSize(30)
    textStyle(BOLD)
    textAlign(CENTER, CENTER)
    text(letters[(i + frameCount) % (N - 1)], p.x, p.y - 7)
  })
}
