function isCardNumberValid(number) {
	// normally we would contact a credit card service...but we don't know how to do that yet. So to keep things simple we will only accept one number
	return number === '1234123412341234'
}

function isDateValid(month, year) {
	// Convert 2-digit year to 4-digit year (assuming 20xx for years 00-99)
	const fullYear = year < 100 ? 2000 + parseInt(year) : parseInt(year)
	const monthIndex = parseInt(month) - 1 // JavaScript months are 0-indexed
	
	// Create date object for the expiration date
	const expirationDate = new Date(fullYear, monthIndex)
	
	// Get current date and set to first day of current month for comparison
	const currentDate = new Date()
	const currentYear = currentDate.getFullYear()
	const currentMonth = currentDate.getMonth()
	
	// Check if expiration date is in the future
	return expirationDate > new Date(currentYear, currentMonth)
}

function displayError(msg) {
	// display error message as pop-up
	const errorElement = document.querySelector('#form-errors')
	const errorText = document.querySelector('#card-error')
	const overlay = document.querySelector('#popup-overlay')
	if (msg) {
		errorText.innerHTML = msg
		errorElement.style.display = 'block'
		overlay.style.display = 'block'
		// Auto-hide after 5 seconds
		setTimeout(() => {
			errorElement.style.display = 'none'
			overlay.style.display = 'none'
		}, 5000)
	} else {
		errorElement.style.display = 'none'
		overlay.style.display = 'none'
	}
}

function showSuccess() {
	// show success message as pop-up
	const successElement = document.querySelector('#card-success')
	const overlay = document.querySelector('#popup-overlay')
	successElement.style.display = 'flex'
	overlay.style.display = 'block'
	// Auto-hide after 3 seconds
	setTimeout(() => {
		successElement.style.display = 'none'
		overlay.style.display = 'none'
	}, 3000)
}
function submitHandler(event) {
	event.preventDefault()
	let errorMsg = ''
	console.log(this.cardNumber.value)
	// clear any previous errors
	displayError('')
	
	// check credit card number
	if (isNaN(this.cardNumber.value)) {
		// it is not a valid number
		errorMsg += 'Card number is not a valid number\n'
	} else if (!isCardNumberValid(this.cardNumber.value)) {
		// it is a number, but is it valid?
		errorMsg += 'Card number is not a valid card number\n'
	}
	
	// check expiration date
	if (isNaN(this.cardMonth.value) || isNaN(this.cardYear.value)) {
		errorMsg += 'Expiration month and year must be valid numbers\n'
	} else if (!isDateValid(this.cardMonth.value, this.cardYear.value)) {
		errorMsg += 'Expiration date must be in the future\n'
	}
	
	// check CVC
	if (isNaN(this.cardCvc.value)) {
		errorMsg += 'CVC must be a valid number\n'
	}
	
	if (errorMsg !== '') {
		// there was an error. stop the form and display the errors.
		displayError(errorMsg)
		return false
	}
	
	// If we get here, all validation passed
	showSuccess()
	return true
}

document.querySelector('#credit-card').addEventListener('submit', submitHandler)

// Add click event to close pop-ups when clicking overlay
document.querySelector('#popup-overlay').addEventListener('click', function() {
	document.querySelector('#form-errors').style.display = 'none'
	document.querySelector('#card-success').style.display = 'none'
	this.style.display = 'none'
})