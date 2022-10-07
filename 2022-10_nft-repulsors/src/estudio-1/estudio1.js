class Estudio1 {
  static repulsors = []
  static tracers = []

  constructor(graphics) {
    this.graphics = graphics
    this.width = graphics.width
    this.height = graphics.height

    for (let i = 0; i < params.numRepulsors; i++) {
      Estudio1.repulsors.push(new Repulsor(this))
    }

    Estudio1.tracers = []
    for (let i = 0; i <= Tracer.TOTAL_TRACERS; i++) {
      let t = i / Tracer.TOTAL_TRACERS
      Estudio1.tracers.push(new Tracer(this, this.graphics.width * t, this.graphics.height + 20))
    }
  }

  draw() {
    this.graphics.blendMode(BLEND)
    this.graphics.background('black')
    this.graphics.blendMode(ADD)
    Estudio1.repulsors.forEach((repulsor) => {
      repulsor.draw(this.graphics)
    })

    Estudio1.tracers.forEach((tracer) => {
      tracer.draw(this.graphics)
    })

    if (Tracer.totalDeads == Tracer.TOTAL_TRACERS || frameCount == 250) {
      noLoop()
      fxpreview()
    }
  }
}
