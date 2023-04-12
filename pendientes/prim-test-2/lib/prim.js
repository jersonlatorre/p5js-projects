class Prim {
  generateTree(points) {
    let selected = []
    let noSelected = [...Array(points.length).keys()]
    let edges = []

    let randomIndex = parseInt(random(points.length))
    noSelected.splice(noSelected.indexOf(randomIndex), 1)
    selected.push(randomIndex)

    // mientras aún hayan no seleccionados
    while (noSelected.length > 0) {
      // se selecciona el edge con menor distancia entre seleccionados y no seleccionados
      let minDistance = Number.MAX_SAFE_INTEGER
      let minEdge = []
      for (let j = 0; j < selected.length; j++) {
        for (let k = 0; k < noSelected.length; k++) {
          let pj = points[selected[j]]
          let pk = points[noSelected[k]]
          let distance = pj.copy().sub(pk).magSq()
          if (distance < minDistance) {
            minDistance = distance
            minEdge = [selected[j], noSelected[k]]
          }
        }
      }

      noSelected.splice(noSelected.indexOf(minEdge[1]), 1)
      selected.push(minEdge[1])
      edges.push(minEdge)
    }
    return edges
  }
}
