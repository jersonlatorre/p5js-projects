let posts = []
let globalScale = 1
let globalX = 0
let globalY = 0
let lerpedGlobalScale = 1
let lerpedGlobalX = 1
let lerpedGlobalY = 1

let colors = ['#FF004D', '#FFA300', '#FFEC27', '#29ADFF', ' #FFF1E8']

function setup() {
  createCanvas(windowWidth, windowHeight)

  createButton('+')
    .position(10, 10)
    .size(50, 50)
    .mousePressed(() => {
      // Ajusta la posición del nuevo post basándose en la escala y posición actual
      let screenCenterX = width / 2
      let screenCenterY = height / 2

      // Transforma las coordenadas del centro de la pantalla al espacio del canvas
      let canvasCenterX = (screenCenterX - lerpedGlobalX - width / 2) / lerpedGlobalScale
      let canvasCenterY = (screenCenterY - lerpedGlobalY - height / 2) / lerpedGlobalScale
      canvasCenterX += random(-10, 10)
      canvasCenterY += random(-10, 10)
      let newPost = new Post(canvasCenterX, canvasCenterY, random(colors), random(0.3, 3))
      posts.push(newPost)
    })

  colorMode(HSB, 100, 100, 100)
  rectMode(CENTER, CENTER)
}

function draw() {
  background('#111')
  lerpedGlobalScale = lerp(lerpedGlobalScale, globalScale, 0.1)
  lerpedGlobalX = lerp(lerpedGlobalX, globalX, 0.2)
  lerpedGlobalY = lerp(lerpedGlobalY, globalY, 0.2)

  translate(width / 2, height / 2)
  translate(lerpedGlobalX, lerpedGlobalY)
  scale(lerpedGlobalScale)

  posts.forEach((post) => {
    post.draw()
    post.organize()
  })
}

function mouseWheel(e) {
  globalScale -= e.deltaY / 500
  if (globalScale < 0.1) {
    globalScale = 0.1
  }

  if (globalScale > 3) {
    globalScale = 3
  }
}

function mouseDragged(e) {
  globalX += mouseX - pmouseX
  globalY += mouseY - pmouseY
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
