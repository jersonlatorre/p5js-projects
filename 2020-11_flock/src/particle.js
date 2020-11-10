class Particle {
  constructor(x, y) {
    this.position = createVector(x, y)

    // velocidad aleatoria
    this.speed = random(2, 5)
    this.speed = p5.Vector.random2D().mult(this.speed)

    // aceleración tipo gravedad
    this.acceleration = createVector(0, 0)

    // pooling
    this.isDead = false
    this.alpha = 1
    this.time = 0
    this.lifeTime = 0.5
  }

  draw() {
    // fórmula de la física
    this.speed.add(this.acceleration)
    this.position.add(this.speed)

    this.time += deltaTime / 1000

    // condición de muerte: salir de la pantalla
    if (this.time > this.lifeTime) {
      this.time = this.lifeTime
      this.isDead = true
    }

    // dibuja
    this.alpha = map(this.time, 0, this.lifeTime, 1, 0)
    fill('rgba(255, 0, 0,' + this.alpha +  ')')
    circle(this.position.x, this.position.y, 6)
  }
}
