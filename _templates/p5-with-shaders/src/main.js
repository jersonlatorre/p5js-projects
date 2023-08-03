let theFilter

function preload() {
  theFilter = loadShader('shaders/filter.vert', 'shaders/filter.frag')
}

function setup() {
  createCanvas(600, 600)
}

function draw() {
  background('blue')
  circle(300, 300, 200)
  filterShader(theFilter)
}
