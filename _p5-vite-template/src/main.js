import p5 from 'p5'

new p5((p) => {
  p.setup = () => {
    p.createCanvas(600, 600)
  }

  p.draw = () => {
    p.background('blue')
  }
})
