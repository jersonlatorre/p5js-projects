let mic

function setup() {
  createCanvas(600, 600)
  getAudioContext().suspend();

  mic = new p5.AudioIn()
  mic.start()

  textAlign(CENTER, CENTER)
  text('click para empezar', 300, 300)
}

function draw() {
  background('white')

  // se obtiene el volumen
  let volume = mic.getLevel()

  // se mapea la cantidad y el tamaño de los círculos
  let count = map(volume, 0, 1, 0, 20000)
  let size = map(volume, 0, 1, 2, 300)

  for (let i = 0; i < count; i++) {
    fill('red')
    noStroke()
    circle(random(600), random(600), size)
  }

  fill('black')

  // se mapea el radio de la pupila
  let radius = map(volume, 0, 1, 200, 600)
  circle(300, 300, radius)

  // se mapea el radio de los párpados
  let height = map(volume, 0, 1, 80, 2000)
  rect(0, 0, 600, height)
  rect(0, 600 - height, 600, height)
}

function mouseClicked() {
  userStartAudio()
}
