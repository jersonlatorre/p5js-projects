import p from 'p5-easy'

let states
let state
let auxState
let N = 100
let colors = ['#323232', '#FF5B65', '#FFA24B', '#FCDF5F', '#49D8EE', '#F5EFE7']
let squareSize

p.setup = () => {
  p.createCanvas(540, 960)
  initialize()
  squareSize = p.width / N
}

p.draw = () => {
  p.background('#323232')
  // p.frameRate(20)
  auxState = [...state]

  // 30 rule algorithm
  for (let i = 0; i < state.length; i++) {
    let center = state[i]
    let left = i === 0 ? 1 : state[i - 1]
    let right = i === state.length - 1 ? 1 : state[i + 1]
    auxState[i] =
      (left && !center && !right) ||
      (!left && center && !right) ||
      (!left && !center && right) ||
      (!left && center && right)
  }

  state = [...auxState]

  if (p.random() < 0.1) state.splice(0, 1, p.random([0, 1]))
  state = symmetrize(state)
  states.push(state)

  if (states.length > p.height / (p.width / N)) {
    // initialize()
    states.splice(0, 1)
  }

  drawStates()
}

function initialize() {
  states = []
  state = Array.from({ length: N }, () => p.random([0, 1]))
}

function drawStates() {
  for (let row of p.range(states.length)) {
    let state = states[row]
    for (let col = 0; col < state.length; col++) {
      p.push()
      if (state[col] == 0) {
        p.fill('#323232')
        p.stroke('#323232')
      } else {
        p.stroke(colors[5])
        p.fill(colors[5])
      }
      p.strokeWeight(5)
      p.translate(col * squareSize + squareSize / 2, row * squareSize + squareSize / 2)
      p.rectMode(p.CENTER)
      p.square(0, 0, squareSize * 30)
      // p.line(-step / 2, -step / 2, step / 2, step / 2)
      // p.line(-step / 2, step / 2, step / 2, -step / 2)
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
