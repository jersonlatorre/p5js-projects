let scene, camera, renderer, stats
let nextPos
let currentPos
let count = 0
let controls

function setup() {
  noCanvas()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 5)
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0xffffff, 1)
  document.body.appendChild(renderer.domElement)
  scene = new THREE.Scene()

  stats = new Stats()
  stats.showPanel(0)
  document.body.appendChild(stats.dom)

  currentPos = new THREE.Vector3(0, 0, 0)

  controls = new THREE.OrbitControls(camera, renderer.domElement)
}

function draw() {
  stats.begin()
  renderer.render(scene, camera)
  camera.lookAt(new THREE.Vector3())

  addLine()
  stats.end()
  controls.update()
}

function addLine() {
  if (count >= 5000) return
  let direction = new THREE.Vector3().randomDirection()
  nextPos = currentPos.clone().add(direction.multiplyScalar(0.1))
  let color = new THREE.Color()
  color.setHSL((count % 100) / 100, 0.5, 0.5)
  new Line(currentPos, nextPos, color, 10)
  currentPos.copy(nextPos)
  count++
}

function windowResized() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
