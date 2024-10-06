/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
/*---------------------------- Variables (state) ----------------------------*/
let board = ['', '', '', '', '', '', '', '', '']
let turn
let winner
let tie

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')
const resetButtonEl = document.getElementById('reset')
/*-------------------------------- Functions --------------------------------*/
const init = () => {
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false
  render()
}

const render = () => {
  updateBoard()
  updateMessage()
}

const updateBoard = () => {
  board.forEach((element, index) => {
    squareEls[index].textContent = element
  })
}

const updateMessage = () => {
  if (winner) {
    messageEl.textContent = `${winner} wins!`
  } else if (tie) {
    messageEl.textContent = "It's a tie!"
  } else {
    messageEl.textContent = `${turn}'s turn`
  }
}

const handleClick = (event) => {
  let squareIndex = -1
  squareEls.forEach((el, index) => {
    if (el === event.target) squareIndex = index
  })

  if (board[squareIndex] !== '' || winner) return

  placePiece(squareIndex)
  checkForWinner()
  checkForTie()
  switchPlayerTurn()
  render()
}

const placePiece = (squareIndex) => {
  board[squareIndex] = turn
}

const checkForWinner = () => {
  for (let combo of winningCombos) {
    const [a, b, c] = combo
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a]
      break
    }
  }
}

const checkForTie = () => {
  tie = !board.includes('') && !winner
}

const switchPlayerTurn = () => {
  if (!winner) {
    if (turn === 'X') {
      turn = 'O'
    } else {
      turn = 'X'
    }
  }
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => square.addEventListener('click', handleClick))
resetButtonEl.addEventListener('click', init)
