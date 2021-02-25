let global = {
  speed: 0,
  delayFactor: 0,
  size: 900,
  numLines: 10,
  lineWidth: 2
}

let time = 0
let simplex = new SimplexNoise()
let mousePosition
let toDelayFactor = 0
let toSize = 0
let toLineWidth = 0

function setup() {
  createCanvas(1080, 1080)
  colorMode(HSB)

  mousePosition = createVector()

  let pane = new Tweakpane({
    title: 'parameters'
  })

  pane.addInput(global, 'speed', {
    min: 0,
    max: 0.01
  })

  pane.addInput(global, 'delayFactor', {
    min: 0,
    max: 0.2
  })

  pane.addInput(global, 'numLines', {
    min: 3,
    max: 30,
    step: 1
  })

  document.querySelector('.tp-dfwv').style.opacity = 0.8
  document.querySelector('.tp-dfwv').style.top = 'auto'
  document.querySelector('.tp-dfwv').style.bottom = '15px'
  document.querySelector('.tp-dfwv').style.right = parseInt(20 + 0.5 * (window.innerWidth - 1080)) + 'px'
}

function draw() {
  blendMode(BLEND)
  background('rgba(255, 255, 255, 0.2)')
  background('rgba(0, 0, 0, 1)')
  // blendMode(ADD)
  time += global.speed

  toDelayFactor = lerp(toDelayFactor, global.delayFactor, 0.05)
  toSize = lerp(toSize, global.size, 0.05)
  toLineWidth = lerp(toLineWidth, global.lineWidth, 0.05)

  let rx = width / 2 + 500 * simplex.noise2D(millis() / 3000, 100)
  let ry = height / 2 + 500 * simplex.noise2D(millis() / 3000, 200)

  mousePosition = createVector(rx, ry)

  for (let i = 0; i < global.numLines; i++) {
    let points = []
    let N = 100

    for (let j = 0; j <= N; j += 1) {
      let t = j / N
      let angle = 2 * PI * simplex.noise2D(time - toDelayFactor * t, i)
      let r = toSize + toSize * 0.4 * simplex.noise2D(time - toDelayFactor * t, i + 1)
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
      strokeWeight(map(i, 0, N - 1, 0, 2))
      stroke(map(i, 0, N - 1, 360, 0), 100, 100)

      line(p1.x, p1.y, p2.x, p2.y)
      // circle(p1.x, p1.y, map(i, 0, N - 1, 0, 80))
    }
  }
}
