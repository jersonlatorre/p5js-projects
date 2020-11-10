let CANVAS_SIZE = 1080
let LEVELS = 6
let MARGIN = 50
let index = 0
let timer = 0
let simplex = new SimplexNoise()

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE)
  rectMode(CENTER)
  smooth()
}

function draw() {
  background('black')

  timer += 1 * deltaTime / 3000
  index = 0

  divideRect(
    {
      x1: MARGIN,
      y1: MARGIN,
      x2: width - MARGIN,
      y2: MARGIN,
      x3: width - MARGIN,
      y3: height - MARGIN,
      x4: MARGIN,
      y4: height - MARGIN
    },
    LEVELS
  )
}

function divideRect(rect, level) {
  if (level < 0 || level > 13) return

  index++
  let area =
    0.5 *
    (rect.x1 * rect.y2 -
      rect.y1 * rect.x2 +
      rect.x2 * rect.y3 -
      rect.y2 * rect.x3 +
      rect.x3 * rect.y4 -
      rect.y3 * rect.x4 +
      rect.x4 * rect.y1 -
      rect.y4 * rect.x1)

  stroke('rgba(255, 255, 255,' + map(level, 0, LEVELS, 1, 0) + ')')
  fill('rgba(255, 255, 255,' + 0.05 + ')')
  strokeWeight(map(level, 0, LEVELS, 2, 1))

  beginShape()
  // vertex(rect.x1, rect.y1)
  // vertex(rect.x2, rect.y2)
  // vertex(rect.x3, rect.y3)
  // vertex(rect.x4, rect.y4)
  // vertex(rect.x1, rect.y1)
  endShape()

  let cx = (rect.x1 + rect.x2 + rect.x3 + rect.x4) >> 2
  let cy = (rect.y1 + rect.y2 + rect.y3 + rect.y4) >> 2
  if (level % 2 == 0) {
    square(cx, cy, area / 800)
  }

  let bias = 0.2 // map(mouseX, 0, width, 0, 1)
  let n1 = map(simplex.noise2D(timer, index), -1, 1, 0, 1)
  let n2 = map(simplex.noise2D(timer, index + 5), -1, 1, 0, 1)
  let r1 = bias + (1 - 2 * bias) * n1
  let r2 = bias + (1 - 2 * bias) * n2

  if (level % 2 == 0) {
    divideRect(
      {
        x1: rect.x1,
        y1: rect.y1,
        x2: r1 * rect.x1 + (1 - r1) * rect.x2,
        y2: r1 * rect.y1 + (1 - r1) * rect.y2,
        x3: r2 * rect.x3 + (1 - r2) * rect.x4,
        y3: r2 * rect.y3 + (1 - r2) * rect.y4,
        x4: rect.x4,
        y4: rect.y4
      },
      level - 1
    )
    divideRect(
      {
        x1: r1 * rect.x1 + (1 - r1) * rect.x2,
        y1: r1 * rect.y1 + (1 - r1) * rect.y2,
        x2: rect.x2,
        y2: rect.y2,
        x3: rect.x3,
        y3: rect.y3,
        x4: r2 * rect.x3 + (1 - r2) * rect.x4,
        y4: r2 * rect.y3 + (1 - r2) * rect.y4
      },
      level - 1
    )
  } else {
    divideRect(
      {
        x1: rect.x1,
        y1: rect.y1,
        x2: rect.x2,
        y2: rect.y2,
        x3: r1 * rect.x2 + (1 - r1) * rect.x3,
        y3: r1 * rect.y2 + (1 - r1) * rect.y3,
        x4: r2 * rect.x1 + (1 - r2) * rect.x4,
        y4: r2 * rect.y1 + (1 - r2) * rect.y4
      },
      level - 1
    )
    divideRect(
      {
        x1: r2 * rect.x1 + (1 - r2) * rect.x4,
        y1: r2 * rect.y1 + (1 - r2) * rect.y4,
        x2: r1 * rect.x2 + (1 - r1) * rect.x3,
        y2: r1 * rect.y2 + (1 - r1) * rect.y3,
        x3: rect.x3,
        y3: rect.y3,
        x4: rect.x4,
        y4: rect.y4
      },
      level - 1
    )
  }
}
