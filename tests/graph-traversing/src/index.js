import Graph from './graph-adjacency-matrix'
import Queue from './queue'
import Stack from './stack'
import p from 'p5-easy'

let graph = new Graph()
fillGraph()

p.setup = () => {
  p.createCanvas(500, 500)
  p.background('lightblue')
  p.textAlign(p.CENTER)
  p.text('Recorrido DFS y BFS', p.width / 2, p.height / 2 - 10)
  p.text('(ver la consola)', p.width / 2, p.height / 2 + 10)

  // se recorre el grafo en DFS y BFS
  printTraverseDFS()
  printTraverseBFS()
}

// no se dibuja nada
p.draw = () => {}

function fillGraph() {
  // se crean 8 nodos
  for (let i = 0; i < 8; i++) {
    graph.addNode({ value: i })
  }

  // se crean las conexiones aleatoriamente
  for (let i = 0; i < graph.nodes.length; i++) {
    for (let j = 0; j < graph.nodes.length; j++) {
      if (i === j) continue
      if (p.random() < 0.5) {
        graph.addConnection(i, j)
      }
    }
  }
}

/*
  recorrido de un grafo en profundidad (Depth-First Search)
*/
function printTraverseDFS() {
  console.log('Recorrido DFS:')
  let stack = new Stack()

  // se inicializa con el primer nodo
  stack.push(0)
  // conjunto de nodos visitados
  let visited = new Set()

  // mientras la pila no este vacia
  while (stack.size() > 0) {
    // 1. se desapila y valida
    let currentNode = stack.pop()
    if (visited.has(currentNode)) continue

    // 2. se procesa
    console.log(currentNode)
    visited.add(currentNode)

    // 3. se apilan los vecinos no visitados
    let neighbors = graph.getNeighbors(currentNode)
    for (let i = 0; i < neighbors.length; i++) {
      if (!visited.has(neighbors[i])) {
        stack.push(neighbors[i])
      }
    }
  }
}

/*
  recorrido de un grafo en anchura (Breadth-First Search)
*/
function printTraverseBFS() {
  console.log('Recorrido BFS:')
  let queue = new Queue()

  // se inicializa con el primer nodo
  queue.enqueue(0)
  // conjunto de nodos visitados
  let visited = new Set()

  // mientras la pila no este vacia
  while (queue.size() > 0) {
    // 1. se desencola y valida
    let currentNode = queue.dequeue()
    if (visited.has(currentNode)) continue

    // 2. se procesa
    console.log(currentNode)
    visited.add(currentNode)

    // 3. se encolan los vecinos no visitados
    let neighbors = graph.getNeighbors(currentNode)
    for (let i = 0; i < neighbors.length; i++) {
      if (!visited.has(neighbors[i])) {
        queue.enqueue(neighbors[i])
      }
    }
  }
}
