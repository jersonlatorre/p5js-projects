import p from 'p5-easy'

let groups = []
let colors = ['#FF004D', '#FFA300', '#FFEC27', '#29ADFF', ' #FFF1E8']

const NUM_GROUPS = 2000 // Ajusta el número de grupos

p.setup = () => {
  p.createCanvas(1080, 1080)
  p.colorMode(p.HSB)
  groups.push(new Group()) // Crea el grupo inicial con puntos aleatorios

  // Crea los grupos subsecuentes basados en puntos medios
  for (let i = 0; i < NUM_GROUPS - 1; i++) {
    let lastGroup = groups[groups.length - 1]
    groups.push(new Group(lastGroup.points))
  }
}

p.draw = () => {
  p.blendMode(p.BLEND)
  p.background('black')

  // p.blendMode(p.ADD)
  const base = 0

  for (let i = groups.length * base; i < groups.length; i++) {
    const alpha = p.map(i, groups.length * base, groups.length, 0, 1)
    if (i % 1 === 0) {
      groups[i].draw(alpha)
    }
  }

  p.noLoop()
}

function getColor(t) {
  t = Math.max(0, Math.min(t, 1))
  let index = Math.floor(t * colors.length)
  index = Math.min(index, colors.length - 1)
  return colors[index]
}

class Group {
  constructor(points) {
    this.points = []
    if (points) {
      // Calcula el grupo formado por los puntos medios de manera segura
      for (let i = 0; i < points.length; i++) {
        let p1 = points[i]
        let p2 = points[(i + 1) % points.length] // Asegura un ciclo entre el último y el primer punto
        let midPoint = p.createVector((p1.x + p2.x) / 2, (p1.y + p2.y) / 2)

        // Introduce distorsión aleatoria en los puntos medios
        let n = 2

        midPoint.x += p.random(-n, n)
        midPoint.y += p.random(-n, n)

        this.points.push(midPoint)
      }
    } else {
      let resolution = 600
      for (let i = 0; i < resolution; i++) {
        let angle = p.map(i, 0, resolution * 0.5, 0, p.TWO_PI)
        let dispersion = 200
        let ww = p.width * 0.3
        let hh = p.height * 0.3
        let x = p.width / 2 + p.cos(angle) * ww + p.random(-dispersion, dispersion)
        let y = p.height / 2 + p.sin(angle) * hh + p.random(-dispersion, dispersion)
        this.points.push(p.createVector(x, y))
      }
    }
  }

  draw(t) {
    const alpha = p.map(p.pow(t, 0.01), 0, 1, 0.0, 0.2)
    const weight = p.map(p.pow(t, 0.1), 0, 1, 0.2, 1)

    let c = getColor(t)
    c = p.color(p.hue(c), p.saturation(c), p.brightness(c), alpha)
    p.stroke(c)
    p.strokeWeight(weight)
    p.strokeJoin(p.ROUND)
    p.noFill()
    p.beginShape()
    for (let i = 0; i < this.points.length; i++) {
      let n = 0
      let x = this.points[i].x + p.random(-n, n)
      let y = this.points[i].y + p.random(-n, n)
      p.curveVertex(x, y)
    }
    p.endShape(p.CLOSE)
  }
}
