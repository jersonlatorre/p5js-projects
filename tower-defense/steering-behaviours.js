class SteeringBehaviours {
	static seek(agent, targetPosition) {
		let desired = p5.Vector.sub(targetPosition, agent.position).normalize().mult(agent.maxForce)
		let steer = p5.Vector.sub(desired, agent.velocity).limit(agent.maxSteer)
		return steer
	}

	static arrive(agent, targetPosition, range) {
		let desired
		let v = p5.Vector.sub(targetPosition, agent.position)
		let d = v.mag()

		if (d > range) {
			desired = v.normalize().mult(agent.maxForce)
		} else {
			desired = v.normalize().mult(agent.maxForce * d / range)
		}

		return p5.Vector.sub(desired, agent.velocity).limit(agent.maxSteer)
	}
}
