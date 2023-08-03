const COLORS = [
  // '#323232', // negro
  '#FF5B65', // rojo
  '#FFA24B', // naranja
  '#FCDF5F', // amarillo
  '#49D8EE', // celeste
  '#F5EFE7', // blanco
]

const CHANGE_DISTANCE = 5
const WANDER_STRENGTH = 5
const MAX_STEER = 1
const MAX_SPEED = 3
const SEPARATED = true
const WANDERED = true

class NpcStateMove {
  constructor(parent) {
    this.parent = parent
  }

  draw() {
    // fill('yellow')
    // circle(this.parent.startPosition.x, this.parent.startPosition.y, Global.tileSize * this.parent.scale)
    // fill('yellow')
    // circle(this.parent.endPosition.x, this.parent.endPosition.y, Global.tileSize * this.parent.scale)

    let startIndex = this.parent.path[this.parent.currentIndex]
    let endIndex = this.parent.path[this.parent.currentIndex + 1]

    let startX = (startIndex % Global.game.tiles.length) * Global.tileSize + Global.tileSize / 2
    let startY =
      Math.floor(startIndex / Global.game.tiles.length) * Global.tileSize + Global.tileSize / 2
    let endX = (endIndex % Global.game.tiles.length) * Global.tileSize + Global.tileSize / 2
    let endY =
      Math.floor(endIndex / Global.game.tiles.length) * Global.tileSize + Global.tileSize / 2
    let start = createVector(startX, startY)
    let end = createVector(endX, endY)

    this.parent.addSeek({ targetPosition: end })
    // this.parent.addArrive({ targetPosition: end, arriveDistance: 100 })
    if (WANDERED) this.parent.addWander({strength: WANDER_STRENGTH})
    if (SEPARATED) this.parent.addSeparate({neighbors: Global.npcs})
    
    this.parent.update()
    let distance = this.parent.position.dist(end)
    if (distance < CHANGE_DISTANCE) {
      // this.parent.t = 0
      this.parent.currentIndex += 1
      if (this.parent.currentIndex >= this.parent.path.length - 1) {
        this.parent.changeState(new NpcStateDie(this.parent))
      } else {
      }
    }

    // this.parent.position = p5.Vector.lerp(start, end, this.parent.t)
    // this.parent.t += (this.speed * deltaTime) / 1000

    // if (this.parent.t > 1) {
    //   this.parent.t = 0
    //   this.parent.currentIndex += 1
    //   if (this.parent.currentIndex >= this.parent.path.length - 1) {
    //     // this.parent.initialize()
    //     this.parent.changeState(new NpcStateDie(this.parent))
    //   }
    // }

      push()
      fill(this.parent.color)
      noStroke()
      circle(this.parent.position.x, this.parent.position.y, this.parent.size)
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
    this.size = (Global.tileSize / 2) * random(0.2, 1)
    this.initialize()
    this.state = new NpcStateBorn(this)
  }

  changeState(state) {
    this.state = state
  }

  initialize() {
    let rand = random(0.4, 1)
    let c = color('#4D8C69')
    let r = red(c) * rand
    let g = green(c) * rand
    let b = blue(c) * rand
    this.color = color(r, g, b)

    if (random() > 0.9) {
      this.color = color('#FFCA8E')
    }


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
    } while (Global.game.tiles[cellI][cellJ] === 1 || distance < width / 2)

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
