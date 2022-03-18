const button = document.querySelector('.advice__dice')
const loading = document.querySelector('.advice__loading')
const quote = document.querySelector('.advice__quote')
const quote_id = document.querySelector('.advice__number--id')
const apiurl = 'https://api.adviceslip.com/advice'

var clicked = false
var lastId

// Defining async function
async function getapi() {
	// Storing response
	const response = await fetch(apiurl, { cache: 'no-cache' })
	// Storing data in form of JSON
	var data = await response.json()

	// Compare last advice with the new one
	// If same result, show loader and refetch data later
	if (lastId == data.slip.id) {
		setloader()
		window.setTimeout(getapi, 200)
	} else {
		// If the advice is a new one, change it
		change(data)
		// remove the loader and display the advice
		removeloader()
		// allow for future requests
		clicked = false
		// Store the id for future
		lastId = data.slip.id
	}

	// If we get no response, display the loader and try again
	if (!response) {
		setloader()
		window.setTimeout(getapi, 200)
	}
}

// The function who changes the id and the advice
function change(data) {
	quote_id.innerHTML = data.slip.id
	quote.innerHTML = data.slip.advice
}

// Sets the loader and hide the quote
function setloader() {
	loading.classList.add('visible')
	quote.classList.remove('visible')
}
// Remove the loader and show the quote
function removeloader() {
	loading.classList.remove('visible')
	quote.classList.add('visible')
}

// When you click on the button, get api and change data
button.onclick = () => {
	if (!clicked) getapi()
	clicked = true
}

window.onload = getapi()
