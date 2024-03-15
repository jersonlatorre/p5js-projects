import Global from './global.js'
import p from 'p5-easy'

export default class Dot {
  constructor(i, j, size) {
    this.i = i
    this.j = j
    this.color = p.random(Global.colors)
    this.t = 0
    this.dt = p.random(0.01, 0.03)
    this.size = 0
    this.maxSize = size
    this.offsetX = p.random(-20, 20)
    this.offsetY = p.random(-20, 20)
    this.vertices = [] // Inicializa el array de vértices
    this.calculateVertices() // Llama a la función para calcular los vértices
  }

  calculateVertices() {
    const resolution = 6 // Resolución del círculo
    const noiseAmount = 0.03 // Rango de desplazamiento de los vértices
    for (let angle = 0; angle < 2 * p.PI; angle += (2 * p.PI) / resolution) {
      let randomOffset = p.random(-this.maxSize * noiseAmount, this.maxSize * noiseAmount)
      let thisRadius = this.maxSize / 2 + randomOffset
      let vx = p.cos(angle) * thisRadius
      let vy = p.sin(angle) * thisRadius
      this.vertices.push({ vx, vy })
    }
  }

  elastic(t) {
    if (t == 0) return 0
    if (t == 1) return 1
    return p.pow(2, -10 * t) * p.sin((10 * t - 0.75) * 0.666666 * p.PI) + 1
  }

  easeOutBack(t) {
    return 1 + 2.70158 * p.pow(t - 1, 3) + 1.70158 * p.pow(t - 1, 2)
  }

  bounce(t) {
    const n1 = 7.5625
    const d1 = 2.75

    if (t < 1 / d1) {
      return n1 * t * t
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375
    }
  }

  draw() {
    this.t += this.dt
    if (this.t > 1) {
      this.t = 1
    }

    let tt = this.elastic(this.t)

    p.push()
    let x = this.i * Global.squareSize + Global.squareSize / 2 + this.offsetX
    let y = this.j * Global.squareSize + Global.squareSize / 2 + this.offsetY
    p.translate(x, y)
    p.scale(tt)
    p.fill(this.color)
    p.noStroke()
    p.beginShape()

    // Agrega el último vértice al inicio para una transición suave
    const { vx: lastVx, vy: lastVy } = this.vertices[this.vertices.length - 1]
    p.curveVertex(lastVx, lastVy)

    // Usa los vértices almacenados para dibujar el círculo
    this.vertices.forEach(({ vx, vy }) => {
      p.curveVertex(vx, vy)
    })

    // Repite el primer y segundo vértice al final para completar la curva
    const { vx: firstVx, vy: firstVy } = this.vertices[0]
    p.curveVertex(firstVx, firstVy)

    const { vx: secondVx, vy: secondVy } = this.vertices[1] || this.vertices[0] // En caso de que haya menos de dos vértices
    p.curveVertex(secondVx, secondVy)

    p.endShape(p.CLOSE)

    p.pop()
  }
}
