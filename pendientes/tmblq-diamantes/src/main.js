let img
let points
const SIZE = 20

function preload() {
  img = loadImage('/assets/p1.jpeg')
}

function setup() {
  createCanvas(900, 900)
  img.resize(900, 900)
  points = new PoissonDiskSampling({
    shape: [900, 900],
    minDistance: SIZE * 0.9,
    maxDistance: SIZE,
  })
    .fill()
    .map((p) => ({ x: p[0], y: p[1] }))
    .filter((p) => {
      let sample = img.get(p.x, p.y)
      let c = color(sample[0], sample[1], sample[2])
      let b = brightness(c)
      return b < 0.5
    })

  savePointsToJson(points, 'points.json')
}

function draw() {
  background('white')
  for (let point of points) {
    noStroke()
    fill('black')
    circle(point.x, point.y, SIZE)
  }
  noLoop()
}

function savePointsToJson(pointsData, filename) {
  const jsonContent = JSON.stringify(pointsData, null, 2)

  // Crea un Blob con el contenido del JSON
  const blob = new Blob([jsonContent], { type: 'application/json' })

  // Crea una URL para el Blob
  const url = URL.createObjectURL(blob)

  // Crea un enlace de descarga y haz que el usuario lo descargue
  const downloadLink = document.createElement('a')
  downloadLink.href = url
  downloadLink.download = filename
  downloadLink.innerText = 'Descargar puntos en JSON'
  document.body.appendChild(downloadLink)
}
