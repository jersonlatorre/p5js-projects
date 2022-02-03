class FullscreenWebcam {
  constructor(graphics) {
    this.webcam = createCapture(VIDEO)
    this.webcam.hide()
    this.graphics = createGraphics(windowWidth, windowHeight)
  }
  
  update() {
    let w, h, offsetX, offsetY

    if (windowWidth / windowHeight > this.webcam.width / this.webcam.height) {
      w = windowWidth
      h = windowWidth * this.webcam.height / this.webcam.width
      offsetX = 0
      offsetY = (windowHeight - h) / 2
    } else {
      w = windowHeight * this.webcam.width / this.webcam.height
      h = windowHeight
      offsetX = (windowWidth - w) / 2
      offsetY = 0
    }

    this.graphics.image(this.webcam, offsetX, offsetY, w, h)
  }
}
