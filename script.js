let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let result = document.querySelector('.result');
let btns = document.querySelectorAll('.btn');
let conditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const ticTacToe = (element, index) => {
    if (element.value !== '') {
      return; // Ignore if the cell is already filled
    }
  
    const clickSound = document.getElementById('clickSound');
    clickSound.currentTime = 0;
    clickSound.play();
  
    element.value = currentPlayer;
    element.disabled = true;
    cells[index] = currentPlayer;
  
    for (let i = 0; i < conditions.length; i++) {
      const [a, b, c] = conditions[i];
  
      if (cells[a] === currentPlayer && cells[b] === currentPlayer && cells[c] === currentPlayer) {
        result.innerHTML = `Player ${currentPlayer} Won 🎉`;
        btns.forEach((btn) => (btn.disabled = true));
  
        // Highlight the winning cells
        document.getElementById(`cell-${a}`).classList.add('winning-cell');
        document.getElementById(`cell-${b}`).classList.add('winning-cell');
        document.getElementById(`cell-${c}`).classList.add('winning-cell');
  
        // Play win sound
        const winSound = document.getElementById('winSound');
        winSound.play();
        winSound.currentTime = 0;
  
        return; // Exit the function to prevent switching player and updating result message
      }
    }
  
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    result.innerHTML = `Player ${currentPlayer} Turn`;
  
    if (cells.every((cell) => cell !== '')) {
      // All cells filled, it's a tie
      result.innerHTML = "It's a Tie!";
      btns.forEach((btn) => (btn.disabled = true));
    }
  };
  
  
  

function reset() {
  cells = ['', '', '', '', '', '', '', '', ''];
  btns.forEach((btn) => {
    btn.value = '';
    btn.disabled = false;
    btn.classList.remove('winning-cell');
  });
  currentPlayer = 'X';
  result.innerHTML = 'Player X Turn';
}

document.querySelector('#reset').addEventListener('click', reset);

btns.forEach((btn, i) => {
  btn.id = `cell-${i}`;
  btn.addEventListener('click', () => ticTacToe(btn, i));
});
