import p from 'p5-easy'

let states
let state
let auxState
let N = 50
let colors = ['#323232', '#FF5B65', '#FFA24B', '#FCDF5F', '#49D8EE', '#F5EFE7']
let squareSize

p.setup = () => {
  p.createCanvas(540, 540)
  initialize()
  p.frameRate(8)
  squareSize = p.width / N
}

p.draw = () => {
  p.background('#323232')
  auxState = [...state]

  // 30 rule algorithm
  for (let i = 0; i < state.length; i++) {
    let center = state[i]
    let left = i === 0 ? 1 : state[i - 1]
    let right = i === state.length - 1 ? 1 : state[i + 1]
    let value =
      (left && !center && !right) ||
      (!left && center && !right) ||
      (!left && !center && right) ||
      (!left && center && right)
    auxState[i] = value ? 1 : 0
  }

  state = [...auxState]

  if (p.random() < 0.1) state.splice(0, 1, p.random([0, 1]))
  state = symmetrize(state)
  states.push(state)

  if (states.length > 0.45 * p.height / (p.width / N)) {
    // initialize()
    states.splice(0, 1)
  }

  drawStates()

  p.filter(p.BLUR, 6)
  p.filter(p.THRESHOLD, 0.7)
}

function initialize() {
  states = []
  state = Array.from({ length: N }, () => p.random([0, 1]))
}

function drawStates() {
  for (let row of p.range(states.length)) {
    let state = states[row]
    for (let col = 0; col < state.length - 1; col += 2) {
      let value1 = state[col]
      let value2 = state[col + 1]
      let x = col * squareSize
      let y = row * squareSize * 2
      let value = value1 ^ value2 ? 1 : 0
      if (!value) {
        p.fill('#F5EFE7')
        p.stroke('#F5EFE7')
      }
      else {
         p.fill('#323232')
        p.stroke('#323232')
      }
      p.strokeWeight(0.5)
      p.rect(x, y, squareSize * 20)
      p.push()
      p.pop()
    }
  }
}

function symmetrize(array) {
  const midPoint = Math.floor(array.length / 2)
  const firstHalf = array.slice(0, midPoint)
  const mirrored = firstHalf.slice().reverse()
  return array.length % 2 === 0
    ? firstHalf.concat(mirrored)
    : firstHalf.concat(array[midPoint], mirrored)
}
