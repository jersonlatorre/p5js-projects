class Pathfinding {}

Pathfinding.dijkstra = (graph, start, end) => {
  if (start == end) {
    let path = []
    path.push(start)
    path.push(end)
    return path
  }

  // Inicializa valores
  let N = graph.length

  weights = []
  procedences = []
  blacklist = []

  for (let i = 0; i < N; i++) {
    weights[i] = 9999999
    procedences[i] = -1
    blacklist[i] = false
  }

  weights[start] = 0

  // Se repite esto N veces
  for (let count = 0; count < N - 1; count++) {
    // escoger nodo
    let minIndex = minDistance(weights, blacklist)
    blacklist[minIndex] = true

    // etiquetar vecinos
    for (let neighborIndex = 0; neighborIndex < N; neighborIndex++) {
      if (
        !blacklist[neighborIndex] &&
        graph[minIndex][neighborIndex] != 0 &&
        weights[minIndex] + graph[minIndex][neighborIndex] < weights[neighborIndex]
      ) {
        weights[neighborIndex] = weights[minIndex] + graph[minIndex][neighborIndex]
        procedences[neighborIndex] = minIndex
      }
    }
  }

  let path = []
  let pre = -1
  let current = end
  path.push(current)

  while (pre != start) {
    pre = procedences[current]
    path.push(pre)
    current = pre
  }

  path.reverse()
  return path

  function minDistance(weights, blacklist) {
    let min = 9999999
    let minIndex = 0

    for (let v = 0; v < blacklist.length; v++) {
      if (blacklist[v] == false && weights[v] <= min) {
        min = weights[v]
        minIndex = v
      }
    }

    return minIndex
  }
}

Pathfinding.getAdjacencyMatrixFromMap = (map) => {
  // Tamaño del mapa
  const rows = map.length
  const cols = map[0].length
  const numNodes = rows * cols

  // Crear una matriz de adyacencia vacía
  const adjacencyMatrix = []
  for (let i = 0; i < numNodes; i++) {
    adjacencyMatrix[i] = []
    for (let j = 0; j < numNodes; j++) {
      adjacencyMatrix[i][j] = 0
    }
  }

  // Construir la matriz de adyacencia basada en el mapa
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // esa celda es un piso?
      if (map[i][j] == 0) {
        let n1 = cols * i + j

        // se verifica en las 4 direcciones
        // arriba
        if (i > 0 && map[i - 1][j] == 0) {
          let n2 = cols * (i - 1) + j
          adjacencyMatrix[n1][n2] = 1
        }
        // abajo
        if (i < rows - 1 && map[i + 1][j] == 0) {
          let n2 = cols * (i + 1) + j
          adjacencyMatrix[n1][n2] = 1
        }
        // izquierda
        if (j > 0 && map[i][j - 1] == 0) {
          let n2 = cols * i + (j - 1)
          adjacencyMatrix[n1][n2] = 1
        }
        // derecha
        if (j < cols && map[i][j + 1] == 0) {
          let n2 = cols * i + (j + 1)
          adjacencyMatrix[n1][n2] = 1
        }
      }
    }
  }

  return adjacencyMatrix
}
