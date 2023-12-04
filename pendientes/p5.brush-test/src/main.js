// We define our palette
let palette = ['#323232', '#FF5B65', '#FFA24B', '#FCDF5F', '#49D8EE', '#F5EFE7']

function setup() {
  createCanvas(600, 600, WEBGL)
  angleMode(DEGREES)
  background('white')

  // Activate the flowfield we're going to use
  brush.field('seabed')
}

function draw() {
  // frameRate(10)
  translate(-width / 2, -height / 2)

  // brush.box() returns an array with available brushes
  let available_brushes = brush.box()

  // Set the stroke to a random brush, color, and weight = 1
  // You set a brush like this: brush.set(name_brush, color, weight)
  brush.set(random(available_brushes), random(palette), 1)

  // Draw a random flowLine (x, y, length, direction)
  brush.flowLine(random(width), random(height), random(100, 200), random(0, 360))
}
