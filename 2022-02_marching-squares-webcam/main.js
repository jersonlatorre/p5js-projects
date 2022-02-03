let resolution
let simplex
let fullscreenWebcam
let tileSize = 30

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB)

  resolution = { width: (width / tileSize) | 0, height: (height / tileSize) | 0 }
  simplex = new SimplexNoise(0, 2, 0.5)
  fullScreenWebcam = new FullscreenWebcam()

  dots = []
  for (let i = 0; i <= resolution.width; i++) {
    dots[i] = new Array(resolution.height).fill(0)
  }
}

function draw() {
  background('black')
  fullScreenWebcam.update()
  // image(fullScreenWebcam.graphics, 0, 0)
  calculateValues()
  drawCircles(0.5)

  let minUmbral = 0.1
  let maxUmbral = 0.8
  let numLayers = 5
  let minColor = color(0, 100, 100)
  let maxColor = color(359, 100, 100)

  for (let i = 0; i < numLayers; i++) {
    let umbral = map(i, 0, numLayers, minUmbral, maxUmbral)
    let c = lerpColor(minColor, maxColor, i / numLayers)
    drawMarchingSquares(umbral, c)
  }
}

function calculateValues() {
  fullScreenWebcam.graphics.loadPixels()
  const d = pixelDensity()

  for (let i = 0; i <= resolution.width; i++) {
    for (let j = 0; j <= resolution.height; j++) {
      let x = i * tileSize
      let y = j * tileSize
      let n = 4 * d * (y * d * width + x)
      let [ r, g, b ] = [
        fullScreenWebcam.graphics.pixels[n],
        fullScreenWebcam.graphics.pixels[n + 1],
        fullScreenWebcam.graphics.pixels[n + 2]
      ]
      dots[i][j] = (r + g + b) * 0.333 / 255
    }
  }

  fullScreenWebcam.graphics.updatePixels()
}

function drawMarchingSquares(umbral, color) {
  lines = []
  for (let i = 0; i < resolution.width; i++) {
    for (let j = 0; j < resolution.height; j++) {
      let a = dots[i][j]
      let b = dots[i + 1][j]
      let c = dots[i + 1][j + 1]
      let d = dots[i][j + 1]

      let ax = map(i, 0, resolution.width, 0, width)
      let ay = map(j, 0, resolution.height, 0, height)
      let bx = map(i + 1, 0, resolution.width, 0, width)
      let by = map(j, 0, resolution.height, 0, height)
      let cx = map(i + 1, 0, resolution.width, 0, width)
      let cy = map(j + 1, 0, resolution.height, 0, height)
      let dx = map(i, 0, resolution.width, 0, width)
      let dy = map(j + 1, 0, resolution.height, 0, height)

      let pa = createVector(ax, ay)
      let pb = createVector(bx, by)
      let pc = createVector(cx, cy)
      let pd = createVector(dx, dy)

      /**
       *   a   m   b
       * 
       *   q       n
       * 
       *   d   p   c
       * 
       *   a b c d
       *   0 0 0 0 = 0
       *   0 0 0 1 = 1
       *   0 0 1 0 = 2
       *   0 0 1 1 = 3
       *   0 1 0 0 = 4
       *   0 1 0 1 = 5
       *   0 1 1 0 = 6
       *   0 1 1 1 = 7
       *   1 0 0 0 = 8
       *   1 0 0 1 = 9
       *   1 0 1 0 = 10
       *   1 0 1 1 = 11
       *   1 1 0 0 = 12
       *   1 1 0 1 = 13
       *   1 1 1 0 = 14
       *   1 1 1 1 = 15
       */

      let an = a >= umbral ? 1 : 0
      let bn = b >= umbral ? 1 : 0
      let cn = c >= umbral ? 1 : 0
      let dn = d >= umbral ? 1 : 0
      let num = an * 8 + bn * 4 + cn * 2 + dn

      let mt = (umbral - a) / (b - a)
      let m = p5.Vector.lerp(pa, pb, mt)
      let nt = (umbral - b) / (c - b)
      let n = p5.Vector.lerp(pb, pc, nt)
      let pt = (umbral - c) / (d - c)
      let p = p5.Vector.lerp(pc, pd, pt)
      let qt = (umbral - d) / (a - d)
      let q = p5.Vector.lerp(pd, pa, qt)

      stroke('white')

      switch (num) {
        case 0:
          break
        case 1: // ad, dc
          drawLine(p, q, color)
          break
        case 2: // bc, cd
          drawLine(p, n, color)
          break
        case 3:
          drawLine(q, n, color)
          break
        case 4:
          drawLine(m, n, color)
          break
        case 5:
          drawLine(m, q, color)
          drawLine(p, n, color)
          break
        case 6:
          drawLine(m, p, color)
          break
        case 7:
          drawLine(m, q, color)
          break
        case 8:
          drawLine(m, q, color)
          break
        case 9:
          drawLine(m, p, color)
          break
        case 10:
          drawLine(m, n, color)
          drawLine(p, q, color)
          break
        case 11:
          drawLine(m, n, color)
          break
        case 12:
          drawLine(q, n, color)
          break
        case 13:
          drawLine(p, n, color)
          break
        case 14:
          drawLine(p, q, color)
          break
        case 15:
          break
      }
    }
  }
}

function drawLine(p1, p2, color) {
  strokeWeight(3)
  stroke(color)
  line(p1.x, p1.y, p2.x, p2.y)
}

function drawCircles(umbral) {
  noStroke()
  for (let i = 0; i <= resolution.width; i++) {
    for (let j = 0; j <= resolution.height; j++) {
      let x = map(i, 0, resolution.width, 0, width)
      let y = map(j, 0, resolution.height, 0, height)
      let value = dots[i][j]

      push()
      if (value >= umbral) {
        stroke('white')
        rectMode(CENTER)
        strokeWeight(1)
        let size = map(value, umbral, 1, 0, 8)
        line(x - size, y, x + size, y)
        line(x, y - size, x, y + size)
      }
      pop()
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  resolution = { width: (width / tileSize) | 0, height: (height / tileSize) | 0 }
  dots = []
  for (let i = 0; i <= resolution.width; i++) {
    dots[i] = []
    for (let j = 0; j <= resolution.height; j++) {
      dots[i][j] = 0
    }
  }
}
