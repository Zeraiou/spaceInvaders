class Sprite {
	constructor({ position, image, scaleWidth, scaleHeight }) {
		this.position = position
		this.image = new Image()
		this.loaded = false
		this.image.onload = () => {
			this.width = this.image.width * this.scaleWidth
			this.height = this.image.height * this.scaleHeight
			this.loaded = true
		}

		this.image.src = image.imageSrc
		this.scaleWidth = scaleWidth
		this.scaleHeight = scaleHeight
		this.rotation = 0
	}

	draw() {
		if (!this.loaded) return

	// 	const cropBox = {
	// 		position: {
	// 			x: 0,
	// 			y: 0,
	// 		},
	// 		width: this.image.width,
	// 		height: this.image.heigh,
	// 	}

	// 	c.drawImage(this.image,
	// 							cropBox.position.x,
	// 							cropBox.position.y,
	// 							cropBox.width,
	// 							cropBox.height, 
	// 							this.position.x, 
	// 							this.position.y,
	// 							this.width,
	// 							this.height)

		c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)		
	}
}