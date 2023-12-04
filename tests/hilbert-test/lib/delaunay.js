import Delaunator from 'delaunator'
import p from 'p5-sketch'

export default class Delaunay {
  static getTriangles(points) {
    let expandedPoints = []
    points.forEach((point) => {
      expandedPoints.push(point.x, point.y)
    })

    let delaunay = Delaunator.from(expandedPoints)

    console.log(delaunay);
    let triangles = []
    for (let i = 0; i < delaunay.triangles.length; i += 6) {
      let p1 = p.createVector(delaunay.triangles[i], delaunay.triangles[i + 1])
      let p2 = p.createVector(
        delaunay.triangles[i + 2],
        delaunay.triangles[i + 3]
      )
      let p3 = p.createVector(
        delaunay.triangles[i + 4],
        delaunay.triangles[i + 5]
      )
      triangles.push([p1, p2, p3])
    }

    return triangles
  }
}
