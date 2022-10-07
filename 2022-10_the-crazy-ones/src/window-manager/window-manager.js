class WindowManagerState {
  static NONE = 0
  static DRAWING = 1
}

class WindowManager {
  constructor() {
    this.windows = []
    this.startPosition = null
    this.onCreate = null
    this.state = WindowManagerState.NONE

    document.addEventListener('mousedown', () => this.onMouseDown())
    document.addEventListener('mouseup', () => this.onMouseUp())
  }

  draw() {
    background('#eee')
    switch (this.state) {
      case WindowManagerState.NONE:
        for (let i = 0; i < this.windows.length; i++) {
          let window = this.windows[i]
          window.draw()
        }
        break

      case WindowManagerState.DRAWING:
        this.windows.forEach((window) => {
          window.draw()
        })

        push()
        fill('rgba(0, 0, 0, 0.15)')
        stroke('black')
        strokeWeight(4)
        rect(this.startPosition.x, this.startPosition.y, mouseX - this.startPosition.x, mouseY - this.startPosition.y)
        pop()
        break
    }
  }

  createWindow() {
    if (abs(mouseX - this.startPosition.x) < 110 || abs(mouseY - this.startPosition.y) < 80) return
    let window = new Window(
      this.startPosition.x,
      this.startPosition.y,
      mouseX - this.startPosition.x,
      mouseY - this.startPosition.y
    )
    this.windows.push(window)
    if (this.onCreate) this.onCreate(window)
  }

  removeWindow(window) {
    let index = this.windows.indexOf(window)
    this.windows.splice(index, 1)
  }

  onMouseDown(e) {
    this.startPosition = createVector(mouseX, mouseY)
    this.state = WindowManagerState.DRAWING
  }

  onMouseUp(e) {
    this.state = WindowManagerState.NONE
    this.createWindow()
  }

  on(event, callback) {
    if (event === 'create') this.onCreate = callback
  }
}
