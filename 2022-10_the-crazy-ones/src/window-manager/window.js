class Window {
  static TITLE_BAR_HEIGHT = 40
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    if (width < 0) this.x += width
    if (height < 0) this.y += height
    this.width = abs(width)
    this.height = abs(height)
    this.graphics = createGraphics(this.width, this.height - Window.TITLE_BAR_HEIGHT)
    this.name = ''
    this.clickTimer = 0
    this.drawer = null

    document.addEventListener('mousedown', () => {
      this.onMouseDown()
    })

    document.addEventListener('mouseup', () => {
      this.onMouseUp()
    })
  }

  draw() {
    push()
    translate(this.x, this.y)
    this.drawer?.draw()
    image(this.graphics, 0, Window.TITLE_BAR_HEIGHT)
    this.drawTitleBar()
    this.drawCloseButton()
    this.drawBorder()
    pop()

    this.clickTimer += deltaTime
  }

  drawTitleBar() {
    stroke('black')
    strokeWeight(3)
    fill('white')
    rect(0, 0, this.width, Window.TITLE_BAR_HEIGHT - 1)
    fill('black')
    noStroke()
    textSize(Window.TITLE_BAR_HEIGHT * 0.6)
    textFont(font)
    text(this.name, Window.TITLE_BAR_HEIGHT / 4, Window.TITLE_BAR_HEIGHT * 0.7)
  }

  drawCloseButton() {
    push()
    translate(this.width - Window.TITLE_BAR_HEIGHT, 0)
    fill(this.isMouseOverCloseButton() ? 'gray' : 'black')
    noStroke()
    let gap = Window.TITLE_BAR_HEIGHT * 0.15
    rect(gap, gap, Window.TITLE_BAR_HEIGHT - gap * 2, Window.TITLE_BAR_HEIGHT - gap * 2)
    noFill()
    stroke('white')
    strokeWeight(gap * 0.5)
    line(2 * gap, 2 * gap, Window.TITLE_BAR_HEIGHT - 2 * gap, Window.TITLE_BAR_HEIGHT - 2 * gap)
    line(Window.TITLE_BAR_HEIGHT - 2 * gap, gap * 2, gap * 2, Window.TITLE_BAR_HEIGHT - 2 * gap)
    pop()
  }

  drawBorder() {
    noFill()
    stroke('black')
    strokeWeight(5)
    rect(0, 0, this.width, this.height)
  }

  isMouseOverCloseButton() {
    return (
      mouseX > this.x + this.width - Window.TITLE_BAR_HEIGHT &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + Window.TITLE_BAR_HEIGHT &&
      windowManager.state == WindowManagerState.NONE
    )
  }

  isMouseOverTitleBar() {
    return (
      mouseX > this.x &&
      mouseX < this.x + this.width - Window.TITLE_BAR_HEIGHT &&
      mouseY > this.y &&
      mouseY < this.y + Window.TITLE_BAR_HEIGHT &&
      windowManager.state == WindowManagerState.NONE
    )
  }

  onMouseDown(e) {
    this.clickTimer = 0
    if (this.isMouseOverTitleBar()) {
      windowManager.state = WindowManagerState.NONE
    }
  }

  onMouseUp(e) {
    if (this.clickTimer > 300) return
    if (this.isMouseOverCloseButton()) {
      windowManager.removeWindow(this)
    }
  }
}
