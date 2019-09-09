let w = 640
let h = 480

class PoseSmoother {
  constructor(smoothRate) {
    this.smoothRate = smoothRate
    this.smoothedPose = {
      leftAnkle: {
        x: w / 2,
        y: h / 2,
        confidence: 0
      },
      leftEar: {
        x: w / 2,
        y: h / 2,
        confidence: 0
      },
      leftElbow: {
        x: w / 2,
        y: h / 2,
        confidence: 0
      },
      leftEye: {
        x: w / 2,
        y: h / 2,
        confidence: 0
      },
      leftHip: {
        x: w / 2,
        y: h / 2,
        confidence: 0
      },
      leftKnee: {
        x: w / 2,
        y: h / 2,
        confidence: 0
      },
      leftShoulder: {
        x: w / 2,
        y: h / 2,
        confidence: 0
      },
      leftWrist: {
        x: w / 2,
        y: h / 2,
        confidence: 0
      },
      nose: {
        x: w / 2,
        y: h / 2,
        confidence: 0
      },
      rightAnkle: {
        x: w / 2,
        y: h / 2,
        confidence: 0
      },
      rightEar: {
        x: w / 2,
        y: h / 2,
        confidence: 0
      },
      rightElbow: {
        x: w / 2,
        y: h / 2,
        confidence: 0
      },
      rightEye: {
        x: w / 2,
        y: h / 2,
        confidence: 0
      },
      rightHip: {
        x: w / 2,
        y: h / 2,
        confidence: 0
      },
      rightKnee: {
        x: w / 2,
        y: h / 2,
        confidence: 0
      },
      rightShoulder: {
        x: w / 2,
        y: h / 2,
        confidence: 0
      },
      rightWrist: {
        x: w / 2,
        y: h / 2,
        confidence: 0
      }
    }
  }

  smoothPose(pose) {
    if (pose == null) return this.smoothedPose

    if (this.smoothRate < 0) this.smoothRate = 0
		if (this.smoothRate > 1) this.smoothRate = 1
		
    for (let key in this.smoothedPose) {
      this.smoothedPose[key].x +=
        (1 - this.smoothRate) * (pose[key].x - this.smoothedPose[key].x)
      this.smoothedPose[key].y +=
        (1 - this.smoothRate) * (pose[key].y - this.smoothedPose[key].y)
    }

    return this.smoothedPose
  }
}
