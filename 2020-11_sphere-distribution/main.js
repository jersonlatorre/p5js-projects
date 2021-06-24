let R = 550
let DENSITY = 7
let t = 0
let CAMERA_DISTANCE = 2000

let simplex
let timer = 0

function setup() {
  createCanvas(1080, 1080, WEBGL)
  smooth()

  simplex = new SimplexNoise()
}

function draw() {
  background('rgb(225,230,224)')
  drawSphere()

  t += 0.01

  timer += deltaTime / 1000
  if (timer > 1) {
    timer = 0
  }
}

function drawSphere() {
  let cameraDistance = CAMERA_DISTANCE - 150 * sin(PI * t * 1)
  let cx = cameraDistance * cos(1 * PI * t / 5)
  let cy = cameraDistance * cos(1 * PI * t / 5)
  let cz = cameraDistance * sin(1 * PI * t / 5)
  camera(cx, cy / 2, cz, 0, 0, 0, 0, 1, 0)

  noStroke()
  fill('black')
  sphere(R  * 0.8)

  for (let i = 0; i <= DENSITY; i++) {
    lat = i * PI / DENSITY
    dLon = PI / constrain(floor(DENSITY * sin(lat)), 0.5, parseInt(DENSITY))
    for (let lon = 0; lon < 2 * PI; lon += dLon) {
      push()
      let x = R * cos(lon) * sin(lat)
      let y = R * sin(lon) * sin(lat)
      let z = R * cos(lat)

      let nx = sin(lat)
      let ny = sin(lon / 2)

      translate(x, y, z)
      rotateZ(lon)
      rotateY(lat)

      let r = simplex.noise3D(nx, ny, millis() / 1000)
      r = 40 * 0.5 * (r + 1)
      translate(0, 0, r)

      // push()
      // scale(1, 1, r)
      // fill('rgba(0, 0, 0, 1)')
      // box(10)
      // pop()

      translate(0, 0, 3 * r)

      for (let i = 0; i < 5; i++) {
        fill('rgba(255, 255, 255, 0.03)')
        if (40 + r * 2 - i * 20 > 0) {
          sphere(40 + r * 2 - i * 20)
        }
      }

      fill('black')
      translate(0, 0, 1)
      sphere(8)
      pop()
    }
  }
}
