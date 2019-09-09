let W = 35

coloredPositions = [
  [W, 0],
  [3 * W, 0],

  [0, W],
  [2 * W, W],
  [4 * W, W],

  [W, 2 * W],
  [3 * W, 2 * W],

  [0, 3 * W],
  [2 * W, 3 * W],
  [4 * W, 3 * W],

  [W, 4 * W],
  [3 * W, 4 * W]
]

colors = [
  [255, 255, 255], // blanco
  [255, 255, 255], // blanco
  [183, 66, 72], // rojo
  [222, 192, 70], // amarillo
  [50, 78, 174], // azul
  [63, 117, 68] // verde
]

function setup() {
  let canvas = createCanvas(W * 9, W * 9)
  canvas.parent('content')
  frameRate(2)
}

function draw() {
  drawBlackRects()
  drawColoredRects()
}

function drawBlackRects() {
  noStroke()
  fill(0)

  push()
  translate(W * 2, W * 2)

  rect(0, 0, W, W)
  rect(W * 2, 0, W, W)
  rect(W * 4, 0, W, W)

  rect(0, W * 2, W, W)
  rect(W * 2, W * 2, W, W)
  rect(W * 4, W * 2, W, W)

  rect(0, W * 4, W, W)
  rect(W * 2, W * 4, W, W)
  rect(W * 4, W * 4, W, W)

  pop()
}

function drawColoredRects() {
  translate(W * 2, W * 2)
  push()
  coloredPositions.forEach(p => {
    let r = floor(random(6))
    fill(colors[r][0], colors[r][1], colors[r][2])
    rect(p[0], p[1], W, W)
  })
}
