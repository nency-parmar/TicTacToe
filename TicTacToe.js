let player1 = Math.random() < 0.5;  // Randomly select which player starts (true for 'O', false for 'X')
let player2 = !player1;  // The other player

let pos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 4, 8], [2, 4, 6], [0, 3, 6], 
    [1, 4, 7], [2, 5, 8]
];

let arr = ['', '', '', '', '', '', '', '', ''];

function changeColor(id) {
    if (arr[id] == '') {
        if (player1) {
            document.getElementById(id).innerHTML = "O";
            document.getElementById(id).style.fontSize = "130px";
            document.getElementById(id).style.textAlign = "center";
            arr[id] = 'O';
            player1 = false;
            player2 = true;
            checkWinner();
            if (!player1) autoTurn();  // Trigger auto turn for Player 2 (X)
        }
    }
}

function autoTurn() {
    let emptyCells = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == '') {
            emptyCells.push(i);
        }
    }
    
    if (emptyCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let id = emptyCells[randomIndex];
        document.getElementById(id).innerHTML = "X";
        document.getElementById(id).style.fontSize = "130px";
        document.getElementById(id).style.textAlign = "center";
        arr[id] = 'X';
        player1 = true;
        player2 = false;
        checkWinner();
    }
}

function checkWinner() {
    for (let i = 0; i < pos.length; i++) {
        if (arr[pos[i][0]] == 'X' && arr[pos[i][1]] == 'X' && arr[pos[i][2]] == 'X') {
            Swal.fire({
                title: "Winner!",
                text: "Player 2 (X) is Winner!",
                icon: "success"
            });
            return;
        } else if (arr[pos[i][0]] == 'O' && arr[pos[i][1]] == 'O' && arr[pos[i][2]] == 'O') {
            Swal.fire({
                title: "Winner!",
                text: "Player 1 (O) is Winner!",
                icon: "success"
            });
            return; 
        }
    }

    // Check for draw
    if (!arr.includes('')) {
        Swal.fire({
            title: "DRAW!",
            text: "It is a DRAW!",
            icon: "info"
        });
    }
}

function restartGame() {
    window.location.reload();
}

window.onload = function() {
    Swal.fire({
        title: "Game Start!",
        text: player1 ? "Player 1 (O) starts!" : "Player 2 (X) starts!",
        icon: "info"
    }).then(() => {
        if (!player1) autoTurn();  // Auto turn if Player 2 starts first
    });
}
