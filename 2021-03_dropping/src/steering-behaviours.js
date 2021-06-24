class SteeringBehaviours {}

SteeringBehaviours.seek = function(agent, targetPosition, seekRange) {
  let sqrDist = SteeringBehaviours.squaredDistance(targetPosition, agent.position)
  let desiredSeek = createVector()

  if (sqrDist < seekRange * seekRange) {
    desiredSeek = targetPosition.copy().sub(agent.position).normalize().mult(agent.maxSpeed)
  }

  return desiredSeek
}

SteeringBehaviours.arrive = function(agent, targetPosition, arriveDistance, actionRange) {
  let sqrDist = SteeringBehaviours.squaredDistance(targetPosition, agent.position)
  let desiredArrive = createVector()

  if (sqrDist < actionRange * actionRange) {
    if (sqrDist > arriveDistance * arriveDistance) {
      desiredArrive = SteeringBehaviours.seek(agent, targetPosition, 9999999)
    } else {
      let speed = map(sqrDist, 0, arriveDistance * arriveDistance, 0, agent.maxSpeed)
      desiredArrive = targetPosition.copy().sub(agent.position).normalize().mult(speed)
    }
  }

  return desiredArrive
}

SteeringBehaviours.flee = function(agent, targetPosition, fleeRange) {
  let sqrDist = SteeringBehaviours.squaredDistance(targetPosition, agent.position)
  let desiredFlee = createVector()

  if (sqrDist < fleeRange * fleeRange) {
    desiredFlee = agent.position.copy().sub(targetPosition).normalize().mult(agent.maxSpeed)
  }

  return desiredFlee
}

SteeringBehaviours.wander = function(agent, wanderDistance, wanderRadius) {
  let center = agent.position.copy().add(agent.velocity.copy().normalize().mult(wanderDistance))
  let direction = p5.Vector.random2D()
  let target = center.add(direction.mult(wanderRadius))
  let desired = target.sub(agent.position).normalize().mult(agent.maxSpeed)
  return desired
}

SteeringBehaviours.separate = function(agent, neighbors, separateRange) {
  let desiredSeparate = createVector()
  let squaredSeparatedRange = separateRange * separateRange

  neighbors.forEach((neighbor) => {
    if (
      abs(agent.position.x - neighbor.position.x) < separateRange &&
      abs(agent.position.y - neighbor.position.y) < separateRange
    ) {
      let sqrDist = SteeringBehaviours.squaredDistance(agent.position, neighbor.position)
      if (sqrDist < squaredSeparatedRange) {
        let speed = map(sqrDist, 0, squaredSeparatedRange, agent.maxSpeed, 0)
        let flee = agent.position.copy().sub(neighbor.position).normalize().mult(speed)
        desiredSeparate.add(flee)
      }
    }
  })

  return desiredSeparate
}

SteeringBehaviours.squaredDistance = function(p1, p2) {
  return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
}
