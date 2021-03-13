class Box {
  constructor(i, j) {
    this.i = i
    this.j = j
    this.isSelected = false
  }

  draw() {
    let x = 40 + 50 * this.i
    let y = 40 + 50 * this.j

    stroke('#666')

    if (this.isSelected) {
      fill('black')
    } else {
      fill('white')
    }
    rect(x, y, 50)
  }

  mousePressed(mx, my) {
    let x = 40 + 50 * this.i
    let y = 40 + 50 * this.j
    if (x > mx && x < mx + 50 && y > my && y < my + 50) {
      console.log(this.i, this.j)
      this.isSelected = !this.isSelected
    }
  }
}
