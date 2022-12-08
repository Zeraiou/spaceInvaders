class Monster extends Sprite {
	constructor({ position, image, scaleWidth, scaleHeight, index }) {
		super({ position, image, scaleWidth, scaleHeight })

		this.velocity = {
			x: 1,
			y: 0,
		}

		this.movementHorinzontal = 31
		this.movementVertical = 39

		this.hitbox = {
			position: {
				x: this.position.x + 0,
				y: this.position.y + 8,
			}, 
			width: this.width,
			height: 23,
		}

		this.index = index
	}

	update() {
		super.draw()
		// this.drawFullImage()

		this.updateHitbox() 
		// this.drawHitbox()
		// this.move()
	}

	drawFullImage() {
		c.fillStyle = "rgba(110, 0, 20, 0.3)"

		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}

	updateHitbox() {
		this.hitbox = {
			position: {
				x: this.position.x,
				y: this.position.y + 8,
			}, 
			width: this.width,
			height: 23,
		}
	}

	drawHitbox() {
		c.fillStyle = "rgba(110, 0, 20, 0.3)"

		c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
	}

	move() {
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
	}
}