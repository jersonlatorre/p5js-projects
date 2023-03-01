let time = 0
let multinoise
let N = 5
let colors = ['#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#89ED8D', '#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#89ED8D']
let font
let synth
// let notes = []
let chars = 'noisesynth'
let v
let currentNote
let blackNoteDuration = 100

let letters = []

function setup() {
  // createCanvas(windowWidth, windowHeight)
  createCanvas(1080, 1080)
  multinoise = new Multinoise()

  for (let i = 0; i < N; i++) {
    let letter = new Letter(i)
    letters.push(letter)
  }
}

function playNextNote() {
  currentNote = parseInt(random(N))

  letters[currentNote].play()
  let note = parseInt(map(v.values[currentNote], 0, 1, 20, 500))
  synth.triggerAttackRelease(note, '64n')
  setTimeout(() => {
    playNextNote()
  }, random([100, 100, 100, 200, 200, 400]))
}

function preload() {
  font = loadFont('assets/louis.ttf')
}

function draw() {
  clear()
  noStroke()
  blendMode(BLEND)
  textFont(font)

  v = multinoise.get(millis() * 0.0003, N)

  letters.forEach((letter) => {
    letter.draw()
  })

  for (let i = 0; i < v.count; i++) {
    let value = v.values[i]
    let cumulative = v.cumulatives[i]
    let r = value * width
    let x = cumulative * width + (value * width) / 2
    let y = height / 2
    noFill()
    strokeWeight(4)
    stroke(255)
    if (i % 2 == 0) {
      arc(x, y, r, r, -PI, 0)
    } else {
      arc(x, y, r, r, 0, PI)
    }
  }
}

function mousePressed() {
  synth = new Tone.AMSynth().toDestination()
  synth.portamento = 0.01
  synth.modulation.type = 'sine'
  synth.envelope.attack = 0.004
  playNextNote()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

class Letter {
  constructor(index) {
    this.index = index
    this.circleOpacity = 1
    this.backgroundOpacity = 0
    this.factor = 1
  }

  draw() {
    let value = v.values[this.index]
    let cumulative = v.cumulatives[this.index]

    this.backgroundOpacity = lerp(this.backgroundOpacity, 0, 0.2)
    this.circleOpacity = lerp(this.circleOpacity, 1, 0.1)
    this.factor = lerp(this.factor, 1, 0.2)
    if (this.backgroundOpacity < 0.001) this.backgroundOpacity = 0
    if (this.circleOpacity < 0.001) this.circleOpacity = 0
    if (this.factor < 0.001) this.factor = 0

    fill(colors[this.index])
    noStroke()
    rect(cumulative * width, 0, value * width, height)
    fill(`rgba(255, 255, 255, ${abs(this.backgroundOpacity)})`)
    rect(cumulative * width, 0, value * width, height)

    noStroke()
    fill(`rgba(40, 40, 40, ${this.circleOpacity})`)
    let r = value * width
    let x = cumulative * width + (value * width) / 2
    let y = height / 2
    circle(x, y, r * 0.8 * this.factor)

    fill(255)
    noStroke()
    textAlign(CENTER, CENTER)
    textSize(r * 0.4 * this.factor)
    text(chars[this.index], x, y - r * 0.08)
  }

  play() {
    this.backgroundOpacity = 0.6
    this.circleOpacity = 0
    this.factor = 0.6
  }
}
