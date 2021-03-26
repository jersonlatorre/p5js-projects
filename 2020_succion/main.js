let speed = 0
let delayFactor = 0
let size = 100
let numLines = 3

let time = 0
let simplex = new SimplexNoise()
let mousePosition

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB)
  mousePosition = createVector()
}

function draw() {
  blendMode(BLEND)
  background('rgba(255, 255, 255, 0.2)')
  background('rgba(0, 0, 0, 1)')

  time += speed

  let rx = width / 2 + 100 * simplex.noise2D(millis() / 3000, 100)
  let ry = height / 2 + 100 * simplex.noise2D(millis() / 3000, 200)

  mousePosition = createVector(rx, ry)

  for (let i = 0; i < numLines; i++) {
    let points = []
    let N = 50

    for (let j = 0; j <= N; j += 1) {
      let t = j / N
      let angle = 2 * PI * simplex.noise2D(time - delayFactor * t, i)
      let r = size + size * 2 * simplex.noise2D(time - delayFactor * t, i + 1)
      let x1 = width / 2 + r * cos(angle)
      let y1 = height / 2 + r * sin(angle)
      let x = lerp(x1, mousePosition.x, t)
      let y = lerp(y1, mousePosition.y, t)

      points.push({ x: x, y: y })
    }

    for (let i = 0; i < N; i++) {
      let p1 = points[i]
      let p2 = points[i + 1]

      noFill()
      strokeWeight(map(i, 0, N - 1, 1, 0))
      stroke(map(i, 0, N - 1, 360, 0), 0, 255)

      // line(p1.x, p1.y, p2.x, p2.y)
      circle(p1.x, p1.y, map(i, 0, N - 1, 0, min(width, height) * 0.8))
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}