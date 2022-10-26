class Agent {
  constructor(x, y, z) {
    this.position = createVector(x, y, z)
    this.velocity = createVector()
    this.acceleration = createVector()
    this.maxSpeed = 5
    this.maxSteer = 0.5
  }

  addSeek(params) {
    let targetPosition = params?.targetPosition
    let range = params?.range || 9999
    let factor = params?.factor || 1

    let distance = this.position.copy().sub(targetPosition).mag()
    if (distance < range) {
      let desired = targetPosition.copy().sub(this.position).normalize().mult(this.maxSpeed)
      let steerForce = desired.sub(this.velocity).limit(this.maxSteer)
      this.velocity.add(steerForce.mult(factor))
    }
  }

  addFlee(params) {
    let targetPosition = params?.targetPosition
    let range = params?.range || 9999
    let factor = params?.factor || 1

    let distance = this.position.copy().sub(targetPosition).mag()
    if (distance < range) {
      let desired = this.position.copy().sub(targetPosition).normalize().mult(this.maxSpeed)
      let steerForce = desired.sub(this.velocity).limit(this.maxSteer)
      this.velocity.add(steerForce.mult(factor))
    }
  }

  addInsideRectangle(params) {
    let x = params?.x || 0
    let y = params?.y || 0
    let w = params?.w || width
    let h = params?.h || height
    let factor = params?.factor || 1

    if (!(this.position.x > x && this.position.x < x + w && this.position.y > y && this.position.y < y + h)) {
      let center = createVector(x + w / 2, y + h / 2)
      let steerForce = center.sub(this.position).normalize().mult(this.maxSpeed)
      this.velocity.add(steerForce.mult(factor))
    }
  }

  addWander(params) {
    let ratio = params?.ratio || 1
    let factor = params?.factor || 1

    let center = this.position.copy().add(this.velocity.copy().normalize())
    let direction = p5.Vector.random2D()
    let target = center.add(direction.div(ratio))
    let desired = target.sub(this.position).normalize().mult(this.maxSpeed)
    let steerForce = desired.sub(this.velocity).limit(this.maxSteer)
    this.velocity.add(steerForce.mult(factor))
  }

  addSeparate(params) {
    let neighbors = params?.neighbors
    let separatedistance = params?.separateDistance
    let steer = createVector()
    let factor = params?.factor || 1
    let count = 0

    neighbors.forEach((neighbor) => {
      let distance = this.position.copy().sub(neighbor.position).mag()
      if (distance > 0 && distance < separatedistance) {
        let diff = this.position.copy().sub(neighbor.position)
        diff.normalize()
        diff.div(distance)
        steer.add(diff)
        count++
      }
    })

    if (count > 0) {
      steer.div(count)
      steer.normalize()
      steer.mult(this.maxSpeed)
      steer.sub(this.velocity)
      steer.limit(this.maxSteer)
    }
    this.velocity.add(steer.mult(factor))
  }
}

// SteeringBehaviours.alignment = function (agent, neighbors, range) {
//   let sqAlignmentDistance
//   if (!range) {
//     sqAlignmentDistance = 9999999
//   } else {
//     sqAlignmentDistance = range * range
//   }

//   let alignmentTotal = createVector()
//   let alignmentCounter = 0

//   for (let i = 0; i < neighbors.length; i++) {
//     let neighbor = neighbors[i]
//     let sqDistance = SteeringBehaviours.squaredDistance(
//       agent.position.x,
//       agent.position.y,
//       neighbor.position.x,
//       neighbor.position.y
//     )

//     if (sqDistance < sqAlignmentDistance) {
//       alignmentTotal.add(neighbor.velocity)
//       alignmentCounter++
//     }
//   }

//   return alignmentCounter > 0 ? alignmentTotal.mult(1 / alignmentCounter) : createVector()
// }

// SteeringBehaviours.cohesion = function (agent, neighbors, range) {
//   let sqCohesionDistance
//   if (!range) {
//     sqCohesionDistance = 9999999
//   } else {
//     sqCohesionDistance = range * range
//   }

//   let cohesionTotal = createVector()
//   let cohesionCounter = 0

//   for (let i = 0; i < neighbors.length; i++) {
//     let neighbor = neighbors[i]
//     let sqDistance = SteeringBehaviours.squaredDistance(
//       agent.position.x,
//       agent.position.y,
//       neighbor.position.x,
//       neighbor.position.y
//     )

//     if (sqDistance < sqCohesionDistance) {
//       cohesionTotal.add(neighbor.position)
//       cohesionCounter++
//     }
//   }

//   return cohesionCounter > 0
//     ? cohesionTotal
//         .mult(1 / cohesionCounter)
//         .sub(agent.position)
//         .normalize()
//         .mult(agent.maxSpeed)
//     : createVector()
// }

// SteeringBehaviours.squaredDistance = function (p1, p2) {
//   return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
// }

// SteeringBehaviours.steer = function (agent, desired) {
//   return desired.copy().sub(agent.velocity).limit(agent.maxSteer)
// }
