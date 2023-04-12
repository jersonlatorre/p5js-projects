let rawData, n
let data = []
let maxDeep = -9999999
let minDeep = 9999999
let maxMagnitude = -9999999
let minMagnitude = 9999999
let myMap
let canvas
const mappa = new Mappa('Leaflet')
const options = {
  lat: -11,
  lng: -80,
  zoom: 5,
  style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
}
let currentYear = 2007

function preload() {
  rawData = loadTable('data/datos.csv', 'csv', 'header')
}

function setup() {
  canvas = createCanvas(600, 600)
  myMap = mappa.tileMap(options)
  myMap.overlay(canvas)
  n = rawData.getRowCount()
  colorMode(HSB)

  for (let i = 0; i < n; i++) {
    let date = rawData.getRow(i).arr[0]
    let latitude = rawData.getRow(i).arr[2]
    let longitude = rawData.getRow(i).arr[3]
    let deep = rawData.getRow(i).arr[4]
    let magnitude = rawData.getRow(i).arr[5]

    if (deep < minDeep) minDeep = deep
    if (deep > maxDeep) maxDeep = deep
    if (magnitude < minMagnitude) minMagnitude = magnitude
    if (magnitude > maxMagnitude) maxMagnitude = magnitude

    let dataItem = {
      date: date,
      lat: latitude,
      lng: longitude,
      deep: deep,
      magnitude: magnitude,
    }

    data.push(dataItem)
  }
}

function draw() {
  // background('yellow')
  clear()
  currentYear = floor(map(mouseX, 0, width, 1970, 2021))

  data.forEach((item) => {
    let date = item.date
    let latitude = item.lat
    let longitude = item.lng
    let deep = item.deep
    let magnitude = item.magnitude

    if (getYear(date) != currentYear) return

    let hue = map(deep, minDeep, maxDeep, 360, 0)
    let size = map(magnitude, minMagnitude, maxMagnitude, 0.1, 4) * myMap.zoom()
    size = 2 * (2 ^ size)

    const point = myMap.latLngToPixel(latitude, longitude)
    // noStroke()
    noFill()
    stroke(hue, 100, 100, 1)
    circle(point.x, point.y, size)
    fill(0)
    noStroke()
    text(currentYear, 20, 580)
  })

  // if (data.length > 0) noLoop()
}

function getYear(stringDate) {
  let arrayDate = stringDate.split('/')
  let year = parseInt(arrayDate[2])
  return year
}
