import '@tensorflow/tfjs-core'
import '@tensorflow/tfjs-backend-webgl'
import '@mediapipe/pose'

import * as bodySegmentation from '@tensorflow-models/body-segmentation'
import * as poseDetection from '@tensorflow-models/pose-detection'

import p from 'p5-easy'

export default class PoseAnalyzer {
  constructor() {
    const model = poseDetection.SupportedModels.BlazePose

    const detectorConfig = {
      runtime: 'mediapipe',
      modelType: 'full',
      enableSmoothing: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      maxPoses: 1,
      refineSteps: 0,
      solutionPath: '../node_modules/@mediapipe/pose',
    }

    poseDetection.createDetector(model, detectorConfig).then((detector) => {
      this.detector = detector
    })

    this.maskCanvas = p.createGraphics(320, 240)
  }

  async getPose(input) {
    let estimationConfig = {
      flipHorizontal: true,
      enableSmoothing: true,
    }

    if (!this.detector) return
    const poses = await this.detector.estimatePoses(input.elt, estimationConfig)
    let estimate = poses[0]

    if (!estimate) return { mask: null, keypoints: [] }
    bodySegmentation
      .toBinaryMask(
        estimate.segmentation,
        { r: 0, g: 0, b: 0, a: 0 },
        { r: 255, g: 255, b: 255, a: 255 },
        false,
        0.5
      )
      .then((mask) => {
        if (mask) {
          if (mask.data.length > 0) {
            this.maskCanvas.clear()
            this.maskCanvas.loadPixels()
            this.maskCanvas.pixels.set(mask.data)
            this.maskCanvas.updatePixels()
          }
        }
      })

    return { mask: this.maskCanvas, keypoints: poses[0]?.keypoints }
  }
}
