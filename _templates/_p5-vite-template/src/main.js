import p from '../lib/p5'
import Sketch from './sketch'

let sketch

p.setup = () => {
  p.createCanvas(600, 600)
  sketch = new Sketch()
}

p.draw = () => {
  sketch.draw()
}
