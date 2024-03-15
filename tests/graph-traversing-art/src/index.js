import Graph from './graph-adjacency-matrix'
import p from 'p5-easy'

// se crean los puntos separados a una distancia minima de 40
// en el rectangulo con x:30, y:30, width:440 y height:440
let points = p.createPoissonDiskSamples(30, 30, 440, 440, 15)

// se crea el grafo vacío
let graph = new Graph()

// se llena el grafo
fillGraph()

let stack = []
let visited = []

// se agrega el primer punto
  stack.push(0)

p.setup = () => {
  p.createCanvas(500, 500)
}

p.draw = () => {
  p.background('lightblue')

  // se dibuja el grafo
  drawGraph()

  

  if (stack.length > 0) {
    // desapilar
    let currentNode = stack.pop()
    // procesar
    visited.push(currentNode)
    // apilar vecinos no visitados
    let neighbors = graph.getNeighbors(currentNode)
    for (let i = 0; i < neighbors.length; i++) {
      if (!visited.includes(neighbors[i])) {
        stack.push(neighbors[i])
      }
    }
  } else {
    p.noLoop()
  }
}

function fillGraph() {
  // agrega los nodos a partir de los puntos generados
  for (let i = 0; i < points.length; i++) {
    graph.addNode({ value: i, x: points[i].x, y: points[i].y })
  }

  // agrega las aristas segun la distancia
  for (let i = 0; i < graph.nodes.length; i++) {
    for (let j = 0; j < graph.nodes.length; j++) {
      if (i === j) continue
      let distance = p.dist(graph.nodes[i].x, graph.nodes[i].y, graph.nodes[j].x, graph.nodes[j].y)
      if (distance < 18) {
        graph.addConnection(i, j)
      }
    }
  }
}

function drawGraph() {
  // dibuja las aristas
  for (let i = 0; i < graph.nodes.length; i++) {
    for (let j = 0; j < graph.nodes.length; j++) {
      if (graph.areConnected(i, j)) {
        p.push()
        p.stroke('black')
        p.strokeWeight(2)
        p.line(graph.nodes[i].x, graph.nodes[i].y, graph.nodes[j].x, graph.nodes[j].y)
        p.pop()
      }
    }
  }

  // dibuja los nodos
  for (let i = 0; i < graph.nodes.length; i++) {
    p.push()
    p.fill('white')
    if (visited.includes(i)) {
      p.fill('red')
    }
    p.circle(graph.nodes[i].x, graph.nodes[i].y, 10)
    p.textSize(15)
    p.textAlign(p.CENTER, p.CENTER)
    p.fill('black')
    // p.text(graph.nodes[i].value, graph.nodes[i].x, graph.nodes[i].y)
    p.pop()
  }
}
