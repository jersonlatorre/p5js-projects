class Npc {
  constructor() {
    this.path = Pathfinding.dijkstra(Global.game.waypoints, 0, 99)
    
    if (this.path.lenght == 0) {
      throw new Error('No path found')
    }
    this.position = createVector()
    this.index = -1

    this.positionT = 0
    this.positionSpeed = 0.05
    this.checkNext()
  }

  checkNext() {
    this.index++
    if (this.index == this.path.length - 1) {
      this.index = 0
    }
    this.positionT = 0
  }

  draw() {
    // se hace un lerp entre indexStart e indexEnd
    this.position = p5.Vector.lerp(
      Global.game.points[this.path[this.index]].value,
      Global.game.points[this.path[this.index + 1]].value,
      this.positionT
    )

    this.positionT += this.positionSpeed

    // si se termina la animación, se busca el nuevo siguiente
    if (this.positionT > 1) {
      this.checkNext()
    }

    push()
    fill('red')
    noStroke()
    circle(this.position.x, this.position.y, 12)
    pop()
  }
}
