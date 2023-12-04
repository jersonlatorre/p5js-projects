import KDBush from 'kdbush'
import PoissonDiskSampling from 'poisson-disk-sampling'
import p5 from 'p5'

class Leaf {
  constructor(p, position) {
    this.p = p
    this.position = position
    this.reached = false
  }

  draw() {
    // let p = this.p
    // p.fill('black')
    // if (this.reached) p.fill('red')
    // p.noStroke()
    // p.circle(this.position.x, this.position.y, 2)
  }
}

class Branch {
  constructor(p, parent, position, direction) {
    this.p = p
    this.parent = parent
    this.childrens = []
    this.position = position.copy()
    this.direction = direction.copy()
    this.originDirection = direction.copy()
    this.count = 0
    this.setpSize = 1.5
    this.thickness = 0
  }

  reset() {
    this.direction = this.originDirection.copy()
    this.count = 0
  }

  next() {
    let direction = p5.Vector.mult(this.direction, this.setpSize)
    // let randomVector = p5.Vector.random2D()
    // direction.add(randomVector.mult(0.0))
    let nextPosition = p5.Vector.add(this.position, direction)
    let branch = new Branch(this.p, this, nextPosition, this.direction.copy())
    // this.childrens.push(branch)
    return branch
  }

  draw() {
    let p = this.p

    if (this.parent) {
      p.noFill()
      p.stroke('black')
      p.strokeWeight(this.thickness)
      p.line(this.position.x, this.position.y, this.parent.position.x, this.parent.position.y)
    }
  }
}

class Tree {
  constructor(p) {
    this.p = p
    this.leaves = []
    this.branches = []
    this.index = null

    let pds = new PoissonDiskSampling({
      shape: [600, 600],
      minDistance: 10,
      maxDistance: 10,
      tries: 10,
    })

    let points = pds.fill()
    points.forEach((point) => {
      let pointVector = p.createVector(point[0], point[1])
      this.leaves.push(new Leaf(p, pointVector))
    })
    console.log(this.leaves.length)

    for (let i = 0; i < 120; i++) {
      this.branches.push(
        new Branch(p, null, p.createVector(p.random(600), p.random(600)), p.createVector())
      )
    }
  }

  grow() {
    let p = this.p

    let index = new KDBush(
      this.branches,
      (branch) => branch.position.x,
      (branch) => branch.position.y,
      32,
      Int32Array
    )

    for (let i = 0; i < this.leaves.length; i++) {
      let leaf = this.leaves[i]
      let closestBranch = null
      let minDistance = 99999999

      let nearestBranches = index
        .within(leaf.position.x, leaf.position.y, 110)
        .map((id) => this.branches[id])

      for (let j = 0; j < nearestBranches.length; j++) {
        let branch = nearestBranches[j]
        let distance = p5.Vector.dist(branch.position, leaf.position)
        if (distance < 5) {
          leaf.reached = true
        } else if (distance < minDistance) {
          closestBranch = branch
          minDistance = distance
        }
      }

      if (closestBranch) {
        let newDirection = p5.Vector.sub(leaf.position, closestBranch.position).normalize()
        closestBranch.direction.add(newDirection)
        closestBranch.count++
      }
    }

    this.leaves.forEach((leaf, i) => {
      if (leaf.reached) this.leaves.splice(i, 1)
    })

    this.branches.forEach((branch) => {
      if (branch.childrens.length === 0) {
        branch.thickness = 0
        let node = branch
        while (node.parent) {
          node.parent.thickness = 1
          // node.parent.thickness = node.thickness + 0.05
          // node.parent.thickness = p.constrain(node.parent.thickness, 0, 5)
          node = node.parent
        }
      }
      if (branch.count > 0) {
        branch.direction.div(branch.count)
        this.branches.push(branch.next())
      }
      branch.reset()
    })
  }

  draw() {
    let p = this.p
    if (p.frameCount === 300) p.noLoop()
    this.leaves.forEach((leaf) => leaf.draw())
    this.branches.forEach((branch, i) => {
      branch.draw()
    })
  }
}

new p5((p) => {
  let tree

  p.setup = () => {
    p.createCanvas(600, 600)
    tree = new Tree(p)
  }

  p.draw = () => {
    p.background('white')
    tree.grow()
    tree.draw()
  }
})
