let water1
let items = []

let close
let open
let tear
let isClosed = false

let timer = 0

let hues = [ 345, 58, 145, 190, 220, 283 ]
let hueIndex = 0

let px = 0
let py = 0

let sound

function preload() {
  open = loadImage('assets/open.svg')
  close = loadImage('assets/close.svg')
  tear = loadImage('assets/gota.svg')

  sound = new Audio('assets/1.wav')
  sound.loop = false
}

function setup() {
  colorMode(HSB)
  createCanvas(1080, 1080)
  imageMode(CENTER)

  drop()

  water1 = new Water(720, hues[0])
  water2 = new Water(780, hues[1])
  water3 = new Water(840, hues[2])
  water4 = new Water(900, hues[3])
  water5 = new Water(960, hues[4])
  water6 = new Water(1020, hues[5])
}

function draw() {
  background(0, 0, 100)

  timer += deltaTime / 1000
  if (timer > 3) {
    timer = 0
    drop()
  }

  items.forEach((item, i) => {
    if (item.isDead) {
      items.splice(i, 1)
    }
  })

  items.forEach((item) => {
    item.draw()

    if (item.position.y > water1.y - 20 && item.position.y < water1.y + 100) {
      water1.hit(item.position.x, 60)
    }
    if (item.position.y > water2.y - 20 && item.position.y < water2.y + 100) {
      water2.hit(item.position.x, 60)
    }
    if (item.position.y > water3.y - 20 && item.position.y < water3.y + 100) {
      water3.hit(item.position.x, 60)
    }
    if (item.position.y > water4.y - 20 && item.position.y < water4.y + 100) {
      water4.hit(item.position.x, 60)
    }
    if (item.position.y > water5.y - 20 && item.position.y < water5.y + 100) {
      water5.hit(item.position.x, 60)
    }
    if (item.position.y > water6.y - 20 && item.position.y < water6.y + 100) {
      water6.hit(item.position.x, 60)
    }
  })

  // px = lerp(px, mouseX, 0.2)
  // py = lerp(py, mouseY, 0.2)

  px = width / 2
  py = height / 3.4

  if (isClosed) {
    image(close, px, py)
  } else {
    image(open, px, py)
  }

  water1.draw()
  water2.draw()
  water3.draw()
  water4.draw()
  water5.draw()
  water6.draw()
}

function drop() {
  setTimeout(() => {
    sound.load()
    sound.play()
  }, 685)

  setTimeout(() => {
    items.push(new Item(px, py + 40, hues[hueIndex]))
    hueIndex++
    if (hueIndex == 6) hueIndex = 0
  }, 120)

  isClosed = true
  setTimeout(() => {
    isClosed = false
  }, 2500)
}
