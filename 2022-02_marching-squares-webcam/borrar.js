let img
function preload() {
  img = loadImage('assets/rockies.jpg')
}
function setup() {
  image(img, 0, 0, width, height)
  let d = pixelDensity()
  let halfImage = 4 * (width * d) * (height * d / 2)
  loadPixels()
  for (let i = 0; i < halfImage; i++) {
    pixels[i + halfImage] = pixels[i]
  }
  updatePixels()
}
