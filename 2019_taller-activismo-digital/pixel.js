class Pixel {
  constructor(i, j) {
    this.i = i
    this.j = j
    let offsetX = 0.5 * (width - DISTANCE * W + DISTANCE)
    let offsetY = 0.5 * (height - DISTANCE * H + DISTANCE)
    this.x = i * DISTANCE + offsetX
    this.y = j * DISTANCE + offsetY
    this.t = 0
    this.dt = random(0.15, 0.3)
    this.currentFrame = 0

    this.FADE_IN = 0
    this.FADE_OUT = 1
    this.SHOW = 2
    this.state = this.SHOW
  }

  draw() {
    let c = images[this.currentFrame][this.i][this.j]
    let b = brightness(c)
    let m = millis() / 300

    push()
    let d = this.squaredDistance(this.x, this.y, mouseX, mouseY)
    if (d <= 3600) {
      let f = 1 - d / 3600
      f *= f
      let v = f * 5 * (1 - this.t)

      let n1 = simplex.noise3D(this.i, this.j, m)
      let n2 = simplex.noise3D(this.i, this.j, m + 1)

      translate(v * n1, v * n2)
    }

    switch (this.state) {
      case this.SHOW: {
        push()
        translate(this.x - width * 0.5, this.y - height * 0.5)

        if (b == 0) {
          image(negro, 0, 0)
        } else {
          image(blanco, 0, 0)
        }
        pop()
        break
      }

      case this.FADE_OUT: {
        push()
        translate(this.x - width * 0.5, this.y - height * 0.5)

        scale(1 - this.t)
        this.t += this.dt
        if (this.t >= 1) {
          this.t = 0
          this.state = this.FADE_IN
          this.currentFrame++
          if (this.currentFrame == images.length) this.currentFrame = 0
        }

        if (b == 0) {
          image(negro, 0, 0)
        } else {
          image(blanco, 0, 0)
        }
        pop()
        break
      }

      case this.FADE_IN: {
        push()
        translate(this.x - width * 0.5, this.y - height * 0.5)

        this.t += this.dt
        scale(this.t)

        if (this.t >= 1) {
          this.t = 1
          this.state = this.SHOW
          transformedPixels++
        }

        if (b == 0) {
          image(negro, 0, 0)
        } else {
          image(blanco, 0, 0)
        }
        pop()

        break
      }
    }
    pop()
  }

  squaredDistance(x1, y1, x2, y2) {
    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
  }

  startTransform() {
    let c1
    let c2
    if (this.currentFrame + 1 == images.length) {
      c1 = brightness(images[this.currentFrame][this.i][this.j])
      c2 = brightness(images[0][this.i][this.j])
    } else {
      c1 = brightness(images[this.currentFrame][this.i][this.j])
      c2 = brightness(images[this.currentFrame + 1][this.i][this.j])
    }

    if (c1 != c2) {
      this.t = 0
      this.state = this.FADE_OUT
    } else {
      this.state = this.SHOW
      this.currentFrame++
      if (this.currentFrame == images.length) this.currentFrame = 0
      transformedPixels++
    }
  }
}
