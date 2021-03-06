// Elements
const goButton = document.querySelector("[data-go-button]")
const clearButton = document.querySelector("[data-clear-button]")
const errorMsg = document.querySelector("[data-error]")
const card = document.querySelector(".card")
const playerInput = document.querySelector("[data-input]")
const form = document.querySelector("[data-form]")
const playerList = document.querySelector("[data-players-list]")
const captain = document.querySelector("[data-captain]")
captain.innerHTML = "?"

// Players to add array
let players = JSON.parse(localStorage.getItem("players")) || []

// Selected captain
let selectedCaptain = ""

const save = () => localStorage.setItem("players", JSON.stringify(players))

// Event listeners
goButton.addEventListener("click", (e) => {
  captain.innerHTML = ""
  card.classList.add("flip")
  randomSelection()
  console.log(selectedCaptain)
})

function removeClass(e) {
  if (e.propertyName !== "transform") return
  this.classList.remove("flip")
  setTimeout(() => {
    captain.innerHTML = selectedCaptain
  }, 1000)
}

card.addEventListener("transitionend", removeClass)

const setMessage = (msg, msgColor) => {
  setTimeout(() => {
    errorMsg.style.color = msgColor
    errorMsg.textContent = msg
  }, 3000)
}

const populateList = (items = [], destination) => {
  // Populate playerList
  destination.innerHTML = items
    .map((item, i) => {
      return `<li class="item"><span class="material-icons delete">clear</span><span class="inner-text"> ${item}</span></li>`
    })
    .join("")
}

const addPlayer = (e) => {
  e.preventDefault()
  if (playerInput.value === "" || playerInput.value == null) {
    setMessage("Please enter a player's name", "red")
  } else {
    const text = playerInput.value
    players.push(text)
    populateList(players, playerList)
    // localStorage.setItem("players", JSON.stringify(players))
    save()
    playerInput.value = ""
    /* const el = document.createElement("li")
    el.innerHTML = `<li class="item"><span class="material-icons delete">clear</span> ${text}</li>`
    playerList.appendChild(el) */
  }
}

form.addEventListener("submit", addPlayer)

// Clear player list
const clearPlayerList = () => {
  playerInput.value = ""
  players = []
  console.log(players)
  // localStorage.setItem("players", JSON.stringify(players))
  save()
  populateList(players, playerList)
}

clearButton.addEventListener("click", clearPlayerList)

// Select players to add to players array for selection
const randomSelection = () => {
  selectedCaptain = ""
  const randomNum = Math.floor(Math.random() * players.length)
  selectedCaptain = players[randomNum]
  return selectedCaptain
}

// Create an input that can add a player's name to the player's array (state object then saved to local storage)

// Select a random captain

// Select player from form and fixture ratings

// Remove player
const removePlayer = (e) => {
  if (e.target.classList.contains("delete")) {
    const text = e.target.nextSibling.textContent
    let index = players.indexOf(text)
    players.splice(index, 1)
    console.log(players)
    e.target.parentElement.remove()
    // localStorage.setItem("players", JSON.stringify(players))
    save()
  }
}

playerList.addEventListener("click", removePlayer)

// Display current year
const yearEl = document.querySelector("#year")
const displayYear = new Date().getFullYear()
yearEl.innerHTML = displayYear.toString()

populateList(players, playerList)
