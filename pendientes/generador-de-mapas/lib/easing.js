class Easing {
  // easeIn ---> acelerar
  static easeIn(t) {
    return pow(t, 3)
  }

  // easeOut ---> descacelerar
  static easeOut(t) {
    return 1 - pow(1 - t, 3)
  }

  // easeInOut ---> acelerar/desacelerar
  static easeInOut(t) {
    return t < 0.5 ? 4 * pow(t, 3) : 1 - pow(-2 * t + 2, 3) / 2
  }

  // easeInBack	---> anticipación del movimiento
  static easeInBack(t) {
    return 2.70158 * pow(t, 3) - 1.70158 * pow(t, 2)
  }

  // easeOutBack ---> continúa el movimiento
  static easeOutBack(t) {
    return 1 + 2.70158 * pow(t - 1, 3) + 1.70158 * pow(t - 1, 2)
  }

  // easeInOutBack ---> mezcla easeInBack y easeOutBack
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

  // parabolic ---> retorna al valor inicial
  static parabolic(t) {
    return 4 * t - 4 * t * t
  }

  // elastic ---> efecto resorte
  static elastic(t) {
    if (t == 0) return 0
    if (t == 1) return 1
    return pow(2, -10 * t) * sin((10 * t - 0.75) * 0.666666 * PI) + 1
  }

  // bounce ---> efecto salto
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
