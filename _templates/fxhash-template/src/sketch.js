let colors = ['#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#89ED8D']

class Sketch {
  constructor() {}

  draw(g) {
    g.push()
    g.translate(-g.width / 2, -g.height / 2)
    g.clear()
    g.circle(540, 540, 100)
    g.pop()
  }
}
