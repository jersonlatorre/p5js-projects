const COLORS = [
  // '#323232', // negro
  '#FF5B65', // rojo
  '#FF5B65', // rojo
  '#FFA24B', // naranja
  '#FFA24B', // naranja
  '#FCDF5F', // amarillo
  '#FCDF5F', // amarillo
  '#49D8EE', // celeste
  '#49D8EE', // celeste
  '#F5EFE7', // blanco
]

const CHANGE_DISTANCE = 20
const WANDER_STRENGTH = 5
const MAX_STEER = 10
const MAX_SPEED = 5
const WANDERED = true
const SEPARATED = false

class NpcStateMove {
  constructor(parent) {
    this.parent = parent
  }

  draw() {
    let endIndex = this.parent.path[this.parent.currentIndex + 1]
    let endX = (endIndex % Global.game.tiles.length) * Global.tileSize + Global.tileSize / 2
    let endY =
      Math.floor(endIndex / Global.game.tiles.length) * Global.tileSize + Global.tileSize / 2
    let end = createVector(endX, endY)

    this.parent.addSeek({ targetPosition: end })
    if (WANDERED) this.parent.addWander({ strength: WANDER_STRENGTH })
    if (SEPARATED) this.parent.addSeparate({ neighbors: Global.npcs })

    this.parent.update()
    this.parent.history.push(this.parent.position.copy())
    if (this.parent.history.length == 100) {
      this.parent.history.splice(0, 1)
    }

    let distance = this.parent.position.dist(end)
    if (distance < CHANGE_DISTANCE) {
      this.parent.currentIndex += 1
      if (this.parent.currentIndex >= this.parent.path.length - 1) {
        this.parent.history = []
        this.parent.changeState(new NpcStateDie(this.parent))
      } else {
      }
    }

    push()
    fill(this.parent.color)
    stroke(this.parent.color)
    strokeWeight(this.parent.size)
    
    for (let i = 0; i < this.parent.history.length - 2; i++) {
      let start = this.parent.history[i]
      let end = this.parent.history[i + 1]
      line(start.x, start.y, end.x, end.y)
    }
    pop()
  }
}

class NpcStateBorn {
  constructor(parent) {
    this.parent = parent

    this.t = 0
    this.tSpeed = 3
  }

  draw() {
    let scale = lerp(0, 1, this.t)
    this.t += (this.tSpeed * deltaTime) / 1000
    if (this.t > 1) {
      this.parent.changeState(new NpcStateMove(this.parent))
    }

    push()
    noStroke()
    fill(this.parent.color)
    circle(this.parent.startPosition.x, this.parent.startPosition.y, this.parent.size * scale)
    pop()
  }
}

class NpcStateDie {
  constructor(parent) {
    this.parent = parent

    this.t = 0
    this.tSpeed = 3
  }

  draw() {
    let scale = lerp(1, 0, this.t)
    this.t += (this.tSpeed * deltaTime) / 1000
    if (this.t > 1) {
      this.parent.initialize()
      this.parent.changeState(new NpcStateBorn(this.parent))
    }

    push()
    fill(this.parent.color)
    noStroke()
    circle(this.parent.endPosition.x, this.parent.endPosition.y, this.parent.size * scale)
    pop()
  }
}

class Npc extends Agent {
  constructor() {
    super()
    this.maxSteer = MAX_STEER
    this.maxSpeed = MAX_SPEED
    this.size = (Global.tileSize / 2) * random(0.1, 2)
    this.history = []
    this.initialize()
    this.state = new NpcStateBorn(this)
  }

  changeState(state) {
    this.state = state
  }

  initialize() {
    this.color = random(COLORS)

    let cellI, cellJ, cellX, cellY, distance
    do {
      this.startCellIndex = random(Global.game.adjacencyMatrix.length) | 0
      cellJ = this.startCellIndex % Global.game.tiles.length
      cellI = Math.floor(this.startCellIndex / Global.game.tiles.length)
    } while (Global.game.tiles[cellI][cellJ] === 1)

    cellX = cellJ * Global.tileSize + Global.tileSize / 2
    cellY = cellI * Global.tileSize + Global.tileSize / 2
    this.startPosition = createVector(cellX, cellY)

    do {
      this.endCellIndex = random(Global.game.adjacencyMatrix.length) | 0
      cellJ = this.endCellIndex % Global.game.tiles.length
      cellI = Math.floor(this.endCellIndex / Global.game.tiles.length)

      // Calculate Euclidean distance
      distance = dist(cellX, cellY, cellJ * Global.tileSize, cellI * Global.tileSize)
    } while (Global.game.tiles[cellI][cellJ] === 1 || distance < width / 6)

    cellX = cellJ * Global.tileSize + Global.tileSize / 2
    cellY = cellI * Global.tileSize + Global.tileSize / 2
    this.endPosition = createVector(cellX, cellY)

    this.position = this.startPosition.copy()
    this.t = 0
    this.path = Pathfinding.dijkstra(
      Global.game.adjacencyMatrix,
      this.startCellIndex,
      this.endCellIndex
    )
    this.currentIndex = 0
  }

  draw() {
    this.state.draw()
  }
}
