class Line {
  constructor(p1, p2, color, linewidth) {
    this.p1 = p1
    this.p2 = p2
    this.geometry = new THREE.LineGeometry()
    this.material = new THREE.LineMaterial({
      color: color,
      linewidth: linewidth,
    })
    this.material.resolution.set(window.innerWidth, window.innerHeight)
    this.positions = []
    this.positions.push(p1.x, p1.y, p1.z)
    this.positions.push(p2.x, p2.y, p2.z)
    this.geometry.setPositions(this.positions)
    this.line = new THREE.Line2(this.geometry, this.material)
    this.line.computeLineDistances()
    this.line.scale.set(1, 1, 1)
    scene.add(this.line)
  }
}
