const N = 20
const NUM_ATTEMPTS = 2000

let UNIT
let rectangles = []

function setup() {
  createCanvas(600, 600, WEBGL)
  UNIT = width / N
  generateRectangles()
  console.log('hola')
}

function draw() {
  translate(-width / 2, -height / 2)
  background('white')
  drawRectangles()
  // noLoop()
}

function drawRectangles() {
  for (let r of rectangles) {
    let gap = 3
    rect(r.x * UNIT + gap, r.y * UNIT + gap, r.width * UNIT - 2 * gap, r.height * UNIT - 2 * gap)
  }
}

function generateRectangles() {
  for (let i = 0; i < NUM_ATTEMPTS; i++) {
    addRectangleIfNotOverlapping(createRandomRectangle())
  }
  fillGapsWithSmallRectangles()
  rectangles = shuffle(rectangles)
}

function createRandomRectangle() {
  // let [width, height] = [random([2]), random([1, 2, 3])]
  let size = random([2, 3, 4, 5])
  let [width, height] = [size, size]
  if (random() > 0.5) [width, height] = [height, width]
  let x = floor(random(0, N - width + 1))
  let y = floor(random(0, N - height + 1))
  return { x, y, width, height }
}

function fillGapsWithSmallRectangles() {
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      addRectangleIfNotOverlapping({ x, y, width: 1, height: 1 })
    }
  }
}

function addRectangleIfNotOverlapping(newRect) {
  for (let rect of rectangles) {
    if (rectanglesIntersect(newRect, rect)) return
  }
  rectangles.push(newRect)
}

function rectanglesIntersect(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  )
}
