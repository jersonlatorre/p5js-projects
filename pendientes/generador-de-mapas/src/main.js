let COLS = 10
let ROWS = 10
let CELL_SIZE = 50

function setup() {
  createCanvas(COLS * CELL_SIZE, ROWS * CELL_SIZE)
  game = new Game()
}

function draw() {
  background('white')
  game.draw()
}
