export default class Graph {
   constructor() {
      this.nodes = []
      this.matrix = []
   }

   addNode(node) {
      // inserta el nodo nuevo
      this.nodes.push(node)

      // redimensionar el arreglo matrix
      // 1. crea un arreglo vacío
      let newRow = []
      
      // 2. se llena de n ceros 
      let n = this.nodes.length
      for (let i = 0; i < n; i++) {
         newRow.push(0)
      }

      // 3. se agrega la nueva fila a matrix
      this.matrix.push(newRow)

      // 4. se agrega un cero a cada fila
      for (let i = 0; i < this.matrix.length; i++) {
         this.matrix[i].push(0)
      }
   }

   addConnection(i, j) {
      this.matrix[i][j] = 1
      this.matrix[j][i] = 1
   }

   getNeighbors(i) {
      // 1. se obtienen las conexiones de i
      let connections = this.matrix[i]

      // 2. se llena un arreglo de vecinos con solo
      // las conexiones que tengan el valor de uno
      let neighbors = []

      for (let index = 0; index < connections.length; index++) {
         if (connections[index] == 1) {
            neighbors.push(index)
         }
      }

      // 3. se retorna el arreglo de vecinos
      return neighbors
   }

   areConnected(i, j) {
      return this.matrix[i][j] == 1
   }
}