// blur filter
function blur(data, n) {
  const kernel = createSharpeningKernel(data, n)
  const result = []

  for (let i = 0; i < n; i++) {
    let sum = 0

    for (let j = 0; j < kernel.length; j++) {
      const idx = Math.floor((i - kernel.length / 2 + j + data.length) % data.length)
      sum += kernel[j] * data[idx]
    }

    result.push(sum)
  }

  return normalize(result)
}

function createSharpeningKernel(data, n) {
  const m = data.length
  const kernelSize = m - n + 1
  const kernel = new Array(kernelSize).fill(-1)
  kernel[p.floor(kernelSize / 2)] = m
  return kernel
}

// media móvil
function convolute(data, n) {
  let result = []
  let m = data.length
  let window = m - n + 1
  for (let i = 0; i < n; i++) {
    let selection = data.slice(i, i + window)
    let mean = selection.reduce((a, b) => a + b, 0) / n
    result.push(mean)
  }

  return normalize(result)
}

// normalize array
function normalize(arr) {
  const minVal = Math.min(...arr)
  const maxVal = Math.max(...arr)
  return arr.map((num) => (num - minVal) / (maxVal - minVal))
}

// get color from parameter
let colormap = ['rgb(0, 0, 15)', 'rgb(32, 0, 140)', 'rgb(204, 0, 119)', 'rgb(255, 215, 0)', 'rgb(255, 255,255)']
function getColor(t) {
  var n = colormap.length - 1
  var i = Math.floor(t * n)
  var f = t * n - i
  var val = 0

  if (t < 0) {
    val = colormap[0]
  } else if (t >= 1) {
    val = colormap[n]
  } else {
    val = p.lerpColor(p.color(colormap[i]), p.color(colormap[i + 1]), f)
  }

  return val
}
