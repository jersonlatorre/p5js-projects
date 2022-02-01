let tracer
let pane

const PARAMS = {
  tailSize: 400,
  radius1: 200,
  radius2: 40,
  followSpeed: 0.5,
  speed1: 1,
  speed2: 10,
  thickness: 0.3
}

let headPosition
let timer = 0

let cursorImg

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB)
  background(0)
  frameRate(60)

  headPosition = createVector()
  tracer = new Tracer()

  pane = new Tweakpane.Pane({
    container: document.getElementById('container')
  })
  pane.addInput(PARAMS, 'tailSize', { min: 10, max: 500, step: 1, label: 'Length' })
  pane.addInput(PARAMS, 'followSpeed', { min: 0.01, max: 0.99, step: 0.01, label: 'Drag' })
  // pane.addInput(PARAMS, 'thickness', { min: 0.5, max: 1, step: 0.01, label: 'Thickness' })
  pane.addInput(PARAMS, 'radius1', { min: 0, max: 300, step: 1, label: 'R1' })
  pane.addInput(PARAMS, 'speed1', { min: 0, max: 5, step: 1, label: 'Speed 1' })
  pane.addInput(PARAMS, 'radius2', { min: 0, max: 100, step: 1, label: 'R2' })
  pane.addInput(PARAMS, 'speed2', { min: 0, max: 20, step: 1, label: 'Speed 2' })
  pane.addButton({ title: 'Randomize' }).on('click', () => {
    PARAMS.tailSize = random(10, 500)
    PARAMS.followSpeed = random(0.01, 0.99)
    // PARAMS.thickness = random(0.5, 1)
    PARAMS.radius1 = random(0, 300)
    PARAMS.speed1 = random(0, 5)
    PARAMS.radius2 = random(0, 100)
    PARAMS.speed2 = random(0, 20)
    pane.refresh()
    clearAll()
  })

  pane.on('change', (ev) => {
    clearAll()
  })

  for (let i = 0; i <= PARAMS.tailSize; i++) {
    background(0)
    draw()
  }
}

function draw() {
  let x = fx(timer)
  let y = fy(timer)
  timer += 0.01

  headPosition = createVector(x, y)
  tracer.addPoint(headPosition)

  tracer.draw()
}

function fx(t) {
  let angle1 = t * PARAMS.speed1
  let angle2 = t * PARAMS.speed2
  let cx = cos(angle1) * PARAMS.radius1 + windowWidth / 2
  let dx = cos(angle2) * PARAMS.radius2 + cx
  return dx
}

function fy(t) {
  let angle1 = t * PARAMS.speed1
  let angle2 = t * PARAMS.speed2
  let cy = sin(angle1) * PARAMS.radius1 + windowHeight / 2
  let dy = sin(angle2) * PARAMS.radius2 + cy
  return dy
}

function clearAll() {
  background(0)
  tracer.clear()
  for (let i = 0; i <= PARAMS.tailSize; i++) {
    background(0)
    draw()
  }
}

function windowResized() {
  window.location = '/'
}
