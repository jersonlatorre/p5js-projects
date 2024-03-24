import p from 'p5-easy'

let colors = ['#323232 ', '#FF5B65', '#FFA24B', '#FCDF5F', '#49D8EE', '#F5EFE7']
let string = [
  '',
  '',
  '',
  '',
]
let currentLetter = 0
let ditherTexture
let matrix
let N = 50

let ditherShader
let offsetShader
let noiseShader
let perlinShader
let ditherEffect
let offsetEffect
let noiseEffect
let perlinEffect

p.preload = () => {
  ditherTexture = p.loadImage('./4x4.png')
  // ditherTexture = p.loadImage('./8x8.png')
  ditherEffect = p.loadStrings('./shaders/dither.frag', () => {
    ditherEffect = ditherEffect.join('\n')
  })
  offsetEffect = p.loadStrings('./shaders/offset.frag', () => {
    offsetEffect = offsetEffect.join('\n')
  })
  noiseEffect = p.loadStrings('./shaders/noise.frag', () => {
    noiseEffect = noiseEffect.join('\n')
  })
  perlinEffect = p.loadStrings('./shaders/perlin.frag', () => {
    perlinEffect = perlinEffect.join('\n')
  })
}

p.setup = () => {
  p.createCanvas(540, 960)
  // p.frameRate(8)
  matrix = create30RuleMatrix(N, (16 / 9) * N)
  ditherShader = p.createFilterShader(ditherEffect)
  ditherShader.setUniform('ditherTexture', ditherTexture)
  offsetShader = p.createFilterShader(offsetEffect)
  noiseShader = p.createFilterShader(noiseEffect)
  perlinShader = p.createFilterShader(perlinEffect)
  perlinShader.setUniform('time', p.millis() / 1000)
}

function create30RuleMatrix(rows, cols) {
  let state = Array.from({ length: rows }, () => p.random([0, 1]))
  let states = [state]

  for (let i = 0; i < cols - 1; i++) {
    let auxState = Array.from({ length: rows }, () => 0)

    for (let j = 0; j < state.length; j++) {
      let center = state[j]
      let left = j === 0 ? 0 : state[j - 1]
      let right = j === state.length - 1 ? 0 : state[j + 1]
      let value =
        (left && !center && !right) ||
        (!left && center && !right) ||
        (!left && !center && right) ||
        (!left && center && right)

      auxState[j] = value ? 1 : 0
    }

    if (p.random() < 0.5) {
      let r = p.random(N) | 0
      auxState[r] = 1 - auxState[r]
    }
    // if (p.random() < 0.2) auxState = auxState.reverse()
    // if (p.random() < 0.05) auxState = auxState.map((x) => !x)

    auxState = symmetrize(auxState)
    states.push(auxState)
    state = auxState
  }

  return states
}

function symmetrize(array) {
  const middle = Math.floor(array.length / 2)
  const isOdd = array.length % 2 !== 0

  let firstHalf = array.slice(0, middle)
  let secondHalf = [...firstHalf].reverse()

  // Si el número de elementos es impar, incluimos el elemento del medio
  if (isOdd) {
    return [...firstHalf, array[middle], ...secondHalf]
  } else {
    return [...firstHalf, ...secondHalf]
  }
}

p.draw = () => {
  // let factor = 1.1
  // let dx = (p.width * factor - p.width) * 0.5
  // let dy = (p.height * factor - p.height) * 0.5
  // p.translate(-dx, -dy)
  // p.scale(factor, factor)

  perlinShader.setUniform('time', p.millis() / 100)
  ditherShader.setUniform('ditherTexture', ditherTexture)

  let sin = p.noise(p.millis() / 1200)
  let radius = p.map(sin, 0, 1, p.width * 0.25, p.width * 0.35)
  // p.background(colors[0])
  p.blendMode(p.BLEND)
  drawMatrix()
  // p.blendMode(p.EXCLUSION)
  p.noStroke()
  p.fill('white')
  p.circle(p.width / 2, p.height / 2, radius)
  p.fill('black')
  p.circle(p.width / 2, p.height / 2, radius - 30)

  p.filter(p.BLUR, 9)
  p.filter(ditherShader)
  p.filter(noiseShader)
  p.fill('#ddd')
  p.textAlign(p.CENTER, p.CENTER)
  p.text(string[currentLetter], p.width / 2, p.height / 2)

  if (p.frameCount % 5 == 0) {
    p.textSize(p.random(12, 20))
    currentLetter++
    currentLetter = currentLetter % string.length
  }
  p.filter(offsetShader)
  p.filter(perlinShader)
  // p.noLoop()
}

function drawMatrix() {
  let step = p.width / N

  matrix.forEach((row, i) => {
    row.forEach((cell, j) => {
      let x = j * step
      let y = i * step

      let distance = p.dist(p.width / 2, p.height / 2, x, y)
      // if (distance > p.width * 0.25 && distance < p.width * 0.35) return
      p.push()
      // p.strokeWeight(3)
      p.noStroke()
      // p.stroke(cell == 1 ? p.random(colors) : colors[5])
      let r = seededRandom(i * N + j)
      let n = (r * colors.length) | 0
      p.fill(cell == 0 ? colors[5] : colors[0])
      // p.fill(cell == 0 ? colors[n] : colors[0])
      p.square(x, y, step)
      p.pop()
    })
  })
}

function seededRandom(seed) {
  return fract(p.sin(seed) * 43758.5453123)
}

function fract(x) {
  return x - p.floor(x)
}
