class SteeringBehaviours {}
SteeringBehaviours.seek = function(agent, targetPosition, range) {
  if (!range) range = 99999999
  let distance = dist(agent.position.x, agent.position.y, targetPosition.x, targetPosition.y)
  if (distance < range) {
    return targetPosition.copy().sub(agent.position).normalize().mult(agent.maxSpeed)
  } else {
    return createVector()
  }
}

SteeringBehaviours.flee = function(agent, targetPosition, range) {
  if (!range) range = 99999999
  let sqDistance = range * range
  let sqDist = squaredDistance(agent.position.x, agent.position.y, targetPosition.x, targetPosition.y)
  if (sqDist < sqDistance) {
    return agent.position.copy().sub(targetPosition).normalize().mult(agent.maxSpeed)
  } else {
    return createVector()
  }
}

SteeringBehaviours.alignment = function(agent, neighbors, range) {
  let sqAlignmentDistance
  if (!range) {
    sqAlignmentDistance = 9999999
  } else {
    sqAlignmentDistance = range * range
  }

  let alignmentTotal = createVector()
  let alignmentCounter = 0

  for (let i = 0; i < neighbors.length; i++) {
    let neighbor = neighbors[i]
    let sqDistance = squaredDistance(agent.position.x, agent.position.y, neighbor.position.x, neighbor.position.y)

    if (sqDistance < sqAlignmentDistance) {
      alignmentTotal.add(neighbor.velocity)
      alignmentCounter++
    }
  }

  return alignmentCounter > 0 ? alignmentTotal.mult(1 / alignmentCounter) : createVector()
}

SteeringBehaviours.cohesion = function(agent, neighbors, range) {
  let sqCohesionDistance
  if (!range) {
    sqCohesionDistance = 9999999
  } else {
    sqCohesionDistance = range * range
  }

  let cohesionTotal = createVector()
  let cohesionCounter = 0

  for (let i = 0; i < neighbors.length; i++) {
    let neighbor = neighbors[i]
    let sqDistance = squaredDistance(agent.position.x, agent.position.y, neighbor.position.x, neighbor.position.y)

    if (sqDistance < sqCohesionDistance) {
      cohesionTotal.add(neighbor.position)
      cohesionCounter++
    }
  }

  return cohesionCounter > 0
    ? cohesionTotal.mult(1 / cohesionCounter).sub(agent.position).normalize().mult(agent.maxSpeed)
    : createVector()
}

SteeringBehaviours.wander = function(agent, distance, radius) {
  let center = agent.position.copy().add(agent.velocity.copy().normalize().mult(distance))
  let direction = p5.Vector.random2D().mult(radius)
  return center.add(direction).sub(agent.position).normalize().mult(agent.maxSpeed)
}

SteeringBehaviours.separate = function(agent, neighbors, distance) {
  let desiredSeparate = createVector()
  let separateCounter = 0
  let sqDistance = distance * distance

  for (let i = 0; i < neighbors.length; i++) {
    let neighbor = neighbors[i]
    let sqDist = squaredDistance(agent.position.x, agent.position.y, neighbor.position.x, neighbor.position.y)

    if (sqDist < sqDistance) {
      desiredSeparate.add(agent.position.copy().sub(neighbor.position))
      separateCounter++
    }
  }

  return desiredSeparate
}

function squaredDistance(x1, y1, x2, y2) {
  return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
}
