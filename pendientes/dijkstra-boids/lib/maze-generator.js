function generateMaze(size) {
  const DIRECTIONS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]

  let map = Array(size)
    .fill(null)
    .map(() => Array(size).fill(1))

  let start = [
    Math.floor((Math.random() * (size - 2)) / 2) * 2 + 1,
    Math.floor((Math.random() * (size - 2)) / 2) * 2 + 1,
  ]
  map[start[1]][start[0]] = 0

  let stack = [start]

  while (stack.length > 0) {
    let currentCell = stack.pop()
    let [x, y] = currentCell

    let neighbors = DIRECTIONS.map(([dx, dy]) => [x + dx * 2, y + dy * 2]).filter(
      ([nx, ny]) => nx > 0 && nx < size - 1 && ny > 0 && ny < size - 1 && map[ny][nx] === 1
    )

    if (neighbors.length === 0) continue

    let [nx, ny] = neighbors[Math.floor(Math.random() * neighbors.length)]
    map[ny][nx] = 0
    map[y + (ny - y) / 2][x + (nx - x) / 2] = 0

    stack.push([nx, ny])
    stack.push(currentCell)
  }

  return map
}
