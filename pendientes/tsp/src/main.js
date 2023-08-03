let cities = []
let bestPath = []

function setup() {
  createCanvas(600, 600)

  cities = new PoissonDiskSampling({
    shape: [600, 600],
    minDistance: 10,
    maxDistance: 10,
  })
    .fill()
    .map((p) => createVector(p[0], p[1]))
    .filter((p) => {
      return dist(p.x, p.y, 300, 300) < 250
    })

  bestPath = nearestNeighbor(cities.slice())
  bestPath = twoOpt(bestPath)
}

function draw() {
  background('white')
  stroke('black')
  strokeWeight(2)
  noFill()

  for (let i = 0; i < bestPath.length - 1; i++) {
    let n = noise(bestPath[i].x * 0.01, bestPath[i].y * 0.01)
    let w = map(n, 0, 1, 0, 6)
    strokeWeight(w)
    line(bestPath[i].x, bestPath[i].y, bestPath[i + 1].x, bestPath[i + 1].y)
  }

  // beginShape()
  // for (let point of bestPath) {
  //   vertex(point.x, point.y)
  // }
  // endShape()

  for (let city of cities) {
    // circle(city.x, city.y, 5)
  }
}

function twoOpt(path) {
  let improved = true
  while (improved) {
    improved = false
    for (let i = 0; i < path.length - 2; i++) {
      for (let j = i + 2; j < path.length - 1; j++) {
        if (j != path.length - 1 || i != 0) {
          // No toma los extremos
          let lenBefore =
            dist(path[i].x, path[i].y, path[i + 1].x, path[i + 1].y) +
            dist(path[j].x, path[j].y, path[j + 1].x, path[j + 1].y)
          let lenAfter =
            dist(path[i].x, path[i].y, path[j].x, path[j].y) +
            dist(path[i + 1].x, path[i + 1].y, path[j + 1].x, path[j + 1].y)
          if (lenAfter < lenBefore) {
            reverseSubpath(path, i + 1, j)
            improved = true
          }
        }
      }
    }
  }
  return path
}

function reverseSubpath(path, start, end) {
  while (start < end) {
    let temp = path[start]
    path[start] = path[end]
    path[end] = temp
    start++
    end--
  }
}

function nearestNeighbor(unvisitedCities) {
  let currentCity = unvisitedCities[0]
  let path = [currentCity]
  let index = 0

  unvisitedCities.splice(index, 1)

  while (unvisitedCities.length > 0) {
    let nearestDist = Infinity
    let nearestIndex

    for (let i = 0; i < unvisitedCities.length; i++) {
      let d = dist(currentCity.x, currentCity.y, unvisitedCities[i].x, unvisitedCities[i].y)
      if (d < nearestDist) {
        nearestDist = d
        nearestIndex = i
      }
    }

    currentCity = unvisitedCities[nearestIndex]
    path.push(currentCity)
    unvisitedCities.splice(nearestIndex, 1)
  }

  return path
}
