class Projectile {
	constructor({ position, damage }) {
		this.position = position
		this.damage = damage	
		this.width = 3
		this.height = 10

		this.radius = 3

		this.velocity = {
			x: 0,
			y: -10,
		}

		this.enemyHited = false
	}

	update() {
		this.draw()

		this.move()
	}

	draw() {
		// c.fillRect(this.position.x, this.position.y, this.width, this.height)
		c.beginPath()
		c.arc(this.position.x, this.position.y, this.radius, 0, fullRadian)
		c.fillStyle = "rgb(255, 0, 0)"
		c.fill()
		c.closePath()
	}

	move() {
		this.position.y += this.velocity.y
		this.position.x += this.velocity.x
	}
}