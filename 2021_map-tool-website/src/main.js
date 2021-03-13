let buttonExport
let canvas
let boxes = []

function setup() {
  canvas = createCanvas(1200, 1050)
  canvas.parent('canvas')

  buttonExport = createButton('Exportar')
  buttonExport.position(340, 460)
  buttonExport.size(100, 40)
  buttonExport.parent('canvas')
  buttonExport.mousePressed(() => {
    saveStrings(Global.map, 'mapa.txt')
  })

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      boxes.push(new Box(i, j))
    }
  }
}

function draw() {
  background('#ccc')
  rect(40, 40, 400, 400)

  boxes.forEach((box) => {
    box.draw()
  })
}

function mousePressed(e) {
  Global.map = []
  boxes.forEach((box) => {
    box.mousePressed(e.layerX - 50, e.layerY - 50)
    if(box.isSelected) {
      Global.map.push(box.i + ',' + box.j)
    }
  })

  console.log(Global.map)
}
