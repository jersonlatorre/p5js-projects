let agent
let target
let starfield
let simplex

function setup() {
	pixelDensity(1)
	createCanvas(800, 800, WEBGL)
	setAttributes('antialias', true)

  simplex = openSimplexNoise(0)
	agent = new Agent()
	target = new Target()
	starfield = new Starfield()
}

function draw() {
	background('black')

	push()
	rotateY(millis() / 8000)
  target.draw()
  agent.draw()
	starfield.draw()
	pop()
}

class Target {
	constructor() {
		this.position = createVector(0, 0, 0)
	}

	draw() {
		let t = millis() / 2000
		this.position.x = (width / 2) * simplex.noise2D(t, 0)
		this.position.y = (width / 2) * simplex.noise2D(t + 10, 0)
		this.position.z = (width / 2) * simplex.noise2D(t + 20, 0)
		push()
		translate(this.position.x, this.position.y, this.position.z)
		noStroke()
		fill('green')
		sphere(8)
		pop()
	}
}

class Agent {
  constructor() {
    this.position = createVector(0, 0, 0)
    this.velocity = createVector(1, 0, 0) 
    this.desired = createVector(0, 0, 0)
    this.steer = createVector(0, 0, 0)
    this.maxSteer = 0.1
		this.maxForce = 5
	}

  draw() {
    this.desired = p5.Vector.sub(target.position, this.position).normalize().mult(this.maxForce)
    this.steer = p5.Vector.sub(this.desired, this.velocity).limit(this.maxSteer)
    this.velocity.add(this.steer)
    this.position.add(this.velocity)

    push()
    translate(this.position.x, this.position.y, this.position.z)
    noStroke()
    fill('yellow')
    sphere(8)
		pop()
		
    let p = this.position
		strokeWeight(3)

		// dibuja el deseado
		let d = p5.Vector.add(this.position, p5.Vector.mult(this.desired, 15))
		stroke('green')
		line(p.x, p.y, p.z, d.x, d.y, d.z)

    // dibuja la velocidad
    let v = p5.Vector.add(this.position, p5.Vector.mult(this.velocity, 15))
    stroke('blue')
		line(p.x, p.y, p.z, v.x, v.y, v.z)
		
		// dibuja el steer
		let s = p5.Vector.add(v, p5.Vector.mult(this.steer, 100))
		stroke('red')
		line(v.x, v.y, v.z, s.x, s.y, s.z)
  }
}

class Starfield {
	constructor() {
		this.stars = []
		for (let i = 0; i < 2000; i++) {
			this.stars.push({
				x: random(-width, width),
				y: random(-width, width),
				z: random(-width, width)
			})
		}
	}

	draw() {
		this.stars.forEach(star => {
			push()
      translate(star.x, star.y, star.z)
			stroke('white')
			ellipse(0, 0, 0.05, 0.05)
      pop()
		})
	}
}
