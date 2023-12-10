let N = 10
let t = 0
let dt = 0.006

function setup() {
  createCanvas(700, 700)
}

function draw() {
  background('white')
  fill('black')
  noStroke()

  let mx = width * noise(t + 5)
  let my = height * noise(t + 10)
  let closestPoints = Array(4)
    .fill()
    .map(() => ({ minDistance: Infinity, minI: null, minJ: null }))

  for (let i = 1; i < N; i++) {
    for (let j = 1; j < N; j++) {
      let x = (i * width) / N
      let y = (j * height) / N
      let distance = dist(x, y, mx, my)
      updateClosestPoints(closestPoints, distance, i, j)
      circle(x, y, 6)
    }
  }

  t += dt
  drawClosestPoints(closestPoints, mx, my)
}

const updateClosestPoints = (points, distance, i, j) =>
  points.some((point) => {
    if (distance < point.minDistance) {
      point.minDistance = distance
      ;[point.minI, point.minJ] = [i, j]
      return true
    } else {
      return false
    }
  })

const drawClosestPoints = (points, mx, my) => {
  points.forEach(({ minI, minJ }) => {
    fill('red')
    noStroke()
    circle((minI * width) / N, (minJ * height) / N, 13)
    strokeWeight(5)
    stroke('red')
    line((minI * width) / N, (minJ * height) / N, mx, my)
  })
  noStroke()
  fill('red')
  circle(mx, my, 28)
}
