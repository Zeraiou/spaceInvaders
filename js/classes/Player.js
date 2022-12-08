class Player extends Sprite {
	constructor({ position, image, scaleWidth, scaleHeight }) {
		super({ position, image, scaleWidth, scaleHeight })

		this.velocity = {
			x: 0,
			y: 0,
		}

		this.movementSpeed = 5

		this.canShoot = true
		this.timeSinceLastShoot = 0
		this.timeBetweemShoots = 20
		this.damage = 50

		this.hitboxNose = {
			position: {
				x: this.position.x + 38,
				y: this.position.y
			},
			width: 14,
			height: 18,
		}

		this.hitboxBody = {
			position: {
				x: this.position.x + 10,
				y: this.position.y + 18
			},
			width: 70,
			height: 24,
		}

		this.projectiles = []

		this.canMove = true

		this.life = 10
		this.isDead = false
	}

	update() {
		// this.drawFullImage()

		if (!this.isDead) {
			this.draw()
			this.updateHitboxes()
			// this.drawHitboxes()

			if (this.canMove) {
				this.move()

				this.shoot() 
			}
		}

		if (this.projectiles.length > 0) this.updateProjectiles()
	}

	drawFullImage() {
		c.fillStyle = "rgba(0, 110, 0, 0.3)"
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}

	draw() {
		if (!this.loaded) return

		c.save()
		c.translate(this.position.x + (this.width / 2), this.position.y + (this.height / 2))
		c.rotate(this.rotation)
		c.translate(-this.position.x - (this.width / 2), -this.position.y - (this.height / 2))
		c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)

		c.restore()
	}

	updateHitboxes() {
		this.hitboxNose = {
			position: {
				x: this.position.x + 38,
				y: this.position.y
			},
			width: 14,
			height: 18,
		}

		this.hitboxBody = {
			position: {
				x: this.position.x + 10,
				y: this.position.y + 18
			},
			width: 70,
			height: 24,
		}
	}

	drawHitboxes() {
		c.fillStyle = "rgba(0, 0, 110, 0.3)"
		c.fillRect(this.hitboxNose.position.x, this.hitboxNose.position.y, this.hitboxNose.width, this.hitboxNose.height)

		c.fillStyle = "rgba(110, 0, 0, 0.3)"
		c.fillRect(this.hitboxBody.position.x, this.hitboxBody.position.y, this.hitboxBody.width, this.hitboxBody.height)
	}

	move() {
		this.velocity.x = 0

		if (keys.KeyA.pressed) {
			this.velocity.x = -this.movementSpeed
			this.rotation = -0.15
		}
		else if (keys.KeyD.pressed) {
			this.velocity.x = this.movementSpeed
			this.rotation = 0.15
		}
		else this.rotation = 0

		this.detectCollisionLeftWall()
		this.detectCollisionRightWall()

		this.position.x += this.velocity.x
	}

	detectCollisionLeftWall() {
		if (this.hitboxBody.position.x + this.velocity.x <= 40) {
			this.velocity.x = 0
		}
	}

	detectCollisionRightWall() {
		if (this.hitboxBody.position.x + this.hitboxBody.width + this.velocity.x >= canvas.width - 40) {
			this.velocity.x = 0
		}
	}

	shoot() {
		if (keys.Space.pressed && this.canShoot) {
			this.canShoot = false

			this.projectiles.push(new Projectile({
				position: {
					x: this.position.x + (this.width / 2),
					y: this.position.y - 3
				},
				damage: this.damage
			}))
		}

		if(!this.canShoot) {
			this.timeSinceLastShoot++

			if (this.timeSinceLastShoot === this.timeBetweemShoots) {
				this.timeSinceLastShoot = 0
				this.canShoot = true
			}
		}
	}

	updateProjectiles() {
		for (let i = this.projectiles.length - 1; i >= 0; i--) {
			const projectile = this.projectiles[i]
			projectile.update()

			if (projectile.position.y + projectile.radius <= -2 || 
					projectile.enemyHited) {
				this.projectiles.splice(i, 1)
			}
		}
	}
}