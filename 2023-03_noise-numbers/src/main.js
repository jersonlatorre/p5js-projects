let time = 0
let multinoise
let N1 = 5
let N2 = 10
let colors = ['#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#89ED8D']
let v
let font

function preload() {
  font = loadFont('assets/louis.ttf')
}

function setup() {
  // createCanvas(windowWidth, windowHeight)
  createCanvas(800, 800)
  multinoise = new Multinoise()
  textFont(font)
}

function draw() {
  clear()
  noStroke()

  
  v = multinoise.get(millis() * 0.0005, N1)
  for (let i = 0; i < N1; i++) {
    let value = v.values[i]
    let cumulative = v.cumulatives[i]
    if (this.backgroundOpacity < 0.001) this.backgroundOpacity = 0
    let y = cumulative * height
    let h = value * height
    fillGradient(y, h, colors[i % 5], i == N1 - 1 ? colors[0] : colors[(i + 1) % 5])
  }
  
  v = multinoise.get(millis() * 0.0007, N2)
  for (let i = 0; i < N2; i++) {
    let value = v.values[i]
    let cumulative = v.cumulatives[i]
    let y = cumulative * height
    let h = value * height

    noStroke()
    fill('rgb(60,60,60)')
    stroke('rgb(60,60,60)')
    rectMode(CORNER)
    square(y + h / 4, y + h / 4, h / 2)

    noStroke()
    fill('rgb(255, 255, 255)')
    textAlign(CENTER, CENTER)
    textSize(h * 0.8)
    // text((h / height).toFixed(40), y + h * 0.5, y + h * 0.4)
  }
}

function fillGradient(start, height, color1, color2) {
  for (let i = 0; i < height; i++) {
    let c = lerpColor(color(color1), color(color2), i / height)
    strokeWeight(1)
    stroke(c)
    line(0, start + i, width, start + i)
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight)
// }
