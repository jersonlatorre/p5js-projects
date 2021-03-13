let p1
let p2
let size = 30

// se precargan las imágenes
function preload() {
  p1 = loadImage('assets/p1.png')
  p2 = loadImage('assets/p2.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  // frameRate(5)
  p1.resize(size, size)
  p2.resize(size, size)
}

function draw() {
  background('white')

  let nw = ceil(width / size)
  let nh = ceil(height / size)

  let ox = -0.5 * (nw * size - width)
  let oy = -0.5 * (nh * size - height)

  translate(ox, oy)

  console.log(ox, oy)

  // se hace un doble for para dibujar una rejilla
  for (let i = 0; i <= nw; i = i + 1) {
    for (let j = 0; j <= nh; j = j + 1) {
      // se protege el dibujo con push y pop
      push() // ----------------------------------------- inicia dibujo

      // se traslada el puntero
      translate(size * i, size * j)
      noFill()

      // se calcula un valor aleatorio
      // let n = random()
      let n = noise(i * 0.2, j * 0.2, millis() * 0.001)

      // se obtiene la parte entera

      // dependiendo de qué número resulta, se dibuja una imagen diferente
      if (n < 0.5) image(p1, 0, 0)
      else image(p2, 0, 0)

      pop() // ------------------------------------------ termina dibujo
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}