let theFilter

function preload() {
  theFilter = loadShader('src/filter.vert', 'src/filter.frag')
}

function setup() {
  createCanvas(600, 600)
  game = new Game()
}

function draw() {
  game.draw()
  filterShader(theFilter)
}
