const ipcRenderer = require('electron').ipcRenderer

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(600, 600)
  }

  p.draw = () => {
    p.background('blue')
    p.circle(300, 300, 100)
    ipcRenderer.send('ping')
  }
}

export default sketch
