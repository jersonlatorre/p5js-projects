class Game {
  constructor() {
    Global.game = this
    this.tileMap = []
    this.points = []

    for (let row = 0; row < ROWS; row++) {
      this.tileMap[row] = []
      for (let col = 0; col < COLS; col++) {
        let r = random()
        let x, y
        if (r < 0.1) {
          this.tileMap[row][col] = 1
          x = row * CELL_SIZE + CELL_SIZE / 2
          y = col * CELL_SIZE + CELL_SIZE / 2
          this.points.push({ value: createVector(x, y), type: 'wall' })
        } else {
          this.tileMap[row][col] = 0
          x = row * CELL_SIZE + CELL_SIZE / 2
          y = col * CELL_SIZE + CELL_SIZE / 2
          this.points.push({ value: createVector(x, y), type: 'floor' })
        }
      }
    }

    this.waypoints = this.getAdjacencyMatrixFromMap()
    this.npc = new Npc()
  }

  draw() {
    this.drawMap()
    this.drawAdjacencyMap()
    // this.drawPoints()
    this.npc.draw()
  }

  drawMap() {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        let x = row * CELL_SIZE + CELL_SIZE / 2
        let y = col * CELL_SIZE + CELL_SIZE / 2
        if (this.tileMap[row][col] == 1) {
          push()
          fill('gray')
          noStroke()
          rectMode(CENTER)
          square(x, y, CELL_SIZE)
          pop()
        }
      }
    }
  }

  drawAdjacencyMap() {
    for (let m = 0; m < this.waypoints.length; m++) {
      for (let n = 0; n < this.waypoints[m].length; n++) {
        if (this.waypoints[m][n] != 0) {
          let cols = COLS

          // m -> [mi, mj]
          let mi = floor(m / cols)
          let mj = m % cols
          // n -> [ni, nj]
          let ni = floor(n / cols)
          let nj = n % cols

          let l = width / COLS

          push()
          strokeWeight(22)
          stroke('#999')
          line(mi * l + l / 2, mj * l + l / 2, ni * l + l / 2, nj * l + l / 2)
          pop()
        }
      }
    }
  }

  drawPoints() {
    for (let i = 0; i < this.points.length; i++) {
      let x = this.points[i].value.x
      let y = this.points[i].value.y

      if (this.points[i].type == 'floor') {

        push()
        fill('red')
        circle(x, y, 20)
        fill('white')
        textAlign(CENTER, CENTER)
        text(i, x, y)
        pop()
      }
    }
  }

  getAdjacencyMatrixFromMap() {
    // Tamaño del mapa
    const rows = this.tileMap.length
    const cols = this.tileMap[0].length
    const numNodes = rows * cols

    // Crear una matriz de adyacencia vacía
    const adjacencyMatrix = []
    for (let i = 0; i < numNodes; i++) {
      adjacencyMatrix[i] = []
      for (let j = 0; j < numNodes; j++) {
        adjacencyMatrix[i][j] = 0
      }
    }

    // Construir la matriz de adyacencia basada en el mapa
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // esa celda es un piso?
        if (this.tileMap[i][j] == 0) {
          let n1 = cols * i + j

          // se verifica en las 4 direcciones
          // arriba
          if (i > 0 && this.tileMap[i - 1][j] == 0) {
            let n2 = cols * (i - 1) + j
            adjacencyMatrix[n1][n2] = 1
          }
          // abajo
          if (i < rows - 1 && this.tileMap[i + 1][j] == 0) {
            let n2 = cols * (i + 1) + j
            adjacencyMatrix[n1][n2] = 1
          }
          // izquierda
          if (j > 0 && this.tileMap[i][j - 1] == 0) {
            let n2 = cols * i + (j - 1)
            adjacencyMatrix[n1][n2] = 1
          }
          // derecha
          if (j < cols && this.tileMap[i][j + 1] == 0) {
            let n2 = cols * i + (j + 1)
            adjacencyMatrix[n1][n2] = 1
          }
        }
      }
    }

    return adjacencyMatrix
  }
}
