class MinHeap {
  constructor() {
    this.array = []
  }

  // Obtiene el padre del nodo en el índice i
  getParent(i) {
    return Math.floor((i - 1) / 2)
  }

  // Obtiene el hijo izquierdo del nodo en el índice i
  getLeftChild(i) {
    return 2 * i + 1
  }

  // Obtiene el hijo derecho del nodo en el índice i
  getRightChild(i) {
    return 2 * i + 2
  }

  insert(item) {
    this.array.push(item)
    this.bubbleUp()
  }

  // Mueve el último elemento hacia arriba hasta que esté en la posición correcta
  bubbleUp() {
    let index = this.array.length - 1
    while (index > 0 && this.array[this.getParent(index)].dist > this.array[index].dist) {
      ;[this.array[this.getParent(index)], this.array[index]] = [
        this.array[index],
        this.array[this.getParent(index)],
      ]
      index = this.getParent(index)
    }
  }

  extractMin() {
    if (this.array.length === 0) return null
    if (this.array.length === 1) return this.array.pop()

    const min = this.array[0]
    this.array[0] = this.array.pop()
    this.bubbleDown()

    return min
  }

  // Mueve el primer elemento hacia abajo hasta que esté en la posición correcta
  bubbleDown() {
    let index = 0
    while (this.getLeftChild(index) < this.array.length) {
      let smallerChildIndex = this.getLeftChild(index)
      if (
        this.getRightChild(index) < this.array.length &&
        this.array[this.getRightChild(index)].dist < this.array[this.getLeftChild(index)].dist
      ) {
        smallerChildIndex = this.getRightChild(index)
      }

      if (this.array[index].dist <= this.array[smallerChildIndex].dist) break
      ;[this.array[smallerChildIndex], this.array[index]] = [
        this.array[index],
        this.array[smallerChildIndex],
      ]
      index = smallerChildIndex
    }
  }
}
