import p from 'p5-sketch'
import { Circle } from './circle.js'
import { Dot } from './dot.js'
import { themeColors } from './colors.js'
import { Gallery } from './gallery.js'
import { Global } from './global.js'

let circles = []
let gallery
let font

let names = ['tetrahedron', 'hexahedron', 'octahedron', 'icosahedron', 'dodecahedron']

p.preload = () => {
  p.icosa = p.loadModel('../assets/icosa.obj')
  p.tetra = p.loadModel('../assets/tetra.obj')
  p.hexa = p.loadModel('../assets/hexa.obj')
  p.octa = p.loadModel('../assets/octa.obj')
  p.dodeca = p.loadModel('../assets/dodeca.obj')
  font = p.loadFont('../assets/PF Din Mono.ttf')
}

p.setup = () => {
  p.createCanvas(600, 600)

  let n = 5
  for (let i = 0; i < n; i++) {
    let x = p.map(i, 0, n - 1, Global.controllerMargin, 600 - Global.controllerMargin)
    let y = Global.controllerY
    circles.push(new Circle(x, y, i))
  }

  p.dot = new Dot(circles[Global.currentIndex].x, circles[Global.currentIndex].y, themeColors[Global.currentIndex])
  console.log(p.dot)

  gallery = new Gallery()
}

p.draw = () => {
  p.background('#111')

  for (let i = 0; i < circles.length; i++) {
    circles[i].draw()
  }

  p.dot.draw()
  gallery.draw()

  p.fill('#fff')
  p.textSize(20)
  p.textFont(font)
  // p.textAlign(p.LEFT, p.CENTER)
  // p.text('platonic', 30, 30)
  p.textAlign(p.CENTER, p.CENTER)
  // p.text(names[Global.currentIndex], 300, 40)
  p.text('platonic', 300, 40)
}
