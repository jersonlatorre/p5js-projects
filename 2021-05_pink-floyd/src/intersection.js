function intersect(line1, line2) {
  let x1 = line1[0]
  let y1 = line1[1]
  let f1 = line1[2] - line1[0]
  let g1 = line1[3] - line1[1]

  let x2 = line2[0]
  let y2 = line2[1]
  let f2 = line2[2] - line2[0]
  let g2 = line2[3] - line2[1]

  let det = f2 * g1 - f1 * g2
  if (det == 0) {
    return false
  }
  let dx = x2 - x1
  let dy = y2 - y1
  let t1 = (f2 * dy - g2 * dx) / det
  let t2 = (f1 * dy - g1 * dx) / det
  if (t1 > 0 && t1 < 1 && t2 > 0 && t2 < 1) {
    return { x: x1 + f1 * t1, y: y1 + g1 * t1 }
  } else {
    return false
  }
}
