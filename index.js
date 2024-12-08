const mainSection = document.getElementById("main");
const playerNamesSection = document.getElementById("player-names");
const gameSection = document.getElementById("game");
const statusDiv = document.getElementById("status");
const tdElements = document.querySelectorAll("#board td");
const resetButton = document.getElementById("reset");
const playerForm = document.getElementById("player-form");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const timeout = 1000;

let onePlayer = false;
let twoplayer = false;
let playerOne = true;
let player1Name = "";
let player2Name = "Computer";

document.getElementById("singleplayer").addEventListener("click", () => {
  mainSection.style.display = "none";
  playerNamesSection.style.display = "block";
  onePlayer = true;
  document.getElementById("player-two-input").style.display = "none";
});

document.getElementById("twoplayer").addEventListener("click", () => {
  mainSection.style.display = "none";
  playerNamesSection.style.display = "block";
  twoplayer = true;
});

playerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  player1Name = player1Input.value;
  if (twoplayer) {
    player2Name = player2Input.value;
  }
  playerNamesSection.style.display = "none";
  gameSection.style.display = "block";
  updateStatus(`${player1Name}'s turn`);
});

tdElements.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (onePlayer && !cell.innerHTML) {
      insertIcon(cell, "X");
      if (checkWin("X")) {
        updateStatus(`${player1Name} wins!`);
        resetButton.style.display = "block";
        disableCells();
      } else if (isDraw()) {
        updateStatus("It's a draw!");
        resetButton.style.display = "block";
        disableCells();
      } else {
        disableCells();
        updateStatus("Computer's turn...");
        autoInsertIcon();
      }
    } else if (twoplayer && !cell.innerHTML) {
      if (playerOne) {
        insertIcon(cell, "X");
        if (checkWin("X")) {
          updateStatus(`${player1Name} wins!`);
          resetButton.style.display = "block";
          disableCells();
        } else if (isDraw()) {
          updateStatus("It's a draw!");
          resetButton.style.display = "block";
          disableCells();
        } else {
          playerOne = false;
          updateStatus(`${player2Name}'s turn`);
        }
      } else {
        insertIcon(cell, "O");
        if (checkWin("O")) {
          updateStatus(`${player2Name} wins!`);
          resetButton.style.display = "block";
          disableCells();
        } else if (isDraw()) {
          updateStatus("It's a draw!");
          resetButton.style.display = "block";
          disableCells();
        } else {
          playerOne = true;
          updateStatus(`${player1Name}'s turn`);
        }
      }
    }
  });
});

resetButton.addEventListener("click", () => {
  let winnerMessage = "";
  if (checkWin("X")) {
    winnerMessage = `Lojtari ${player1Name} fitoi! Dëshironi të luani përsëri?`;
  } else if (checkWin("O")) {
    winnerMessage = `Lojtari ${player2Name} fitoi! Dëshironi të luani përsëri?`;
  } else {
    winnerMessage = "It's a draw! Dëshironi të luani përsëri?";
  }

  const popup = confirm(winnerMessage);

  if (popup) {
    resetBoard();
  }
});

function insertIcon(cell, icon) {
  if (!cell.innerHTML) {
    const img = document.createElement("img");
    img.src = `images/${icon}.png`;
    img.alt = icon;
    cell.appendChild(img);
    cell.style.pointerEvents = "none";
  }
}

function autoInsertIcon() {
  setTimeout(() => {
    const emptyCells = Array.from(tdElements).filter((cell) => !cell.innerHTML);
    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const randomCell = emptyCells[randomIndex];
      insertIcon(randomCell, "O");
    }

    enableCells();

    if (checkWin("O")) {
      updateStatus(`${player2Name} wins!`);
      resetButton.style.display = "block";
      disableCells();
    } else if (isDraw()) {
      updateStatus("It's a draw!");
      resetButton.style.display = "block";
      disableCells();
    } else {
      updateStatus(`${player1Name}'s turn`);
    }
  }, timeout);
}

function disableCells() {
  tdElements.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
}

function enableCells() {
  tdElements.forEach((cell) => {
    cell.style.pointerEvents = "auto";
  });
}

function checkWin(icon) {
  const board = Array.from(tdElements).map(
    (cell) => cell.querySelector("img")?.alt === icon
  );

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some((pattern) => pattern.every((index) => board[index]));
}

function isDraw() {
  return Array.from(tdElements).every((cell) => cell.innerHTML);
}

function updateStatus(message) {
  statusDiv.textContent = message;
}

function resetBoard() {
  tdElements.forEach((cell) => {
    cell.innerHTML = "";
    cell.style.pointerEvents = "auto";
  });
  resetButton.style.display = "none";

  playerOne = true;
  updateStatus(`${player1Name}'s turn`);
}
