import Global from './global.js'
import p from 'p5-easy'

export default class Cell {
  constructor(i, j) {
    this.i = i
    this.j = j
    this.walls = { top: true, right: true, bottom: true, left: true }
    this.visited = false
  }

  draw() {
    let w = Global.squareSize
    let x = this.i * w
    let y = this.j * w

    if (this.visited) {
      p.push()
      p.stroke('white')
      p.strokeCap(p.ROUND)
      p.strokeWeight(w * 0.09)
      if (this.walls.top) p.line(x, y, x + w, y)
      if (this.walls.right) p.line(x + w, y, x + w, y + w)
      if (this.walls.bottom) p.line(x + w, y + w, x, y + w)
      if (this.walls.left) p.line(x, y + w, x, y)
      p.pop()
    }
  }

  checkNeighbors() {
    let neighbors = []

    // top
    if (this.j - 1 >= 0 && !Global.grid[this.j - 1][this.i].visited) {
      neighbors.push(Global.grid[this.j - 1][this.i])
    }

    // right
    if (this.i + 1 < Global.grid[0].length && !Global.grid[this.j][this.i + 1].visited) {
      neighbors.push(Global.grid[this.j][this.i + 1])
    }

    // bottom
    if (this.j + 1 < Global.grid.length && !Global.grid[this.j + 1][this.i].visited) {
      neighbors.push(Global.grid[this.j + 1][this.i])
    }

    // left
    if (this.i - 1 >= 0 && !Global.grid[this.j][this.i - 1].visited) {
      neighbors.push(Global.grid[this.j][this.i - 1])
    }

    return p.random(neighbors)
  }
}
