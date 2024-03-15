import p from 'p5-easy'

let colors = ['#FF004D', '#FFA300', '#FFEC27', '#29ADFF']
let nLevels = 8

p.setup = () => {
  p.createCanvas(800, 800)
}

p.draw = () => {
  p.blendMode(p.BLEND)
  p.background('black')

  drawTree(p.width / 2, p.height * 0.7, nLevels)

  p.stroke('white')
  p.strokeWeight(p.width * 0.006) // Ajustado a ser relativo al ancho del canvas
  p.line(p.width / 2, p.height * 0.8, p.width / 2, p.height * 0.7)
  p.noLoop()
}

function drawTree(x, y, level) {
  if (level === 0) {
    drawFlower(x, y, level)
    return
  }

  let vx = p.map(level, 0, nLevels, p.width * 0.02, p.width * 0.06)
  let vy = p.map(level, 0, nLevels, p.height * 0.06, p.height * 0.12)
  let p1x = x - p.random(0, vx)
  let p2x = x + p.random(0, vx)
  let p1y = y - p.random(0, vy)
  let p2y = y - p.random(0, vy)

  p.stroke('black')
  p.strokeWeight(p.map(level, 0, nLevels, 1, 2)) // Considera hacer el grosor de la línea relativo también
  drawLine(x, y, p1x, p1y, level)
  drawLine(x, y, p2x, p2y, level)
  if (p.random() < 0.25) {
    drawTree(p1x, p1y, level - 1)
    drawFlower(p2x, p2y, level - 1)
  } else if (p.random() < 0.5) {
    drawTree(p2x, p2y, level - 1)
    drawFlower(p1x, p1y, level - 1)
  } else {
    drawTree(p1x, p1y, level - 1)
    drawTree(p2x, p2y, level - 1)
  }
}

function drawLine(x1, y1, x2, y2, level) {
  let midX = (x1 + x2) / 2
  let midY = (y1 + y2) / 2

  let p1 = p.createVector(x1, y1)
  let p2 = p.createVector(x2, y2)
  let midPoint = p.createVector(midX, midY)

  let dir = p2.x < p1.x ? p1.copy().sub(p2) : p1.copy().sub(p2).mult(-1)
  let normal = p.createVector(-dir.y, dir.x).normalize()

  let displacementMagnitude = p.map(level, 0, nLevels, 3, 5) // Considera ajustar esto relativo al tamaño
  let M = midPoint.copy().add(normal.mult(displacementMagnitude))

  p.noFill()
  p.stroke('white')
  p.strokeWeight(p.map(level, 0, nLevels, p.width * 0.001, p.width * 0.005))
  p.beginShape()
  p.vertex(p1.x, p1.y)
  p.quadraticVertex(M.x, M.y, p2.x, p2.y)
  p.endShape()
}

function drawFlower(x, y, level) {
  let size = p.map(level, 0, nLevels, p.width * 0.01, p.width * 0.03) // Ajustado para ser relativo al ancho

  p.blendMode(p.SCREEN)
  p.push()
  p.translate(x, y)
  p.rotate(p.random(0, 2 * Math.PI))
  p.fill(p.random(colors))
  p.noStroke()
  p.rectMode(p.CENTER)
  p.rect(0, 0, size, size * 0.65)
  p.pop()
  p.blendMode(p.BLEND)
}
