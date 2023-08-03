import p5 from 'p5'
import p from 'p5-sketch'

class Lerp {
  constructor(startValue, endValue, duration, easingType) {
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.easingType = easingType || 'linear'

    this.t = 0
    this.finished = false

    // dimension
    if (typeof startValue == 'number' && typeof endValue == 'number') {
      this.dimension = 'number'
    } else if (typeof startValue == 'object' && typeof endValue == 'object') {
      this.dimension = 'vector'
    } else {
      this.dimension = null
      throw new Error('Lerp.startValue and endValue must be numbers or objects')
    }
  }

  get() {
    // lerp with a fixed t
    if (arguments.length == 1) {
      this.t = arguments[0]
      this.t = p.constrain(this.t, 0, 1)
      if (this.onProcessCallback) this.onProcessCallback(this.t)
      return this.lerp(this.startValue, this.endValue, Easing[this.easingType](this.t))
    }

    // lerp
    if (!this.finished) {
      let delta = p.deltaTime / (this.duration * 1000)
      this.t += delta
      this.t = p.constrain(this.t, 0, 1)

      if (this.onProcessCallback) this.onProcessCallback(this.t)

      // complete
      if (this.t == 1) {
        this.finished = true
        this.t = 1
        if (this.onCompleteCallback) this.onCompleteCallback()
      }
    }

    return this.lerp(this.startValue, this.endValue, Easing[this.easingType](this.t))
  }

  onComplete(callback) {
    this.onCompleteCallback = callback
    return this
  }

  onProcess(callback) {
    this.onProcessCallback = callback
    return this
  }

  reset() {
    this.t = 0
    this.finished = false
  }

  lerp(startValue, endValue, t) {
    if (this.dimension == 'number') {
      return p.lerp(startValue, endValue, t)
    } else if (this.dimension == 'vector') {
      return p5.Vector.lerp(startValue, endValue, t)
    }
  }
}

class Easing {
  static linear(t) {
    return t
  }

  static easeIn(t) {
    return Math.pow(t, 3)
  }

  static easeOut(t) {
    return 1 - Math.pow(1 - t, 3)
  }

  static easeInOut(t) {
    return t < 0.5 ? 4 * Math.pow(t, 3) : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  static easeInBack(t) {
    return 2.70158 * Math.pow(t, 3) - 1.70158 * Math.pow(t, 2)
  }

  static easeOutBack(t) {
    return 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2)
  }

  static easeInOutBack(t) {
    const c1 = 1.70158
    const c2 = c1 * 1.525
    let value

    if (t < 0.5) {
      return ((2 * t) ** 2 * ((c2 + 1) * 2 * t - c2)) / 2
    } else {
      return ((2 * t - 2) ** 2 * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2
    }
  }

  static parabolic(t) {
    return 4 * t - 4 * t * t
  }

  static elastic(t) {
    if (t == 0) return 0
    if (t == 1) return 1
    return Math.pow(2, -10 * t) * Math.sin((10 * t - 0.75) * 0.666666 * Math.PI) + 1
  }

  static bounce(t) {
    const n1 = 7.5625
    const d1 = 2.75

    if (t < 1 / d1) {
      return n1 * t * t
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375
    }
  }
}

export { Lerp, Easing }