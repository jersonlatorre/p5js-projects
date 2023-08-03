let polylines = []
let simplex = new SimplexNoise()

const COLORS = [
  '#323232', // negro
  '#323232', // negro
  '#FF5B65', // rojo
  '#FFA24B', // naranja
  '#FCDF5F', // amarillo
  '#49D8EE', // celeste
  '#F5EFE7', // blanco
]

const NUM_DIVISIONS = 8
const NUM_POLYLINES = 50
const NOISE_FACTOR = 0.002

function setup() {
  createCanvas(800, 800)
  // colorMode(HSL)
  // frameRate(5)
}

function addPolyline() {
  let polyline = []
  polyline.push({ x: random(width), y: random(width) })
  polyline.push({ x: random(width), y: random(width) })

  for (let i = 1; i <= NUM_DIVISIONS; i++) {
    polyline = divide(polyline, i)
  }

  polylines.push({ data: polyline, color: random(COLORS) })
}

function divide(polyline, n) {
  let newPolyline = [polyline[0]]
  for (let i = 0; i < polyline.length - 1; i++) {
    let midX = (polyline[i].x + polyline[i + 1].x) / 2
    let midY = (polyline[i].y + polyline[i + 1].y) / 2

    let segmentVector = createVector(
      polyline[i + 1].x - polyline[i].x,
      polyline[i + 1].y - polyline[i].y
    )

    let normalVector = createVector(-segmentVector.y, segmentVector.x)
    normalVector.normalize()

    let o = map(n, 0, NUM_DIVISIONS, 0, 80)
    let h = map(
      simplex.noise(midX * NOISE_FACTOR, midY * NOISE_FACTOR, millis() / 1500),
      0,
      1,
      -o,
      o
    )
    midX += h * normalVector.x
    midY += h * normalVector.y

    newPolyline.push({ x: midX, y: midY })
    newPolyline.push({ x: polyline[i + 1].x, y: polyline[i + 1].y })
  }

  return newPolyline
}

function draw() {
  blendMode(BLEND)
  background('#101010')
  // background('#F5EFE7')


  polylines = []
  for (let i = 0; i < NUM_POLYLINES; i++) {
    addPolyline()
  }

  // blendMode(SCREEN)
  for (let polyline of polylines) {
    beginShape()
    stroke(polyline.color)
    strokeWeight(1)
    noFill()
    for (let point of polyline.data) {
      curveVertex(point.x, point.y)
    }
    endShape()
  }

  // noLoop()
}
