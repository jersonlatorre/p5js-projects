import p from 'p5-sketch'

let N = 2
let SIZE, WIDTH
let hilbertCoords = []

p.setup = () => {
  p.createCanvas(600, 600)
  p.colorMode(p.HSB)
  p.strokeCap(p.SQUARE)

  SIZE = 2 ** N
  WIDTH = p.width / SIZE

  for (let index = 0; index < SIZE * SIZE; index++) {
    let [j, i] = hilbertIndexToCoords(index, N)
    let x = i * WIDTH + WIDTH / 2
    let y = j * WIDTH + WIDTH / 2
    hilbertCoords.push([x, y])
  }
}

p.draw = () => {
  p.background('#111')

  p.beginShape()
  p.noFill()
  p.stroke('white')
  p.strokeWeight(WIDTH * 0.3)
  for (let point of hilbertCoords) {
    p.vertex(point[0], point[1])
    // p.curveVertex(point[0], point[1])
  }
  p.endShape()

  // for (let i = 0; i < hilbertCoords.length - 1; i++) {
  //   let p1 = hilbertCoords[i]
  //   let p2 = hilbertCoords[i + 1]

  //   p.push()
  //   p.stroke(0)
  //   p.strokeWeight(WIDTH * 0.3)
  //   p.line(p1[0], p1[1], p2[0], p2[1])
  //   p.pop()
  // }

  // p.print(p.mouseX)
  // for (let i = 0; i < hilbertCoords.length; i++) {
  //   let point = hilbertCoords[i]

  //   if (i % (p.mouseX / 1 | 0) == 0) {
  //     p.push()
  //     p.noStroke()
  //     p.fill('red')
  //     p.circle(point[0], point[1], WIDTH * 0.7)
  //     p.pop()
  //   }
  // }

  p.noLoop()
}

function hilbertIndexToCoords(index, order) {
  let n = 1 << order
  let x = 0,
    y = 0

  for (let s = 1; s < n; s *= 2) {
    let rx = 1 & (index >> 1)
    let ry = 1 & (index ^ rx)
    ;[x, y] = rotate(s, x, y, rx, ry)
    x += s * rx
    y += s * ry
    index >>= 2
  }
  return [x, y]
}

function coordsToHilbertIndex(x, y, order) {
  let n = 1 << order
  let index = 0

  for (let s = n / 2; s > 0; s /= 2) {
    let rx = (x & s) > 0 ? 1 : 0
    let ry = (y & s) > 0 ? 1 : 0
    index += s * s * ((3 * rx) ^ ry)
    ;[x, y] = rotate(s, x, y, rx, ry)
  }
  return index
}

function rotate(n, x, y, rx, ry) {
  if (ry === 0) {
    if (rx === 1) {
      x = n - 1 - x
      y = n - 1 - y
    }
    return [y, x]
  }
  return [x, y]
}
