// Importar Three.js
import * as THREE from 'three'

// Crear una escena
const scene = new THREE.Scene()

// Crear una cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

// Crear un renderizador
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Crear geometría y material para las partículas
const geometry = new THREE.BufferGeometry()
const material = new THREE.ShaderMaterial({
  vertexShader: `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `,
})

// Crear un conjunto de partículas
const particleCount = 10000
const positions = new Float32Array(particleCount * 3)

for (let i = 0; i < positions.length; i += 3) {
  positions[i] = (Math.random() - 0.5) * 10
  positions[i + 1] = (Math.random() - 0.5) * 10
  positions[i + 2] = (Math.random() - 0.5) * 10
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Crear el objeto de partículas
const particles = new THREE.Points(geometry, material)
scene.add(particles)

// Animación
const animate = () => {
  requestAnimationFrame(animate)

  // Rotar las partículas
  particles.rotation.x += 0.001
  particles.rotation.y += 0.001

  // Renderizar la escena
  renderer.render(scene, camera)
}

// Iniciar la animación
animate()
