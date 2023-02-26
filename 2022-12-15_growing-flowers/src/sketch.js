class Sketch {
  static entities = []
  static numEntities = 20
  static radius1 = 0
  static radius2 = 100
  static bottomZ = -50
  static topZ = 300

  constructor() {
    this.reset()

    Sketch.numEntities = random([1, 2, 3]) * 10
    Sketch.radius2 = random([1, 2, 3]) * 100

    setInterval(() => {
      this.reset()
    }, 6000)
  }
  
  draw(graphics) {
    graphics.clear()
    graphics.background(0)
    Sketch.entities.forEach((entity) => {
      entity.draw(graphics)
    })

    if (mouseIsPressed) {
      this.reset()
    }
  }

  reset() {
    Sketch.entities = []
    for (let i = 0; i < Sketch.numEntities; i++) {
      Sketch.entities.push(new Entity())
    }
  }
}
