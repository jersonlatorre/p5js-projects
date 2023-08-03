import p from 'p5-sketch'
import Sketch from './sketch'

let font 
let sketch 

p.preload = () => {
  font = p.loadFont('assets/Roboto-Medium.ttf')  
}

p.setup = () => {
  p.createCanvas(600, 600)
  font && p.textFont(font)
  sketch = new Sketch()
}

p.draw = () => {
  p.background('PapayaWhip')
  sketch.draw()
}