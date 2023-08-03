const numPoints = 50
const t = 3
let graph = new Map() // Usamos un Map para representar el grafo

let points = []

function setup() {
  createCanvas(400, 400)
  generatePoints()
  buildGreedySpanner()
}

function draw() {
  background(255)
  drawEdges()
}

function generatePoints() {
  for (let i = 0; i < numPoints; i++) {
    points.push(createVector(random(50, 350), random(50, 350)))
  }
}

function buildGreedySpanner() {
  let pairs = []
  for (let i = 0; i < numPoints; i++) {
    for (let j = i + 1; j < numPoints; j++) {
      let distance = p5.Vector.dist(points[i], points[j])
      pairs.push({ p1: i, p2: j, distance: distance })
    }
  }
  pairs.sort((a, b) => a.distance - b.distance)

  for (let pair of pairs) {
    let { p1, p2, distance } = pair
    if (!hasShortPath(p1, p2, distance * t)) {
      if (!graph.has(p1)) graph.set(p1, [])
      if (!graph.has(p2)) graph.set(p2, [])
      graph.get(p1).push({ node: p2, dist: distance })
      graph.get(p2).push({ node: p1, dist: distance })
    }
  }
}

function hasShortPath(start, end, maxDistance) {
  let distances = Array(numPoints).fill(Infinity)
  let visited = Array(numPoints).fill(false)
  distances[start] = 0
  let pq = [{ node: start, dist: 0 }]

  while (pq.length) {
    pq.sort((a, b) => a.dist - b.dist) // Esto podría ser más eficiente con un montículo
    let currentObj = pq.shift()
    let currentNode = currentObj.node

    if (currentNode === end && currentObj.dist <= maxDistance) return true

    visited[currentNode] = true
    if (graph.has(currentNode)) {
      for (let neighbor of graph.get(currentNode)) {
        if (
          !visited[neighbor.node] &&
          distances[currentNode] + neighbor.dist < distances[neighbor.node]
        ) {
          distances[neighbor.node] = distances[currentNode] + neighbor.dist
          pq.push({ node: neighbor.node, dist: distances[neighbor.node] })
        }
      }
    }
  }

  return distances[end] <= maxDistance
}

function drawEdges() {
  stroke(0)
  for (let [key, neighbors] of graph.entries()) {
    for (let neighbor of neighbors) {
      line(points[key].x, points[key].y, points[neighbor.node].x, points[neighbor.node].y)
    }
  }
}
