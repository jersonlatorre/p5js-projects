class Particle {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.velocity = p5.Vector.random2D().mult(.6)
    this.acceleration = createVector(0.01, 0.03)
    this.h = random(0, 255)
  }

  update() {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
  }

  draw() {
    noStroke()
    fill(this.h, 255, 255)
    circle(this.position.x, this.position.y, map(this.position.y, 0, 400, 15, 0))
  }
}

class ParticleSystem {
  constructor() {
    this.x = 0
    this.y = 0
    this.particles = []
  }

  update(x, y) {
    for (let i = 0; i < 5; i++) {
      let particle = new Particle(x, y)
      this.particles.push(particle)
      this.particles.forEach(particle => {
        particle.update()
        if (particle.position.y > 420) {
          this.particles.splice(this.particles.indexOf(particle), 1)
        }
      })
    }
  }

  draw() {
    this.particles.forEach(particle => {
      particle.draw()
      this.particles.forEach(particle2 => {
      	if (dist(particle.position.x, particle.position.y, particle2.position.x, particle2.position.y) < 10) {
					stroke(random(255), 255, 255)
					strokeWeight(2)
      		line(particle.position.x, particle.position.y, particle2.position.x, particle2.position.y)
      	}
      })
    })
  }
}
