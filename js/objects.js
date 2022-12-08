const canvas = document.querySelector('canvas')

canvas.width = 1024
canvas.height = 576

const c = canvas.getContext('2d')

const messageBox = document.querySelector('.messageBox')

const fullRadian = Math.PI * 2

const keys = {
	KeyA: {
		pressed: false,
	},
	KeyD: {
		pressed: false,
	},
	Space: {
		pressed: false,
	}
}

const player = new Player({
	position: {
		x: 467,
		y: canvas.height - 40 - 45,
	},
	image: {
		imageSrc: "./assets/images/spaceship.png"
	},
	scaleWidth: 0.2, 
	scaleHeight: 0.2,
})

const background = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	image: {
		imageSrc: "./assets/images/startScreenBackground.png"
	},
	scaleWidth: 1.47, 
	scaleHeight: 1.53,
})

const button = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	image: {
		imageSrc: "./assets/images/button.png"
	},
	scaleWidth: 0.2, 
	scaleHeight: 0.2,
})

const monsters = []

const amountOfMonstersPerRow = 10
const amountOfRowOfMonsters = 8

for (let i = 0; i < amountOfMonstersPerRow; i++) {
	for (let j = 0; j < amountOfRowOfMonsters; j++) {
		monsters.push(new Monster({
			position: {
				x: i * 34 + 180,
				y: j * 39 + 50
			},
			image: {
				imageSrc: "./assets/images/invader.png"
			},
			scaleWidth: 1, 
			scaleHeight: 1,
			index: i
		}))
	}
}