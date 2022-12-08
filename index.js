let gameInterval = null

let moveHorinzontalyFrameElapsed = 0
const moveHorinzontalyMonstersAtFrame = 60
let moveVerticalyFrameElapsed = 0
const moveVerticalyMonstersAtFrame = 600

let changeDirectionFrameElapsed = 0
const changeDirectionAtFrame = 300  


let levelIsOver = false
let gameIsOver = false

function animate() {
	gameInterval = window.requestAnimationFrame(animate)

	drawWhiteBack()
	background.draw()
	drawMonsters()
	player.update()

	updateFrameForMonsters()
	detectCollisionProjectilesMonsters()

	detectCollisionMonstersWithBottom()

	if (!levelIsOver && !gameIsOver) {
		levelOver()

		playerDead()
	}
}

function drawWhiteBack() {
	c.fillStyle = "black"
	c.fillRect(0, 0, canvas.width, canvas.height)
}

function drawMonsters() {
	if (monsters.length === 0) return 

	for (let i = monsters.length - 1; i >= 0; i--) {
		monsters[i].update()
	}
}

let killProjectile = false

function detectCollisionProjectilesMonsters() {

	for (let i = player.projectiles.length; i > 0; i--) {
		const projectile = player.projectiles[i - 1]

		for (let j = monsters.length; j > 0; j--) {
			const monster = monsters[j - 1]	

			if (projectile.position.y <= monster.hitbox.position.y + monster.hitbox.height &&
					projectile.position.y + projectile.radius >= monster.hitbox.position.y &&
					projectile.position.x <= monster.hitbox.position.x + monster.hitbox.width &&
					projectile.position.x + projectile.radius >= monster.hitbox.position.x) {
				monsters.splice(j - 1, 1)
				killProjectile = true		
			}
		}

		if (killProjectile) {
			console.log()
			player.projectiles.splice(i - 1, 1)
			killProjectile = false
		}
	}
}

function updateFrameForMonsters() {
	moveHorinzontalyFrameElapsed++
	changeDirectionFrameElapsed++
	moveVerticalyFrameElapsed++

	if (moveHorinzontalyFrameElapsed === moveHorinzontalyMonstersAtFrame) {
		moveHorinzontalyFrameElapsed = 0
		for (let i = monsters.length - 1; i >= 0; i--) {
			monsters[i].position.x += monsters[i].movementHorinzontal
		}
	}	

	if (moveVerticalyFrameElapsed === moveVerticalyMonstersAtFrame) {
		moveVerticalyFrameElapsed = 0
		for (let i = monsters.length - 1; i >= 0; i--) {
			monsters[i].position.y += monsters[i].movementVertical
		}
	}	

	if (changeDirectionFrameElapsed === changeDirectionAtFrame) {
		changeDirectionFrameElapsed = 0
		for (let i = monsters.length - 1; i >= 0; i--) {
			monsters[i].movementHorinzontal = -monsters[i].movementHorinzontal
		}
	}
}

function detectCollisionMonstersWithBottom() {
	for (let i = monsters.length; i > 0; i--) {
			const monster = monsters[i - 1]	

			if (monster.hitbox.position.y + monster.hitbox.height >= canvas.height - 40 - 45) {
				monsters.splice(i - 1, 1)
				player.life--		
			}
		}
}

function levelOver() {
	if (monsters.length === 0) {
		levelIsOver = true
		player.canMove = false

		messageBox.style.visibility = "visible"
		messageBox.innerHTML = "Level Finished!!!"

		setTimeout(() => {
			player.canMove = true
			messageBox.style.visibility = "hidden"
			messageBox.innerHTML = ""
		}, 5000)
	}
}

function playerDead() {
	if (player.life === 0) {
		gameIsOver = true
		player.canMove = false
		player.isDead = true

		messageBox.style.visibility = "visible"
		messageBox.innerHTML = "Game Over..."
	}
}

animate()