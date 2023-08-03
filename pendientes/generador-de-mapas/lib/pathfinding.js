class Pathfinding {}

Pathfinding.dijkstra = function(graph, start, end) {
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

  while (current != start) {
    pre = procedences[current]
    if (pre === -1) {
      return [start, start]
      // throw new Error('No path exists between start and end nodes.')
    }
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
