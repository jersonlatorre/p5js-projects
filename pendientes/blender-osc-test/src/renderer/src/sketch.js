const { ipcRenderer } = require('electron')

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
  }

  p.draw = () => {
    p.background('yellow')
    p.fill('black')
    p.circle(p.mouseX, p.mouseY, 100)
    ipcRenderer.send(
      'blender',
      p.map(p.mouseX, 0, p.width, -1, 1),
      p.map(p.mouseY, 0, p.height, -1, 1)
    )
  }
}

export default sketch
