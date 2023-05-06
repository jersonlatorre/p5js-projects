class Content {
  constructor() {
    this.graphics = createGraphics(width, height)
  }

  draw() {
    let g = this.graphics

    let f = 4
    g.push()
    g.translate(0, -40)
    g.translate(width / 2, height / 2)
    g.background('white')
    g.noFill()
    g.stroke('black')
    g.strokeWeight(4 * f)
    g.strokeJoin(MITER)
    
    g.rectMode(CENTER)
    g.circle(0, 0, 120 * f)
    g.circle(0, 0, 100 * f)
    g.circle(0, 0, 80 * f)
    // g.circle(0, 0, 60 * f)
    
    g.noStroke()
    g.fill(0)
    g.circle(0, 0, 40 * f)
    
    g.pop()
  }
}
