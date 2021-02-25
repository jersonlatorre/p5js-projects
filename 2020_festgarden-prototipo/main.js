let posts = []
let globalScale = 1
let globalX = 0
let globalY = 0
let lerpedGlobalScale = 1
let lerpedGlobalX = 1
let lerpedGlobalY = 1

let colors = [ '#EF476F', '#FFD166', '#06D6A0', '#118AB2' ]

function setup() {
  createCanvas(windowWidth, windowHeight)
  setAttributes('antialias', true)
  setAttributes('depth', true)

  createButton('+').position(10, 10).size(50, 50).mousePressed(() => {
    posts.push(new Post(random(-100, 100), random(-100, 100), random(colors), random(0.3, 3)))
  })

  for (let i = 0; i < 10; i++) {
    // posts.push(new Post(random(-100, 100), random(-100, 100), random(colors), random(0.3, 3)))
  }

  colorMode(HSB, 100, 100, 100)
  rectMode(CENTER, CENTER)
}

function draw() {
  background(95)
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