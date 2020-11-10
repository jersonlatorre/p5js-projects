class Explosion {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.nParticles = 25
    this.particles = []

    // pooling
    this.isDead = false

    // se crean las partículas para la explosión
    for (let i = 0; i < this.nParticles; i++) {
      this.particles.push(new Particle(x, y))
    }
  }

  draw() {
    // pooling de partículas
    this.particles.forEach((particle, i) => {
      if (particle.isDead) {
        this.particles.splice(i, 1)
      }
    })

    this.particles.forEach((particle) => {
      particle.draw()
    })

    // condición para desaparecer
    if (this.particles.length == 0) {
      this.isDead = true
    }
  }
}
