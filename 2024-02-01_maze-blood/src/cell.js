import Global from './global'
import p from 'p5-easy'

export default class Cell {
  constructor(i, j) {
    this.index = i + j * Global.numCells // Calcula el índice 1D
    this.i = i // Mantenemos las coordenadas x, y para referencia o cálculos visuales
    this.j = j
    this.t = 0
    this.tSpeed = p.random(0.001, 0.015)
    this.factor = 0
    this.visited = false
    this.color = p.random(Global.colors)
  }

  draw() {
    this.t += this.tSpeed
    if (this.t > 1) {
      this.t = 1
    }

    this.factor = p.lerp(0, 1, this.t * this.t)

    let nSquares = 2 * Global.numCells - 1
    let w = p.width / nSquares
    let x = 2 * this.i * w
    let y = 2 * this.j * w

    p.strokeWeight(1)
    p.stroke('black')
    p.fill('black')
    p.square(x, y, w * this.factor)
  }

  checkNeighbors() {
    let neighbors = []
    let x = this.i
    let y = this.j

    // Calcula los índices de los vecinos potenciales
    let top = (y - 1) * Global.numCells + x
    let right = y * Global.numCells + (x + 1)
    let bottom = (y + 1) * Global.numCells + x
    let left = y * Global.numCells + (x - 1)

    // Verifica si los vecinos están dentro de los límites y no han sido visitados
    if (y > 0 && Global.grid[top] && !Global.grid[top].visited) neighbors.push(Global.grid[top])
    if (x < Global.numCells - 1 && Global.grid[right] && !Global.grid[right].visited)
      neighbors.push(Global.grid[right])
    if (y < Global.numCells - 1 && Global.grid[bottom] && !Global.grid[bottom].visited)
      neighbors.push(Global.grid[bottom])
    if (x > 0 && Global.grid[left] && !Global.grid[left].visited) neighbors.push(Global.grid[left])

    return neighbors
  }
}
