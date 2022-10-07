let windowManager
let font

function preload() {
  font = loadFont('assets/Hack-Regular.ttf')
}

function setup() {
  createCanvas(1080, 1080)
  windowManager = new WindowManager()
  windowManager.on('create', (window) => {
    window.drawer = new Estudio1(window.graphics)
    window.name = generateRandomName(4)
  })
}

function draw() {
  windowManager.draw()
}
