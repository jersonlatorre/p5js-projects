class MetaBalls {
	constructor(_parentDiv, _colors, _backgroundColor) {
		this.sketch = function(p) {
			let parentDiv = _parentDiv
			let ballsInfo = [
				{ ox: 83 - 550, oy: 410 - 500, radius: 180 },
				{ ox: 287 - 550, oy: 370 - 500, radius: 110 },
				{ ox: 381 - 550, oy: 210 - 500, radius: 180 },
				{ ox: 655 - 550, oy: 120 - 500, radius: 150 },
				{ ox: 350 - 550, oy: 600 - 500, radius: 85 },
				{ ox: 465 - 550, oy: 420 - 500, radius: 200 },
				{ ox: 655 - 550, oy: 325 - 500, radius: 175 },
				{ ox: 355 - 550, oy: 465 - 500, radius: 110 },
				{ ox: 570 - 550, oy: 350 - 500, radius: 110 },
				{ ox: 550 - 550, oy: 330 - 500, radius: 110 }
			]

			class BubbleState {}
			BubbleState.NONE = 0
			BubbleState.FLEE = 1
			BubbleState.FADE = 2

			let bubbles
			let bound
			let bubblesShader
			let opacity = 1
			let state = BubbleState.NONE
			let colors = _colors
			let currentIndex = 0

			let bubblesPosition = p.createVector()
			let bubblesScale = 0

			p.preload = () => {
				bubblesShader = p.loadShader('../shaders/bubbles.vert', '../shaders/bubbles.frag')
			}

			p.setup = () => {
				p.pixelDensity(1)
				let canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)

				let gl = canvas.drawingContext
				gl.enable(gl.BLEND)
				p.setAttributes('antialias', true)
				updateBubblesPosition()
				bubbles = new Bubbles(bound.left + bound.width / 2, bound.top + bound.height / 2, bound.width / 1200)
			}

			p.draw = () => {
				updateBubblesPosition()
				p.shader(bubblesShader)
				bubblesShader.setUniform('backgroundColorR', _backgroundColor[0])
				bubblesShader.setUniform('backgroundColorG', _backgroundColor[1])
				bubblesShader.setUniform('backgroundColorB', _backgroundColor[2])

				bubblesShader.setUniform('iResolution', [ p.width, p.height ])
				bubblesShader.setUniform('iTime', p.millis() / 1000)
				bubblesShader.setUniform('iMouse', [ p.mouseX / p.height, 1 - p.mouseY / p.height ])

				for (let i = 0; i < ballsInfo.length; i++) {
					if (bubbles.frontBalls[i]) {
						bubblesShader.setUniform('frontPosition' + i, [
							bubbles.frontBalls[i].position.x / p.height,
							1 - bubbles.frontBalls[i].position.y / p.height
						])
						bubblesShader.setUniform('radius' + i, 0.2 * bubbles.frontBalls[i].radius / p.height)
					}
				}

				for (let i = 0; i < ballsInfo.length; i++) {
					if (bubbles.backBalls[i]) {
						bubblesShader.setUniform('backPosition' + i, [
							bubbles.backBalls[i].position.x / p.height,
							1 - bubbles.backBalls[i].position.y / p.height
						])
					}
				}

				bubblesShader.setUniform('colorFrontR', colors[currentIndex][0])
				bubblesShader.setUniform('colorFrontG', colors[currentIndex][1])
				bubblesShader.setUniform('colorFrontB', colors[currentIndex][2])

				if (currentIndex == colors.length - 1) {
					bubblesShader.setUniform('colorBackR', colors[0][0])
					bubblesShader.setUniform('colorBackG', colors[0][1])
					bubblesShader.setUniform('colorBackB', colors[0][2])
				} else {
					bubblesShader.setUniform('colorBackR', colors[currentIndex + 1][0])
					bubblesShader.setUniform('colorBackG', colors[currentIndex + 1][1])
					bubblesShader.setUniform('colorBackB', colors[currentIndex + 1][2])
				}

				bubblesShader.setUniform('opacity', opacity)
				bubbles.update()

				p.clear()
				p.fill(0)
				p.noStroke()
				p.rect(0, 0, 1, 1)
			}

			p.reset = () => {
				bubbles.reset()
			}

			p.windowResized = () => {
				p.resizeCanvas(p.windowWidth, p.windowHeight)
				bubbles.reset()
			}

			function updateBubblesPosition() {
				bound = parentDiv.getBoundingClientRect()
				bubblesPosition = p.createVector(bound.left + bound.width / 2, bound.top + bound.height / 2)
				bubblesScale = bound.width / 1200
			}

			/**
	 * BUBBLES
	 */
			class Bubbles {
				constructor(x, y) {
					this.initialPosition = new p5.Vector(x, y)
					this.FLEE_DURATION = 3
					this.backBalls = []
					this.frontBalls = []

					this.reset()
				}

				reset() {
					this.position = this.initialPosition
					this.frontBalls = []
					this.backBalls = []

					this.timer = 0
					state = BubbleState.NONE
					opacity = 1

					setTimeout(() => {
						ballsInfo.forEach((ballInfo, i) => {
							this.backBalls.push(
								new Ball(
									ballInfo.ox + ballInfo.radius,
									ballInfo.oy + ballInfo.radius,
									ballInfo.radius,
									i
								)
							)
							this.frontBalls.push(
								new Ball(
									ballInfo.ox + ballInfo.radius,
									ballInfo.oy + ballInfo.radius,
									ballInfo.radius,
									i
								)
							)
						})

						state = BubbleState.APPEAR
					}, 1000)
				}

				update() {
					switch (state) {
						case BubbleState.APPEAR: {
							break
						}

						case BubbleState.NONE: {
							let distance = bubblesPosition.copy().sub(p.createVector(p.mouseX, p.mouseY)).mag()
							if (distance < 600 * bubblesScale) {
								state = BubbleState.FLEE
							}
							break
						}

						case BubbleState.FLEE: {
							this.timer += p.deltaTime / 1000
							if (this.timer > this.FLEE_DURATION) {
								this.timer = 0
								state = BubbleState.FADE
							}
							break
						}

						case BubbleState.FADE: {
							opacity = p.lerp(opacity, 0, 0.1)
							if (opacity < 0.01) {
								opacity = 1
								currentIndex++
								if (currentIndex == colors.length) currentIndex = 0

								for (let i = 0; i < this.backBalls.length; i++) {
									this.frontBalls[i] = this.backBalls[i]
								}

								this.backBalls = []

								ballsInfo.forEach((ballInfo, i) => {
									let ball = new Ball(
										ballInfo.ox + ballInfo.radius,
										ballInfo.oy + ballInfo.radius,
										ballInfo.radius,
										i
									)
									ball.angle = this.frontBalls[i].angle
									this.backBalls.push(ball)
								})

								state = BubbleState.NONE
							}
							break
						}
					}

					this.frontBalls.forEach((ball) => {
						ball.update()
					})

					this.backBalls.forEach((ball) => {
						ball.updateWithoutMouseInteraction()
					})
				}
			}

			/**
	 * BALL
	 */
			class Ball {
				constructor(ox, oy, radius, index) {
					this.RADIUS = radius * 2
					this.radius = 0
					this.offset = p.createVector(ox, oy)
					this.position = bubblesPosition.copy().add(this.offset.copy().mult(bubblesScale))
					this.velocity = p.createVector()
					this.angle = 2 * p.PI * p.noise(index, 1)
					this.t = 0
				}

				elastic(t) {
					if (t == 0) return 0
					if (t == 1) return 1
					return p.pow(2, -10 * t) * p.sin((10 * t - 0.75) * 0.666666 * p.PI) + 1
				}

				updateWithoutMouseInteraction() {
					this.radius = this.RADIUS * bubblesScale
					let displace = 40 * bubblesScale
					let direction = p.createVector(displace * p.cos(this.angle), displace * p.sin(this.angle))
					this.position = bubblesPosition.copy().add(this.offset.copy().mult(bubblesScale)).add(direction)
					this.angle += 0.015
				}

				update() {
					this.radius = this.RADIUS * bubblesScale

					switch (state) {
						case BubbleState.APPEAR: {
							this.updateWithoutMouseInteraction()
							this.radius = p.lerp(0, this.RADIUS * bubblesScale, this.elastic(this.t))
							this.t += 0.02

							if (this.t >= 1) {
								state = BubbleState.NONE
							}
							break
						}

						case BubbleState.NONE: {
							this.updateWithoutMouseInteraction()
							break
						}

						case BubbleState.FLEE:
						case BubbleState.FADE: {
							if (p.dist(this.position.x, this.position.y, p.mouseX, p.mouseY) < this.radius) {
								let mousePosition = p.createVector(p.mouseX, p.mouseY)
								let desired = this.position
									.copy()
									.sub(mousePosition)
									.normalize()
									.mult(this.radius / 120)
								let steer = desired.copy().sub(this.velocity).limit(this.radius / 800)
								this.velocity.add(steer)
							}

							this.position.add(this.velocity)
							this.velocity.mult(0.99)

							break
						}
					}
				}
			}
		}

		this.p5js = new p5(this.sketch, _parentDiv)
	}

	reset() {
		this.p5js.reset()
	}
}
