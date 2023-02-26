let attractionDistance = 100
let killDistance = 10
let segmentLength = 10
let attractors = []

class Sketch {
  constructor() {
    for (let i = 0; i < 100; i++) {
      let x = random(-200, 200)
      let y = random(-200, 200)
      attractors.push(new Attractor(x, y, 100, 10))
    }

    this.tree = new Tree(300, 300)
  }

  draw(g) {
    g.clear()
    attractors.forEach((point) => {
      point.draw(g)
    })

    this.tree.draw(g)
  }
}

class Tree {
  constructor(x, y) {
    this.root = createVector(x, y)
    this.segments = []
    this.nodes = [this.root.copy()]
  }

  draw(g) {
    this.nodes.forEach((node) => {
      let neighbors = []
      attractors.forEach((attractor) => {
        let distance = node.sub(attractor.position).mag()
        if (distance < attractionDistance) {
          neighbors.push(attractor.position)
        }
      })

      let direction = createVector()
      neighbors.forEach((neighbor) => {
        direction.add(neighbor.sub(node).mult(1 / neighbors.length))
      })

      let newPosition = node.copy().add(direction)
      this.nodes.push(newPosition)
    })
  }
}

class Attractor {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  draw(g) {
    g.noStroke()
    g.stroke('yellow')
    g.strokeWeight(2)
    g.circle(this.x, this.y, 10)
  }
}
