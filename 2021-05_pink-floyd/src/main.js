let hues = [ 345, 58, 145, 190, 220, 283 ]

let ww, hh
let center, p
let rayIntersection, firstRefraction, lastRefraction

let refractionStarts = []
let refractionEnds = []

let N_RAYS = 6
let TRIANGLE_FACTOR = 0.12
let MAX_SEPARATION = Math.PI / 20
let MAX_REFRACTION = Math.PI / 10

let personImg, cloudImg, heartImg
let person, cloud, backgroundAnimation

let wind

function preload() {
  personImg = loadImage('assets/person.svg')
  cloudImg = loadImage('assets/cloud.svg')
  heartImg = loadImage('assets/heart.svg')
}

function setup() {
  createCanvas(1080, 1920)

  colorMode(HSB)
  imageMode(CENTER)
  personImg.resize(width * 0.1, 0)
  cloudImg.resize(width * 0.1, 0)

  center = createVector(0, 0)
  p = createVector()

  noCursor()

  person = new Person()
  cloud = new Cloud()
  backgroundAnimation = new BackgroundAnimation()

  wind = new Pizzicato.Sound('./assets/wind8.mp3', () => {
    wind.play()
    wind.sourceNode.playbackRate.value = 0.8
    wind.on('end', () => {
      wind.play()
      wind.sourceNode.playbackRate.value = 0.8
    })
  })

  bg1 = new Pizzicato.Sound('./assets/bg1.mp3', () => {
    bg1.play()
    bg1.volume = 0.5
    bg1.sourceNode.playbackRate.value = 1
    bg1.on('end', () => {
      bg1.play()
      bg1.volume = 0.5
      bg1.sourceNode.playbackRate.value = 1
    })
  })

  bg2 = new Pizzicato.Sound('./assets/bg2.mp3', () => {
    bg2.play()
    bg2.volume = 0.1
    bg2.sourceNode.playbackRate.value = 1
    bg2.on('end', () => {
      bg2.play()
      bg2.volume = 0.1
      bg2.sourceNode.playbackRate.value = 1
    })
  })
}

function draw() {
  refractionStarts = []
  refractionEnds = []

  backgroundAnimation.draw()
  translate(width * 0.5, height * 0.5)

  hh = height * 0.5
  ww = width * 0.5

  let mousePosition = createVector(mouseX - ww, mouseY - hh)
  p = p5.Vector.lerp(p, mousePosition, 0.08)

  // volume
  distance = mousePosition.copy().sub(p).mag()
  distance = constrain(distance, 0, hh)
  let volume = map(distance, 0, hh, 0, 0.6)
  wind.volume = volume

  drawReflection()
  drawRainbow()
  drawTriangle()
  
  cloud.draw()
  person.draw()
  
  drawMouseLine()
  drawInnerLines()

}

function drawInnerLines() {
  stroke(255, 1)
  strokeWeight(width * 0.003)
  line(rayIntersection.x, rayIntersection.y, refractionStarts[0].x, refractionStarts[0].y)
  line(
    rayIntersection.x,
    rayIntersection.y,
    refractionStarts[refractionStarts.length - 1].x,
    refractionStarts[refractionStarts.length - 1].y
  )
}

function drawReflection() {
  let distance = dist(p.x, p.y, 0, 0)
  distance = constrain(distance, 0, ww * 1.4)
  let delta = map(distance, 0, ww, MAX_SEPARATION * 1, MAX_SEPARATION * 0.45)

  for (let i = 0; i <= N_RAYS; i++) {
    let index = map(i, 0, N_RAYS, -N_RAYS / 2, N_RAYS / 2)
    let angle = index * delta
    let ray = p.copy().sub(center).rotate(angle).rotate(2 * PI / 3)
    this.drawRay(ray, index)
  }
}

function drawRay(ray, i) {
  let globalAngle = ray.copy().rotate(-PI / 2).heading() + PI
  let deviation = -sin(3 * globalAngle) * MAX_REFRACTION

  let end = center.copy().add(ray.normalize().mult(1000))
  let a, b, c, d

  if (globalAngle >= 0 && globalAngle < 2 * PI / 3) {
    a = createVector(0, -width * TRIANGLE_FACTOR)
    b = a.copy().rotate(2 * PI / 3)
    c = center
    d = end
  }

  if (globalAngle >= 2 * PI / 3 && globalAngle < 4 * PI / 3) {
    a = createVector(0, -width * TRIANGLE_FACTOR).rotate(2 * PI / 3)
    b = a.copy().rotate(2 * PI / 3)
    c = center
    d = end
  }

  if (globalAngle >= 4 * PI / 3 && globalAngle < 2 * PI) {
    a = createVector(0, -width * TRIANGLE_FACTOR).rotate(4 * PI / 3)
    b = a.copy().rotate(2 * PI / 3)
    c = center
    d = end
  }

  let refractionStart = intersect([ a.x, a.y, b.x, b.y ], [ c.x, c.y, d.x, d.y ])
  refractionStart = createVector(refractionStart.x, refractionStart.y)

  let refractionEnd = refractionStart.copy().add(ray.normalize().rotate(deviation).mult(max(width, height)))
  refractionStarts.push(refractionStart)
  refractionEnds.push(refractionEnd)

  strokeWeight(width * 0.002)
  stroke('black')
  line(refractionStart.x, refractionStart.y, refractionEnd.x, refractionEnd.y)
}

function drawRainbow() {
  for (let i = 0; i < N_RAYS; i++) {
    // let hue = map(i, 0, N_RAYS, 0, 360)
    let hue = hues[i]
    stroke(hue, 100, 100)
    fill(hue, 100, 100)
    beginShape()
    vertex(refractionStarts[i].x, refractionStarts[i].y)
    vertex(refractionEnds[i].x, refractionEnds[i].y)
    vertex(refractionEnds[i + 1].x, refractionEnds[i + 1].y)
    vertex(refractionStarts[i + 1].x, refractionStarts[i + 1].y)
    endShape()
  }
}

function drawMouseLine() {
  let ray = p
  let globalAngle = ray.copy().rotate(-PI / 2).heading() + PI
  let a, b, c, d

  if (globalAngle >= 0 && globalAngle < 2 * PI / 3) {
    a = createVector(0, -width * TRIANGLE_FACTOR)
    b = a.copy().rotate(2 * PI / 3)
    c = center
    d = p.copy().mult(10)
  }

  if (globalAngle >= 2 * PI / 3 && globalAngle < 4 * PI / 3) {
    a = createVector(0, -width * TRIANGLE_FACTOR).rotate(2 * PI / 3)
    b = a.copy().rotate(2 * PI / 3)
    c = center
    d = p.copy().mult(10)
  }

  if (globalAngle >= 4 * PI / 3 && globalAngle < 2 * PI) {
    a = createVector(0, -width * TRIANGLE_FACTOR).rotate(4 * PI / 3)
    b = a.copy().rotate(2 * PI / 3)
    c = center
    d = p.copy().mult(10)
  }

  let intersection = intersect([ a.x, a.y, b.x, b.y ], [ c.x, c.y, d.x, d.y ])
  rayIntersection = intersection

  push()
  strokeWeight(width * 0.008)
  stroke('black')
  line(p.x, p.y, intersection.x, intersection.y)
  pop()
}

function drawTriangle() {
  strokeJoin(ROUND)
  let r = width * TRIANGLE_FACTOR
  let angle = -PI / 2

  fill(0, 255)
  stroke('black')

  strokeWeight(width * 0.004)
  beginShape()
  for (let i = 0; i < 4; i++) {
    let p1x = r * cos(angle + 2 * i * PI / 3)
    let p1y = r * sin(angle + 2 * i * PI / 3)
    vertex(p1x, p1y)
  }
  endShape()
}
