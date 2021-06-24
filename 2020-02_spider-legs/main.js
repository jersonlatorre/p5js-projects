let N = 9
let t = 0
let dt = 0.006

function setup() {
  createCanvas(700, 700)
  // noCursor()
}

function draw() {
  background('white')
  noStroke()
  fill('black')

  let mx = width * noise(t + 5)
  let my = height * noise(t + 10)
  let minDistance = 99999
  let minI
  let minJ

  for (let i = 1; i < N; i++) {
    for (let j = 1; j < N; j++) {
      let x = (i * 700) / N
      let y = (j * 700) / N
      let distance = dist(x, y, mx, my)
      
      if (distance < minDistance) {
        minDistance = distance
        minI = i
        minJ = j
      }

      circle(x, y, 6)
    }
  }

  t += dt

  fill('red')
  noStroke()
  circle((minI * 700) / N, (minJ * 700) / N, 13)
  strokeWeight(5)
  stroke('red')
  line((minI * 700) / N, (minJ * 700) / N, mx, my)

  minDistance = 9999999
  let minI2
  let minJ2
  
  for (let i = 1; i < N; i++) {
    for (let j = 1; j < N; j++) {
      let x = (i * 700) / N
      let y = (j * 700) / N
      let distance = dist(x, y, mx, my)
      
      if (i == minI && j == minJ) continue
      if (distance < minDistance) {
        minDistance = distance
        minI2 = i
        minJ2 = j
      }
    }
  }

  fill('red')
  noStroke()
  circle((minI2 * 700) / N, (minJ2 * 700) / N, 13)
  strokeWeight(5)
  stroke('red')
  line((minI2 * 700) / N, (minJ2 * 700) / N, mx, my)

  minDistance = 9999999
  let minI3
  let minJ3
  
  for (let i = 1; i < N; i++) {
    for (let j = 1; j < N; j++) {
      let x = (i * 700) / N
      let y = (j * 700) / N
      let distance = dist(x, y, mx, my)
      
      if (i == minI && j == minJ) continue
      if (i == minI2 && j == minJ2) continue
      if (distance < minDistance) {
        minDistance = distance
        minI3 = i
        minJ3 = j
      }
    }
  }

  fill('red')
  noStroke()
  circle((minI3 * 700) / N, (minJ3 * 700) / N, 13)
  strokeWeight(5)
  stroke('red')
  line((minI3 * 700) / N, (minJ3 * 700) / N, mx, my)

  noStroke()
  fill('red')
  circle(mx, my, 28)
}
