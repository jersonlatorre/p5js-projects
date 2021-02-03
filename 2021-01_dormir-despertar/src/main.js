const FACTOR = 1

let simplex

const NOISE_SPEED = 0.4
const MIN_STARS_SIZE = 4
const MAX_STARS_SIZE = 8
const MIN_STARS_SPEED = 20
const MAX_STARS_SPEED = 50
const TRANSITION_SPEED = 0.8
const CLOUD_RESOLUTION = 25
const CLOUD_WIDTH = 280
const CLOUD_HEIGHT = 130

const CLOUDS_TOP = 1000
const MESSAGE_TOP = 1250

let clickTime = 0

let state, open, close
let backgroundColor, cloudColor
let message

let bgBlack, bgWhite, whoosh

let stars = []

function preload() {
  open = loadImage('assets/open.svg')
  close = loadImage('assets/close.svg')
  bgBlack = new Howl({ src: [ 'assets/bgBlack.mp3' ], loop: true, volume: 0.5 })
  bgWhite = new Howl({ src: [ 'assets/bgWhite.mp3' ], loop: true, volume: 0 })
  whoosh = new Howl({ src: [ 'assets/whoosh.mp3' ] })

  bgBlack.play()

  bgWhite.play()

  whoosh.volume(0.7)
}

function setup() {
  let canvas = createCanvas(1080 * FACTOR, 1920 * FACTOR)
  canvas.parent('p5')

  imageMode(CENTER)
  noStroke()

  Global.time = 0
  simplex = new SimplexNoise('2')
  state = State.NIGHT

  for (let i = 0; i < 400; i++) {
    stars.push(new Star())
  }

  select('#message').position(0, MESSAGE_TOP)

  select('#despertar').mouseClicked(() => {
    if (state != State.DAY) whoosh.play()
    state = State.NIGHT_TO_DAY
    select('#message').class('black')
  })

  select('#dormir').mouseClicked(() => {
    if (state != State.NIGHT) whoosh.play()
    state = State.DAY_TO_NIGHT
    select('#message').class('white')
  })
}

function draw() {
  scale(FACTOR)

  Global.time += deltaTime / 1000

  switch (state) {
    case State.NIGHT: {
      Global.t = 0
      drawBackground()
      drawStars()
      drawPlanet()
      drawClouds()
      drawEye()

      break
    }

    case State.NIGHT_TO_DAY: {
      drawBackground()
      drawStars()
      drawPlanet()
      drawClouds()
      drawEye()

      bgBlack.volume(map(Global.t, 0, 1, 0.5, 0))
      bgWhite.volume(map(Global.t, 0, 1, 0, 0.5))

      // pasa el tiempo
      Global.t += TRANSITION_SPEED * deltaTime / 1000
      if (Global.t > 1) {
        Global.t = 1
        state = State.DAY
      }

      break
    }

    case State.DAY_TO_NIGHT: {
      drawBackground()
      drawStars()
      drawPlanet()
      drawClouds()
      drawEye()

      bgBlack.volume(map(Global.t, 0, 1, 0.5, 0))
      bgWhite.volume(map(Global.t, 0, 1, 0, 0.5))

      // pasa el tiempo
      Global.t -= TRANSITION_SPEED * deltaTime / 1000
      if (Global.t < 0) {
        Global.t = 0
        state = State.NIGHT
      }

      break
    }

    case State.DAY: {
      Global.t = 1
      drawBackground()
      drawStars()
      drawPlanet()
      drawClouds()
      drawEye()

      break
    }
  }

  // rect(0, 420, 1920, 1080)
}

function drawBackground() {
  backgroundColor = parseInt(lerp(0, 255, Global.t))
  background(backgroundColor)
}

function drawPlanet() {
  let alpha, distanceToCloud

  if (Global.t < 0.5) {
    distanceToCloud = lerp(0, 200, easeInBack(2 * Global.t))
    alpha = lerp(1, 0, 2 * Global.t)
    fill('rgba(240, 240, 240,' + alpha + ')')
  } else {
    distanceToCloud = lerp(200, 0, easeOutBack(2 * (Global.t - 0.5)))
    alpha = lerp(0, 1, 2 * (Global.t - 0.5))
    fill('rgba(245, 210, 90,' + alpha + ')')
  }

  circle(540, CLOUDS_TOP - 350 + distanceToCloud, 70)
}

function drawClouds() {
  drawNoise(10, 0.2)
  drawNoise(20, 0.3)
  drawNoise(30, 0.6)
}

function drawEye() {
  if (Global.t <= 0.5) {
    image(close, 540, CLOUDS_TOP - 50)
  } else {
    image(open, 540, CLOUDS_TOP - 50)
  }
}

function drawStars() {
  stars.forEach((star) => {
    star.draw()
  })
}

function drawNoise(seed, alpha) {
  cloudColor = parseInt(lerp(255, 50, easeInOut(Global.t)))
  fill(cloudColor, alpha * 255)

  beginShape()
  for (let i = -1; i <= CLOUD_RESOLUTION + 1; i++) {
    addVertex(i % CLOUD_RESOLUTION, seed)
  }
  endShape()
}

function addVertex(i, seed) {
  let angle, x, y
  angle = i * 2 * PI / CLOUD_RESOLUTION
  x = 540 + CLOUD_WIDTH * cos(angle)
  y =
    CLOUDS_TOP +
    (CLOUD_HEIGHT + CLOUD_HEIGHT * (1 + simplex.noise2D(i, Global.time * NOISE_SPEED + seed)) * 0.5) * sin(angle)

  if (y > CLOUDS_TOP) y = CLOUDS_TOP + (y - CLOUDS_TOP) * 0.3
  curveVertex(x, y)
}
