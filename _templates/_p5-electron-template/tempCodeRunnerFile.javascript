// prepara a la consola para poder recibir teclas como entrada
require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})
process.stdin.on('keypress', onKeyPress)

// realiza acciones según la tecla presionada
function onKeyPress(ch, key) {
  if (key.name == 'left') {
    moverIzquierda()
  }
  if (key.name == 'right') {
    moverDerecha()
  }
  if (key.name == 'up') {
    moverArriba()
  }
  if (key.name == 'down') {
    moverAbajo()
  }
}

// funciones de movimiento
function moverIzquierda() {
  if (map[personaje.y][personaje.x - 1] == 0) {
    personaje.x -= 1
    imprimir()
  }
}
function moverDerecha() {
  if (map[personaje.y][personaje.x + 1] == 0) {
    personaje.x += 1
    imprimir()
  }
}

function moverArriba() {
  if (map[personaje.y - 1][personaje.x] !== 1) {
    personaje.y -= 1
    imprimir()
  }
}

function moverAbajo() {
  if (map[personaje.y + 1][personaje.x] == 0) {
    personaje.y += 1
    imprimir()
  }
}
// mapa general
// 0: piso, 1: pared
let map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

// propiedades del personaje
let personaje = {
  x: 3,
  y: 3,
  forma: '😃',
}

// imprime el juego en consola
function imprimir() {
  console.clear()
  for (let fila = 0; fila < map.length; fila++) {
    for (let columna = 0; columna < map[fila].length; columna++) {
      if (columna == personaje.x && fila == personaje.y) {
        process.stdout.write(personaje.forma)
      } else if (map[fila][columna] == 0) {
        process.stdout.write('⬜')
      }
      if (map[fila][columna] == 1) {
        process.stdout.write('🟫')
      }
    }
    process.stdout.write('\n')
  }
}

imprimir()
