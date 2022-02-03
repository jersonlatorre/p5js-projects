
// easeIn ---> acelerar
function easeIn(t) {
	return pow(t, 3)
}

// easeOut ---> descacelerar
function easeOut(t) {
	return 1 - pow(1 - t, 3)
}

// easeInOut ---> acelerar/desacelerar
function easeInOut(t) {
	return t < 0.5 ? 4 * pow(t, 3) : 1 - pow(-2 * t + 2, 3) / 2
}

// easeInBack	---> anticipación del movimiento
function easeInBack(t) {
	return 2.70158 * pow(t, 3) - 1.70158 * pow(t, 2)
}

// easeOutBack ---> continúa el movimiento
function easeOutBack(t) {
	return 1 + 2.70158 * pow(t - 1, 3) + 1.70158 * pow(t - 1, 2)
}

// parabolic ---> retorna al valor inicial
function parabolic(t) {
	return 4 * t - 4 * t * t
}

// elastic ---> efecto resorte
function elastic(t) {
	if (t == 0) return 0
	if (t == 1) return 1
	return pow(2, -10 * t) * sin((10 * t - 0.75) * 0.666666 * PI) + 1
}

// bounce ---> efecto salto
function bounce(t) {
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