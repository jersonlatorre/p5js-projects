import * as Tone from 'tone'

import Cell from './cell.js'
import Dot from './dot.js'
import Global from './global.js'
import p from 'p5-easy'

let cols, rows
let paths = []
let dots = []
let blurShader
let kuwaharaShader
let isAudioStarted = false
let synth

const pentatonicScale = ['C7', 'E7', 'G7', 'A7']

p.setup = () => {
  p.createCanvas(540, 540, p.WEBGL)
  cols = (p.width / Global.squareSize) | 0
  rows = (p.height / Global.squareSize) | 0

  Global.grid = new Array(rows)
  for (let j = 0; j < rows; j++) {
    Global.grid[j] = new Array(cols)
    for (let i = 0; i < cols; i++) {
      Global.grid[j][i] = new Cell(i, j)
    }
  }

  let startCell = Global.grid[p.random(rows) | 0][p.random(cols) | 0]
  startCell.visited = true
  Global.stack.push(startCell)

  blurShader = p.createFilterShader(Global.blurShaderSource)
  kuwaharaShader = p.createFilterShader(Global.kuwaharaShaderSource)

  document.querySelector('body')?.addEventListener('click', async () => {
    synth = new Tone.MonoSynth({
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.01,
      },
    }).toDestination()
    
    await Tone.start()
    isAudioStarted = true
  })
}

p.draw = () => {
  if (!isAudioStarted) return

  p.scale(0.9)
  p.translate(-p.width / 2, -p.height / 2)
  p.blendMode(p.BLEND)
  p.background('black')

  // p.blendMode(p.SCREEN)
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      Global.grid[j][i].draw()
    }
  }

  if (Global.stack.length > 0) {
    let current = Global.stack[Global.stack.length - 1]

    if (p.random() < 0.1) {
      let random = p.random()
      let duration = p.map(random, 0, 1, 0.01, 0.1)
      let volume = p.map(random, 0, 1, 1.1, 1.5)
      let size = p.map(random, 0, 1, 0.3, 1.3) * Global.squareSize
      synth.triggerAttackRelease(p.random(pentatonicScale), duration, Tone.now(), volume)
      dots.push(new Dot(current.i, current.j, size))
    } else {
      if (p.random() < 0.5) {
        synth.triggerAttackRelease('C2', 0.01, Tone.now(), p.random(0.0, 0.2))
      }
    }

    let next = current.checkNeighbors()
    if (next) {
      next.visited = true
      Global.stack.push(next)
      removeWalls(current, next)

      // if (p.random() < 0.2) {
      //   let random = p.random()
      //   let duration = p.map(random, 0, 1, 0.01, 0.1)
      //   let volume = p.map(random, 0, 1, 1.0, 1.0)
      //   let size = p.map(random, 0, 1, 0.3, 1.3) * Global.squareSize
      //   let noteIndex = p.random(pentatonicScale.length) | 0
      //   synth.triggerAttackRelease(pentatonicScale[noteIndex], duration, Tone.now(), volume)
      //   dots.push(new Dot(current.i, current.j, size))
      // } else {
      //   if (p.random() < 0.5) {
      //     synth.triggerAttackRelease('C2', 0.01, Tone.now(), p.random(0.1, 0.1))
      //   }
      // }
    } else {
      Global.stack.pop()
    }
  }

  p.filter(p.BLUR, 16)
  p.filter(p.THRESHOLD, 0.1)
  
  blurShader.setUniform('u_resolution', [p.width, p.height])
  blurShader.setUniform('u_blur', 0.04)
  p.filter(blurShader)
  
  // p.filter(kuwaharaShader)
  drawDots()

  blurShader.setUniform('u_resolution', [p.width, p.height])
  blurShader.setUniform('u_blur', 0.02)
  p.filter(blurShader)

}

function drawDots() {
  for (let i = 0; i < dots.length; i++) {
    dots[i].draw()
  }
}

function removeWalls(current, next) {
  if (current.i == next.i + 1) {
    // current está a la derecha de next
    current.walls.left = false
    next.walls.right = false
  } else if (current.i == next.i - 1) {
    // current está a la izquierda de next
    current.walls.right = false
    next.walls.left = false
  }

  if (current.j == next.j + 1) {
    // current está abajo de next
    current.walls.top = false
    next.walls.bottom = false
  } else if (current.j == next.j - 1) {
    // current está arriba de next
    current.walls.bottom = false
    next.walls.top = false
  }

  paths.push({ p1: current, p2: next })
}
