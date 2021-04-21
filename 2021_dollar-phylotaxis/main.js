let N = 850
let R = 14
let SCALE = 18
let GOLDEN = 2.399
let TEXT_SIZE = 28

let word = '$'

function setup() {
  createCanvas(windowWidth, windowHeight)
  textAlign(CENTER, CENTER)
  textSize(TEXT_SIZE)
  // frameRate(30)
}

function draw() {
  translate(width / 2, height / 2)
  rotate(GOLDEN * frameCount)
  background('black')

  for (let i = 1; i < N; i++) {
    let r = SCALE * sqrt(i)
    let angle = -2.3999 * i

    let x = r * cos(angle)
    let y = r * sin(angle)

    fill(255, r * 1)
    push()
    translate(x, y)
    rotate(atan2(y, x) + PI / 2)
    scale(sqrt((N - i) / N))
    text(word, -20, -20)
    pop()
  }
}
