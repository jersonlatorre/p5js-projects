let points = []
let N = 30
let R1 = 20
let R2 = 40

function setup() {
  createCanvas(500, 500)
  colorMode(HSB)
}

function draw() {
  background('yellow')
  
	let t = millis() / 1500.0
	let x = width * noise(t)
	let y = width * noise(t + 10)
  points.push({ x: x, y: y })
  
  if (points.length >= N) {
    points.splice(0, 1)
  }

	points.forEach((point, i) => {
    noStroke()
    circle(point.x, point.y, R2)
  })

  points.forEach((p, i) => {
    let c = map(i, 0, N - 1, 255, 0)
    stroke(c, 255, 255)
    strokeWeight(R1)
    if (i < points.length - 1) {
      line(p.x, p.y, points[i + 1].x, points[i + 1].y)
    }
  })
}
