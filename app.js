// Display current year
const yearEl = document.querySelector("#year")
const displayYear = new Date().getFullYear()
yearEl.innerHTML = displayYear.toString()

const players = ["Bruno Fernandes", "Mo Salah", "Raheem Sterling", "Anthony Martial", "Michail Antonio"]

// Select players to add to players array for selection
const randomSelection = () => {
  const randomNum = Math.floor(Math.random() * players.length)
  return players[randomNum]
}

// Create an input that can add a player's name to the player's array (state object then saved to local storage)

// Select a random captain

// Select player from form and fixture ratings
