const FACTOR = 1

let simplex

const NOISE_SPEED = 0.4
const MIN_STARS_SIZE = 4
const MAX_STARS_SIZE = 8
const MIN_STARS_SPEED = 20
const MAX_STARS_SPEED = 50
const MIN_STARS_TWINKLE_SPEED = 1
const MAX_STARS_TWINKLE_SPEED = 4
const TRANSITION_SPEED = 1
const CLOUD_RESOLUTION = 25
const CLOUD_WIDTH = 280
const CLOUD_HEIGHT = 130

const CLOUDS_TOP = 1020
const MESSAGE_TOP = 1280

let time = 0
let clickTime = 0
let t

let state, open, close
let backgroundColor, cloudColor
let message

function preload() {
  open = loadImage('assets/open.svg')
  close = loadImage('assets/close.svg')
}

function setup() {
  let canvas = createCanvas(1080 * FACTOR, 1920 * FACTOR)
  canvas.parent('p5')

  imageMode(CENTER)
  noStroke()

  simplex = new SimplexNoise('2')
  state = State.NIGHT

  select('#message').position(0, MESSAGE_TOP)

  select('#despertar').mouseClicked(() => {
    state = State.NIGHT_TO_DAY
    select('#message').class('black')
  })

  select('#dormir').mouseClicked(() => {
    state = State.DAY_TO_NIGHT
    select('#message').class('white')
  })
}

function draw() {
  scale(FACTOR)

  time += deltaTime / 1000

  // clickTime += deltaTime / 1000
  // if (clickTime > 5) {
  //   clickTime = 0
  //   mouseClicked()
  // }

  switch (state) {
    case State.NIGHT: {
      t = 0
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

      // pasa el tiempo
      t += TRANSITION_SPEED * deltaTime / 1000
      if (t > 1) {
        t = 1
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

      // pasa el tiempo
      t -= TRANSITION_SPEED * deltaTime / 1000
      if (t < 0) {
        t = 0
        state = State.NIGHT
      }

      break
    }

    case State.DAY: {
      t = 1
      drawBackground()
      drawStars()
      drawPlanet()
      drawClouds()
      drawEye()

      break
    }
  }
}

function drawBackground() {
  backgroundColor = parseInt(lerp(0, 255, t))
  background(backgroundColor)
}

function drawPlanet() {
  let alpha, distanceToCloud

  if (t < 0.5) {
    distanceToCloud = lerp(0, 200, easeInBack(2 * t))
    alpha = lerp(1, 0, 2 * t)
    fill('rgba(240, 240, 240,' + alpha + ')')
  } else {
    distanceToCloud = lerp(200, 0, easeOutBack(2 * (t - 0.5)))
    alpha = lerp(0, 1, 2 * (t - 0.5))
    // fill('rgba(245, 210, 90,' + alpha + ')')
    fill('rgba(80, 80, 80,' + alpha + ')')
  }

  circle(540, CLOUDS_TOP - 350 + distanceToCloud, 70)
}

function drawClouds() {
  drawNoise(10, 0.2)
  drawNoise(20, 0.3)
  drawNoise(30, 0.6)
}

function drawEye() {
  if (t <= 0.5) {
    image(close, 540, CLOUDS_TOP - 50)
  } else {
    image(open, 540, CLOUDS_TOP - 50)
  }
}

// function mouseClicked() {
//   switch (state) {
//     case State.DAY_TO_NIGHT:
//     case State.NIGHT: {
//       state = State.NIGHT_TO_DAY
//       select('#message').class('black')
//       break
//     }
//     case State.NIGHT_TO_DAY:
//       case State.DAY: {
//         state = State.DAY_TO_NIGHT
//         select('#message').class('white')
//       break
//     }
//   }
// }

function drawStars() {
  let starColor = parseInt(map(easeInOut(t), 0, 1, 255, 150))
  fill(starColor)

  for (let i = 0; i < 400; i++) {
    let r0 = rand(i)
    let r1 = rand(i + 1)
    let r2 = rand(i + 2)
    let r3 = rand(i + 3)
    let r4 = rand(i + 4)
    let r5 = rand(i + 5)

    let speed = map(r2, 0, 1, MIN_STARS_SPEED, MAX_STARS_SPEED)
    let twinkleSpeed = map(r5, 0, 1, MIN_STARS_TWINKLE_SPEED, MAX_STARS_TWINKLE_SPEED)

    let rx = map(r0, 0, 1, -50, 1080 + 50)
    let ry = 1920 * r1
    let x = rx + time * speed * map(r4, 0, 1, 0.6, 1)
    let y = ry
    x %= 1080

    let scale = map(sin(time * twinkleSpeed + i), -1, 1, 0.3, map(t, 0, 1, 1, 1.4))
    let maxSize

    if (i % 10 == 0) {
      maxSize = map(r3, 0, 1, MAX_STARS_SIZE * 0.2, MAX_STARS_SIZE)
      circle(x, y, maxSize * scale)
    } else {
      maxSize = map(r3, 0, 1, MIN_STARS_SIZE * 0.2, MIN_STARS_SIZE)
      circle(x, y, maxSize * scale)
    }
  }
}

function drawNoise(seed, alpha) {
  // push()
  // translate(0, TOP_OFFSET)
  cloudColor = parseInt(lerp(255, 50, easeInOut(t)))
  fill(cloudColor, alpha * 255)

  beginShape()
  for (let i = -1; i <= CLOUD_RESOLUTION + 1; i++) {
    addVertex(i % CLOUD_RESOLUTION, seed)
  }
  endShape()
  // pop()
}

function addVertex(i, seed) {
  let angle, x, y
  angle = i * 2 * PI / CLOUD_RESOLUTION
  x = 540 + CLOUD_WIDTH * cos(angle)
  y =
    CLOUDS_TOP + (CLOUD_HEIGHT + CLOUD_HEIGHT * (1 + simplex.noise2D(i, time * NOISE_SPEED + seed)) * 0.5) * sin(angle)

  if (y > CLOUDS_TOP) y = CLOUDS_TOP + (y - CLOUDS_TOP) * 0.3
  curveVertex(x, y)
}
