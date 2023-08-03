function setup() {
  createCanvas(600, 600, WEBGL)
  game = new Game()
}

function draw() {
  translate(-width / 2, -height / 2)
  game.draw()
}
