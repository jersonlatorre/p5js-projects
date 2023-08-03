class Game {
  constructor() {
    Global.game = this
    this.tiles = generateMaze(21)
    this.adjacencyMatrix = Pathfinding.getAdjacencyMatrixFromMap(this.tiles)
    Global.tileSize = width / this.tiles.length
    Global.npcs = Array.from({ length: 10 }, () => new Npc())
  }

  draw() {
    // background('#666')
    clear()
    // blendMode(SUBSTRACT)
    // fill(10, 10)
    // noStroke()
    // rect(0, 0, width, height)
    // blendMode(BLEND)

    // // dibuja los tiles
    // for (let i = 0; i < this.tiles.length; i++) {
    //   for (let j = 0; j < this.tiles[i].length; j++) {
    //     if (this.tiles[i][j] === 1) {
    //       push()
    //       fill(255)
    //       stroke(255)
    //       noStroke()
    //       let x = j * Global.tileSize
    //       let y = i * Global.tileSize
    //       rect(x, y, Global.tileSize, Global.tileSize)
    //       pop()
    //     }
    //   }
    // }

    // // dibuja el grafo a partir de la matriz de adjacencia
    // for (let i = 0; i < this.adjacencyMatrix.length; i++) {
    //   for (let j = 0; j < this.adjacencyMatrix[i].length; j++) {
    //     if (this.adjacencyMatrix[i][j] === 1) {
    //       // i y j son indices que van de 0 a 120
    //       // se deben convertir a coordenadas de las celdas del mapa
    //       let ix = (i % this.tiles.length) * Global.tileSize + Global.tileSize / 2
    //       let iy = Math.floor(i / this.tiles.length) * Global.tileSize + Global.tileSize / 2
    //       let jx = (j % this.tiles.length) * Global.tileSize + Global.tileSize / 2
    //       let jy = Math.floor(j / this.tiles.length) * Global.tileSize + Global.tileSize / 2
    //       push()
    //       stroke(255)
    //       strokeWeight(2)
    //       line(ix, iy, jx, jy)
    //       pop()
    //     }
    //   }
    // }

    for (let npc of Global.npcs) npc.draw()
  }
}
