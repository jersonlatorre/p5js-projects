let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: false,
  antialias: true,
  roundPixels: true,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  backgroundColor: '#ffffff',
}

let player
let npcs = []

let angle = 0
let planeta
let time = 0
let deltaTime = 0
let now = 0
let cursors

let isShooting = false

let score = 0
let text
let keySpace

let isShaking = false
let game = new Phaser.Game(config)

function preload() {
  this.load.image('fondo', 'assets/fondo.png')
  this.load.image('planeta', 'assets/planeta.png')
  this.load.image('player', 'assets/player.png')
  this.load.image('rayo', 'assets/rayo.png')
  this.load.spritesheet('bueno', 'assets/bueno.png', { frameWidth: 137, frameHeight: 213 })
  this.load.spritesheet('malo', 'assets/malo.png', { frameWidth: 222, frameHeight: 185 })
  this.load.spritesheet('explosion', 'assets/explosion.png', { frameWidth: 192, frameHeight: 185 })
}

function create() {
  this.add.sprite(400, 300, 'fondo')
  planeta = this.add.sprite(400, 455, 'planeta').setScale(0.9)
  rayo = this.add.sprite(400, 242, 'rayo').setScale(0.54)
  rayo.depth = 100
  rayo.alpha = 0

  text = this.add.text(400, 60, score, { font: '30px Arial', fill: '#000000', align: 'center' })
  text.setOrigin(0.5, 0)

  cursors = this.input.keyboard.createCursorKeys()

  keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

  this.anims.create({
    key: 'malo-idle',
    frameRate: 8,
    frames: this.anims.generateFrameNumbers('malo', { start: 0, end: 3 }),
    repeat: -1
  })

  this.anims.create({
    key: 'bueno-idle',
    frameRate: 8,
    frames: this.anims.generateFrameNumbers('bueno', { start: 0, end: 3 }),
    repeat: -1
  })

  this.anims.create({
    key: 'npc-die',
    frameRate: 15,
    frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 7 }),
    repeat: 0
  })

  player = this.add.sprite(400, 175, 'player').setScale(0.5).setOrigin(0.5, 1)
}

function update() {
  deltaTime = this.time.now - now
  now = this.time.now

  time += deltaTime / 1000

  if (time > 0.2) {
    time = 0
    if (Math.random() < 0.5) {
      npcs.push(new Malo(this))
    } else {
      npcs.push(new Bueno(this))
    }
  }

  if (isShaking) {
    let amplitude = 8
    let x = -amplitude + 2 * amplitude * Math.random()
    let y = -amplitude + 2 * amplitude * Math.random()
    this.cameras.main.setPosition(x, y)
  } else {
    this.cameras.main.setPosition(0, 0)
  }

  player.angle = 3 * Math.sin(this.time.now / 150)

  if (Phaser.Input.Keyboard.JustDown(keySpace)) {
    rayo.alpha = 1

    setTimeout(() => {
      rayo.alpha = 0
    }, 50)
  }

  npcs.forEach((npc) => {
    npc.update()
  })
}

function stopGame() {
  game.destroy()

  let canvas = document.querySelector('canvas')
  document.body.removeChild(canvas)

  let text = document.createElement('p')
  text.style.color = '#000'
  text.style.width = '300px'
  text.style.fontSize = '40px'
  text.style.fontFamily = 'Arial, Helvetica, sans-serif'
  text.style.textAlign = 'center'
  text.style.display = 'inline-block'
  text.innerHTML = 'score: ' + score
  document.body.appendChild(text)

  let retry = document.createElement('button')
  retry.style.color = '#000'
  retry.style.fontSize = '20px'
  retry.style.fontFamily = 'Arial, Helvetica, sans-serif'
  retry.style.retryAlign = 'center'
  retry.style.display = 'inline-block'
  retry.innerHTML = 'volver a jugar'
  retry.style.padding = '5px 10px'

  retry.onclick = () => {
    window.location = '/'
  }
  document.body.appendChild(retry)
}
