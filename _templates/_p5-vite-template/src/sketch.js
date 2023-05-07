import p from '../lib/p5'

let eyeImg

export default class Sketch {
  constructor() {
    eyeImg = p.loadImage('../assets/eye.png')
  }

  draw() {
    p.background('blue')
    p.imageMode(p.CENTER)
    if (eyeImg) p.image(eyeImg, p.width / 2, p.height / 2, 100, 100)
  }
}
