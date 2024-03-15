import Cell from './cell'
import Global from './global'
import { mapColorsShaderSrc } from './shaders/map-colors'
import p from 'p5-easy'

let connections = []
let stacks = []
let mapColorsShader
let heartImg
let explorersInitialized = false

p.preload = () => {
  heartImg = p.loadImage('../assets/heart.jpg')
  // heartImg = p.loadImage('../assets/maze.png')
}

p.setup = () => {
  p.createCanvas(540, 540, p.WEBGL)
  heartImg.resize(540, 540)

  // crea las celdas en un arreglo unidimensional
  for (let i = 0; i < Global.numCells * Global.numCells; i++) {
    let x = i % Global.numCells // Calcula la coordenada x basada en el índice 1D
    let y = Math.floor(i / Global.numCells) // Calcula la coordenada y basada en el índice 1D
    let nSquares = 2 * Global.numCells - 1
    let w = p.width / nSquares
    let posX = 2 * x * w
    let posY = 2 * y * w

    if (isValidCell(posX, posY)) {
      if (p.random() < Global.creationThreshold) {
        Global.grid[i] = new Cell(x, y)
      }
    }
  }

  // se espera 1 segundo antes de crear los exploradores
  setTimeout(() => {
    // crea los exploradores
    let startIndices = []
    for (let i = 0; i < Global.numExplorers; i++) {
      startIndices.push(Math.floor(p.random(Global.numCells * Global.numCells)))
    }

    startIndices.forEach((index) => {
      let startCell = Global.grid[index]
      while (!Global.grid[index] || Global.grid[index].visited) {
        index = Math.floor(p.random(Global.numCells * Global.numCells))
        startCell = Global.grid[index]
      }
      if (startCell) {
        let newStack = []
        newStack.push(startCell)
        startCell.visited = true
        stacks.push(newStack)
      }
    })

    explorersInitialized = true
  }, 1000)

  // inicializa el shader
  mapColorsShader = p.createFilterShader(mapColorsShaderSrc)
}

p.draw = () => {
  p.background('white')

  p.translate(-p.width / 2, -p.height / 2, 0)

  // dibuja las celdas
  for (let i = 0; i < Global.numCells * Global.numCells; i++) {
    if (Global.grid[i]) Global.grid[i].draw()
  }

  // dibuja las conexiones
  for (let i = 0; i < connections.length; i++) {
    let { i: ai, j: aj } = connections[i][0]
    let { i: bi, j: bj } = connections[i][1]
    let w = p.width / (2 * Global.numCells - 1)
    p.strokeWeight(1)
    p.stroke('black')
    p.fill('black')
    p.square(p.lerp(2 * ai * w, 2 * bi * w, 0.5), p.lerp(2 * aj * w, 2 * bj * w, 0.5), w)
  }

  // cada dos frames avanza el explorador
  if (p.frameCount % 2 == 0) {
    // algoritmo de backtracking
    stacks.forEach((stack) => {
      if (stack.length > 0) {
        let current = stack[stack.length - 1]
        let neighbors = current.checkNeighbors()
        if (neighbors.length > 0) {
          let next = p.random(neighbors)
          next.visited = true
          connectCells(current, next)
          stack.push(next)
        } else {
          stack.pop()
        }
      }
    })
  }

  applyFilters()

  // verifica si todos los exploradores han terminado su trabajo
  if (explorersInitialized && areAllStacksEmpty()) {
    p.noLoop()
  }
}

function applyFilters() {
  p.filter(p.BLUR, 3.2)
  p.filter(p.BLUR, 1)

  p.filter(mapColorsShader)

  p.filter(p.DILATE)
  p.filter(p.DILATE)
  p.filter(p.DILATE)
}

function connectCells(cell1, cell2) {
  connections.push([cell1, cell2])
}

function isValidCell(x, y) {
  let pixel = heartImg.get(x, y)
  let brightness = (pixel[0] + pixel[1] + pixel[2]) / 3
  return brightness < 50
}

function areAllStacksEmpty() {
  return stacks.every((stack) => stack.length === 0)
}
