let p1
let p2
let size = 30
let simplex

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

  simplex = new SimplexNoise()
}

function draw() {
  background('white')

  let nw = ceil(width / size)
  let nh = ceil(height / size)

  let ox = -0.5 * (nw * size - width)
  let oy = -0.5 * (nh * size - height)

  translate(ox, oy)

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
      let n = simplex.noise3D(i * 0.085, j * 0.085, millis() * 0.0005)
      n = map(n, -1, 1, 0, 1)
      // se obtiene la parte entera

      // dependiendo de qué número resulta, se dibuja una imagen diferente
      if (n < 0.35) image(p1, 0, 0)
      else image(p2, 0, 0)

      pop() // ------------------------------------------ termina dibujo
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}