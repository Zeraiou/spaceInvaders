window.addEventListener("keydown", event => {
	switch(event.code) {
		case "KeyA":
			keys.KeyA.pressed = true
			break

		case "KeyD":
			keys.KeyD.pressed = true
			break

		case "Space": {
			keys.Space.pressed = true
		}

		default: break
	}
})

window.addEventListener("keyup", event => {
	switch(event.code) {
		case "KeyA":
			keys.KeyA.pressed = false
			break

		case "KeyD":
			keys.KeyD.pressed = false
			break

		case "Space": {
			keys.Space.pressed = false
		}

		default: break
	}
})