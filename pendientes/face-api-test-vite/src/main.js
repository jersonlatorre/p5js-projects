import p5 from 'p5'
import * as faceapi from 'face-api.js'
import { PCA } from 'ml-pca'

new p5((p) => {
  let video
  let modelLoaded = false
  let targetDescriptor
  let descriptor = new Array(128).fill(0)
  let N = 8

  p.setup = () => {
    p.createCanvas(640, 480)
    video = p.createCapture(p.VIDEO, onVideoCreated)
    video.size(p.width, p.height)
    video.hide()
    p.textAlign(p.CENTER, p.TOP)
  }

  function onVideoCreated() {
    console.log('video created')
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('weights/tiny_face_detector_model-weights_manifest.json'),
      faceapi.nets.faceLandmark68Net.loadFromUri('weights/face_landmark_68_model-weights_manifest.json'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('/weights/ssd_mobilenetv1_model-weights_manifest.json'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/weights/face_recognition_model-weights_manifest.json'),
    ])
      .then(() => {
        console.log('model loaded')
        readData()
      })
      .catch((e) => console.log(e))
  }

  async function readData() {
    let faceDetection = await faceapi.detectSingleFace(video.elt).withFaceLandmarks().withFaceDescriptor()
    if (faceDetection) {
      targetDescriptor = normalize(faceDetection.descriptor)
      // let data = [targetDescriptor]
      // const pca = new PCA(data)
      // pca.train()
      // const reduced = pca.predict(data, { nComponents: N })
      // targetDescriptor
      // targetDescriptor = convolute(faceDetection.descriptor, N)
    }
    readData()
  }

  p.draw = () => {
    drawWebcam()
    if (!targetDescriptor) return
    calculateDescriptor()
    drawBarVisualization()
  }

  function drawWebcam() {
    p.clear()
    p.push()
    p.scale(-1, 1)
    p.translate(-p.width, 0)
    p.image(video, 0, 0)
    p.pop()
  }

  function calculateDescriptor() {
    for (let i = 0; i < targetDescriptor.length; i++) {
      descriptor[i] = p.lerp(descriptor[i], targetDescriptor[i], 0.05)
    }
  }

  function drawBarVisualization() {
    let w = p.width / targetDescriptor.length
    for (let i = 0; i < targetDescriptor.length; i++) {
      let v = descriptor[i]
      let c = getColor(v)
      c.setAlpha(200)
      p.fill(c)
      p.noStroke()
      p.rect(i * w, 0, w, p.height)
    }
  }

  function drawLineVisualization() {
    let w = p.width / targetDescriptor.length
    p.beginShape()
    p.fill(0, 200)
    p.vertex(0, p.height)
    for (let i = 0; i < targetDescriptor.length; i++) {
      let v = descriptor[i]
      p.vertex(i * w + w / 2, p.height - v * p.height)
    }
    p.vertex(p.width, p.height)
    p.endShape()
  }

  // blur filter
  function blur(data, n) {
    const kernel = createSharpeningKernel(data, n)
    const result = []

    for (let i = 0; i < n; i++) {
      let sum = 0

      for (let j = 0; j < kernel.length; j++) {
        const idx = Math.floor((i - kernel.length / 2 + j + data.length) % data.length)
        sum += kernel[j] * data[idx]
      }

      result.push(sum)
    }

    return normalize(result)
  }

  function createSharpeningKernel(data, n) {
    const m = data.length
    const kernelSize = m - n + 1
    const kernel = new Array(kernelSize).fill(-1)
    kernel[p.floor(kernelSize / 2)] = m
    return kernel
  }

  // media móvil
  function convolute(data, n) {
    let result = []
    let m = data.length
    let window = m - n + 1
    for (let i = 0; i < n; i++) {
      let selection = data.slice(i, i + window)
      let mean = selection.reduce((a, b) => a + b, 0) / n
      result.push(mean)
    }

    return normalize(result)
  }

  // normalize array
  function normalize(arr) {
    const minVal = Math.min(...arr)
    const maxVal = Math.max(...arr)
    return arr.map((num) => (num - minVal) / (maxVal - minVal))
  }

  // get color from parameter
  let colormap = ['rgb(0, 0, 15)', 'rgb(32, 0, 140)', 'rgb(204, 0, 119)', 'rgb(255, 215, 0)', 'rgb(255, 255,255)']
  function getColor(t) {
    var n = colormap.length - 1
    var i = Math.floor(t * n)
    var f = t * n - i
    var val = 0

    if (t < 0) {
      val = colormap[0]
    } else if (t >= 1) {
      val = colormap[n]
    } else {
      val = p.lerpColor(p.color(colormap[i]), p.color(colormap[i + 1]), f)
    }

    return val
  }
})
