function setup() {
  createCanvas(600, 600)
}

function draw() {
  background('blue')

  for (let i = 0; i < 100; i++) {
    circle(random(600), random(600), 20)  
  }
}
