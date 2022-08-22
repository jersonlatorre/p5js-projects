let time = 0
let multinoise
let N = 6
let emojis = ['😠','😄','😩', '😲','😞','😱']
let faces = []
let hues = [345, 58, 145, 190, 220, 283]

function preload() {
  faces[0] = loadImage('assets/ira.png')
  faces[1] = loadImage('assets/alegria.png')
  faces[2] = loadImage('assets/asco.png')
  faces[3] = loadImage('assets/asombro.png')
  faces[4] = loadImage('assets/tristeza.png')
  faces[5] = loadImage('assets/miedo.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  multinoise = new Multinoise()
}

function draw() {
  background('white')

  colorMode(HSB)
  textAlign(CENTER, CENTER)
  imageMode(CENTER)
  noStroke()

  let v = multinoise.get(millis() / 2000, N)

  for (let i = 0; i < v.count; i++) {
    let value = v.values[i]
    let cumulative = v.cumulatives[i]

    fill(hues[i], 100, 100)
    rect(cumulative * width, 0, value * width, height)

    // fill('white')
    // circle(cumulative * width + value * width / 2, height / 2, value * width * 1)
    
    // textSize(value * width * 0.8)
    // text(emojis[i], cumulative * width + value * width / 2, height / 2 + value * width * 0.02)
    // tint(0, 0, 100, value * 4)

    let l = value * width * 0.7
    // image(faces[i], cumulative * width + value * width / 2, height / 2 + value * width * 0.02, l, l)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}