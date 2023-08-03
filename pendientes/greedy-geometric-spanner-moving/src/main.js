const T = 2.5
const GAP = 100
const N = 600
let graph = new Map()
let points = []
let memo = {}

function setup() {
  createCanvas(1080, 1080)
  generatePoints()
  buildGreedySpanner()
  removeNodesWithOnlyOneNeighbor()
  // colorMode(HSL)
}

function draw() {
  background('white')
  drawEdges()
  drawPoints()
  // noLoop()
}

function generatePoints() {
  // let gap = GAP
  // let p = new PoissonDiskSampling({
  //   shape: [width - 2 * gap, width - 2 * gap],
  //   minDistance: (width - 2 * gap) / 40,
  // })
  // points = p.fill().map((point) => new Point(point[0] + gap, point[1] + gap))
  // return
  
  // let gap = GAP
  // for (let i = 0; i < N; i++) {
  //   let x = random(gap, width - gap)
  //   let y = random(gap, height - gap)
  //   points.push(new Point(x, y))
  // }
  // return

  for (let i = 0; i < N; i++) {
    let angle = random(0, TWO_PI)
    // let r = sqrt(random()) * width * 0.4
    // let r = (1 - random(random(random(random())))) * width * 0.3
    let r = (1 - random(random(random()))) * (width - 2 * GAP) * 0.5
    let x = width / 2 + r * cos(angle)
    let y = height / 2 + r * sin(angle)
    points.push(new Point(x, y))
  }
  return
}

function getLeafNodes() {
  let leafNodes = []

  for (let [key, neighbors] of graph.entries()) {
    if (neighbors.length === 1) {
      leafNodes.push(key)
    }
  }

  return leafNodes
}

function removeNodesWithOnlyOneNeighbor() {
  let hasSingleNeighborNodes = true

  while (hasSingleNeighborNodes) {
    let leafNodes = getLeafNodes()

    if (leafNodes.length === 0) {
      hasSingleNeighborNodes = false
      continue
    }

    for (let node of leafNodes) {
      let neighbor = graph.get(node)[0]
      graph.delete(node)

      // Ahora debemos eliminar la referencia de este nodo en sus vecinos.
      if (graph.has(neighbor.node)) {
        let neighborsOfNeighbor = graph.get(neighbor.node)
        let indexToRemove = neighborsOfNeighbor.findIndex((n) => n.node === node)
        if (indexToRemove !== -1) {
          neighborsOfNeighbor.splice(indexToRemove, 1)
        }

        // Si después de remover la referencia, el vecino tiene solo un vecino, lo marcamos para eliminación en la próxima iteración del bucle.
        if (neighborsOfNeighbor.length === 1) {
          // No eliminamos directamente para no interferir con la lista de leafNodes actual.
          continue
        } else if (neighborsOfNeighbor.length === 0) {
          graph.delete(neighbor.node)
        }
      }
    }
  }
}

function buildGreedySpanner() {
  let pairs = []
  // Calcula todas las distancias posibles entre los puntos
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let distance = dist(points[i].x, points[i].y, points[j].x, points[j].y)
      if (distance < width / 3) {
        pairs.push({ p1: i, p2: j, distance: distance })
      }
    }
  }
  // Ordena las distancias en orden creciente
  pairs.sort((a, b) => a.distance - b.distance)

  // Agrega aristas al grafo si no existe un camino más corto entre los puntos
  for (let pair of pairs) {
    let { p1, p2, distance } = pair
    if (!hasShortPath(p1, p2, distance * T)) {
      if (!graph.has(p1)) graph.set(p1, [])
      if (!graph.has(p2)) graph.set(p2, [])
      graph.get(p1).push({ node: p2, dist: distance })
      graph.get(p2).push({ node: p1, dist: distance })
    }
  }
}

function hasShortPath(start, end, maxDistance) {
  let key = start + '-' + end
  if (memo[key] !== undefined) return memo[key]

  // Verifica si existe un camino más corto entre start y end que maxDistance
  let distances = Array(points.length).fill(Infinity)
  let visited = Array(points.length).fill(false)
  distances[start] = 0
  let heap = new MinHeap()
  heap.insert({ node: start, dist: 0 })

  while (heap.array.length > 0) {
    let currentObj = heap.extractMin()
    let currentNode = currentObj.node

    if (visited[currentNode]) continue
    if (currentNode === end && currentObj.dist <= maxDistance) return true

    visited[currentNode] = true

    if (graph.has(currentNode)) {
      for (let neighbor of graph.get(currentNode)) {
        let newDist = currentObj.dist + neighbor.dist
        if (!visited[neighbor.node] && newDist < distances[neighbor.node]) {
          distances[neighbor.node] = newDist
          heap.insert({ node: neighbor.node, dist: newDist })
        }
      }
    }
  }

  memo[key] = distances[end] <= maxDistance
  return distances[end] <= maxDistance
}

function drawEdges() {
  // Dibuja las aristas del grafo
  stroke('black')
  strokeWeight(2)
  for (let [key, neighbors] of graph.entries()) {
    let startPoint = points[key]
    for (let neighbor of neighbors) {
      let endPoint = points[neighbor.node]

      // let midpointX = (startPoint.x + endPoint.x) / 2
      // let midpointY = (startPoint.y + endPoint.y) / 2
      // let distanceToCenter = constrain(
      //   dist(midpointX, midpointY, width / 2, height / 2),
      //   0,
      //   width / 2 - GAP
      // )
      // let weight = map(distanceToCenter, 0, width / 2 - GAP, width * 0.01, 1)

      let distance = dist(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
      let maxDistance = width * 0.05
      distance = constrain(distance, 0, maxDistance)
      let weight = map(distance, 0, maxDistance, width * 0.007, 1.5)

      strokeWeight(weight)
      // strokeWeight(1)
      line(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
    }
  }
}

function drawPoints() {
  // Dibuja los puntos del grafo
  for (let point of points) {
    point.draw()
  }
}
