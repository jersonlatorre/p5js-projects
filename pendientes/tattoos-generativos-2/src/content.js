class Content {
  constructor() {
    this.graphics = createGraphics(width, height)
  }

  draw() {
    let g = this.graphics

    let f = 2
    g.push()
    g.translate(width / 2, height / 2)
    g.background('white')
    g.noFill()
    g.stroke('black')
    g.strokeWeight(4 * f)
    g.strokeJoin(MITER)
    
    // g.rectMode(CENTER)
    // g.square(0, 0, 120 * f)
    // g.square(0, 0, 100 * f)

    g.circle(0, 0, 120 * f)
    g.circle(0, 0, 100 * f)

    g.noStroke()
    g.fill(0)
    g.circle(0, 0, 40 * f)

    // g.stroke('black')
    // g.strokeWeight(3 * f)
    // g.noFill()
    // let N = 8
    // for (let i = 0; i < N; i++) {
    //   let angle = map(i, 0, N, 0, 2 * PI)
    //   let x1 = 28 * cos(angle) * f
    //   let y1 = 28 * sin(angle) * f
    //   let x2 = 33 * cos(angle) * f
    //   let y2 = 33 * sin(angle) * f
    //   g.line(x1, y1, x2, y2)
    // }

    g.pop()
  }
}
