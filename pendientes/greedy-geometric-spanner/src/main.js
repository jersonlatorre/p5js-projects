const numPoints = 200
const t = 2.5
let graph = new Map()
let points = []

function setup() {
  createCanvas(600, 600)
  generatePoints()
  buildGreedySpanner()
  colorMode(HSL)
}

function draw() {
  background(0)
  drawPoints()
  drawEdges()
  noLoop()
}

function drawPolygons() {
  for (let cycle of cycles) {
    beginShape()
    let hue = random(360)
    fill(hue, 100, 50)
    stroke(hue, 100, 50)

    for (let node of cycle) {
      vertex(points[node].x, points[node].y)
    }

    endShape(CLOSE)
  }
}

function generatePoints() {
  // Genera numPoints puntos aleatorios en el lienzo
  for (let i = 0; i < numPoints; i++) {
    let angle = random(0, TWO_PI)
    // let r = sqrt(random()) * width * 0.4
    let r = (atan(random(TWO_PI)) * width * 0.4) / sqrt(2)
    let x = width / 2 + r * cos(angle)
    let y = height / 2 + r * sin(angle)

    // let gap = 50
    // let x = random(gap, width - gap)
    // let y = random(gap, height - gap)

    points.push(createVector(x, y))
  }
}

function buildGreedySpanner() {
  let pairs = []
  // Calcula todas las distancias posibles entre los puntos
  for (let i = 0; i < numPoints; i++) {
    for (let j = i + 1; j < numPoints; j++) {
      let distance = p5.Vector.dist(points[i], points[j])
      pairs.push({ p1: i, p2: j, distance: distance })
    }
  }
  // Ordena las distancias en orden creciente
  pairs.sort((a, b) => a.distance - b.distance)

  // Agrega aristas al grafo si no existe un camino más corto entre los puntos
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
  // Verifica si existe un camino más corto entre start y end que maxDistance
  let distances = Array(numPoints).fill(Infinity)
  let visited = Array(numPoints).fill(false)
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

  return distances[end] <= maxDistance
}

function drawEdges() {
  // Dibuja las aristas del grafo
  stroke(0)
  for (let [key, neighbors] of graph.entries()) {
    for (let neighbor of neighbors) {
      push()
      stroke(255)
      strokeWeight(2)
      line(points[key].x, points[key].y, points[neighbor.node].x, points[neighbor.node].y)
      pop()
    }
  }
}

function drawPoints() {
  // Dibuja los puntos del grafo
  for (let point of points) {
    push()
    fill('white')
    noStroke()
    stroke(255)
    circle(point.x, point.y, 6)
    pop()
  }
}
