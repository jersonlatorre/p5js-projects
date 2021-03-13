class Npc {
  constructor(game) {
    this.game = game
    this.tAngle = 0
    this.radius = 288
    this.startAngle = -170 * Math.PI / 180
    this.endAngle = -10 * Math.PI / 180
    this.angle = this.startAngle
    this.state = 'appearing'

    this.scale = 0
    this.tScale = 0
  }

  update() {
    switch (this.state) {
      case 'appearing': {
        this.scale = Phaser.Math.Linear(0, 0.33, this.easeOutBack(this.tScale))
        this.tScale += 0.05
        this.skin.setScale(this.scale)

        let x = 400 + this.radius * Math.cos(this.angle)
        let y = 600 + this.radius * Math.sin(this.angle)
        this.skin.setPosition(x, y)
        this.skin.setRotation(this.angle + Math.PI / 2)

        if (this.tScale > 1) {
          this.state = 'move'
        }
        break
      }

      case 'move': {
        this.angle = Phaser.Math.Linear(this.startAngle, this.endAngle, this.tAngle)
        this.tAngle += 0.009

        let x = 400 + this.radius * Math.cos(this.angle)
        let y = 600 + this.radius * Math.sin(this.angle)
        this.skin.setPosition(x, y)
        this.skin.setRotation(this.angle + Math.PI / 2)

        if (rayo.alpha == 1) {
          if (this.angle < -84 * Math.PI / 180 && this.angle > -96 * Math.PI / 180) {
            this.state = 'dying'
            if (this.type == 'malo') {
              score++
              text.text = score
            }

            this.skin.play('npc-die')
            isShaking = true
            setTimeout(() => {
              isShaking = false
            }, 300)

            this.skin.once('animationcomplete', () => {
              this.skin.destroy(true)

              if (this.type == 'bueno') {
                stopGame()
              }
            })
          }
        }

        if (this.tAngle > 1) {
          this.scale = 0.33
          this.tScale = 0
          this.state = 'disappear'
        }

        if (this.tAngle > 1) {
          npcs.filter((npc) => {
            return npc != this
          })
        }

        break
      }

      case 'disappear': {
        this.scale = Phaser.Math.Linear(0.33, 0, this.easeInBack(this.tScale))
        this.tScale += 0.1
        this.skin.setScale(this.scale)

        let x = 400 + this.radius * Math.cos(this.angle)
        let y = 600 + this.radius * Math.sin(this.angle)
        this.skin.setPosition(x, y)
        this.skin.setRotation(this.angle + Math.PI / 2)

        if (this.tScale > 1) {
          this.skin.destroy(true)
        }

        break
      }
    }
  }

  easeOutBack(t) {
    return 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2)
  }

  easeInBack(t) {
    return 2.70158 * Math.pow(t, 3) - 1.70158 * Math.pow(t, 2)
  }
}

class Malo extends Npc {
  constructor(game) {
    super(game)
    this.type = 'malo'
    this.skin = game.add.sprite(0, 0, 'malo').setScale(0.3).play('malo-idle').setOrigin(0.5, 1)
  }
}

class Bueno extends Npc {
  constructor(game) {
    super(game)
    this.type = 'bueno'
    this.skin = game.add.sprite(0, 0, 'bueno').setScale(0.3).play('bueno-idle').setOrigin(0.5, 1)
  }
}
