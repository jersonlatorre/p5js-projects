let colors = ['#323232', '#FF5B65', '#FFA24B', '#FCDF5F', '#49D8EE', '#F5EFE7']

// let mx = 0, my = 0

class Content {
  constructor() {
    this.graphics = createGraphics(width, height)
  }

  draw() {
    let g = this.graphics
    g.background(30)
    g.noStroke()
    let n = 15
    for (let i = 0; i < n; i++) {
      g.fill(colors[i % 5])
      g.circle(width / 2, height / 2, map(i, 0, n, width * 1.3, width * 0.1))
    }

    // mx = lerp(mx, mouseX, 0.05)
    // my = lerp(my, mouseY, 0.05)
    // g.fill(40)
    // g.circle(mx, my, 350)
    // console.log(mx, my)

    g.circle(width / 2, height / 2, 250)
  }
}
