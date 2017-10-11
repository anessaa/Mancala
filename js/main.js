$(document).ready(function() {
/*----- constants -----*/
// var stoneImgs = [
//     '',
//     "img/pebble1.png",
//     null,
//     "img/pebble1",
//     "https://i.pinimg.com/originals/4d/1f/c7/4d1fc7896d3da8fe409bbc480bce3a5c.jpg"
// ];

/*----- app's state (variables) -----*/
var board;
var playerOneTurn;
var freeTurn;
/*----- cached element references -----*/
var $holes = $('.hole, .bucket1, .bucket2');
/*----- event listeners -----*/
$(".resetButton").on('click', function() {
    init();
    render();
});

$(".instructions").on('click', function() {
   console.log("instructions button clicked")
});

$("div.hole").on('click', function() {
    var idx = this.id;
    idx = parseInt(idx);
    if (!board[idx]) return;
    freeTurn = spreadStones(idx);
    if (!freeTurn) playerOneTurn = !playerOneTurn;    
    winner = checkWin();
    render();
})

/*----- functions -----*/
function spreadStones(idx) {
    idx = parseInt(idx);
    var numStones = board[idx];
    board[idx] = 0;
    var bucketOffSet = 0;
    
    for (var offset = 1; offset <= numStones; offset++) { 
        var nextHole = idx + offset;
        if (nextHole >= 14) nextHole = nextHole - 14;
        if((playerOneTurn && nextHole === 0) || (!playerOneTurn && nextHole === 7)) bucketOffSet++;
        board[nextHole + bucketOffSet]++;
    }

    //capture
    var lastHoleIdx = nextHole + bucketOffSet;
    var oppIdx = 14 - lastHoleIdx;
    var minHoleIdx = playerOneTurn ? 1 : 8;
    var maxHoleIdx = playerOneTurn ? 6 : 13;
    if ((lastHoleIdx >= minHoleIdx && lastHoleIdx <= maxHoleIdx && board[lastHoleIdx] === 1) && board[oppIdx]) {
        console.log('in if')
        var numStones = board[oppIdx] + board[lastHoleIdx];
        board[oppIdx] = board[lastHoleIdx] = 0;
        board[playerOneTurn ? 7 : 0] += numStones;
    }
    var bucketIdx = playerOneTurn ? 7 : 0;

    // return if freeTurn
    return ((nextHole + bucketOffSet) === bucketIdx);
}

function checkWin() {
    var winner;
    var player1Score = board[7];
    var player2Score = board[0];
    if (board[1] === 0 && board[2] === 0 && board[3] === 0 && board[4] === 0 && board[5] === 0 && board[6] === 0
    || board[8] === 0 && board[9] === 0 && board[10] === 0 && board[11] === 0 && board[12] === 0 && board[13] === 0){
        if (player1Score > player2Score) {
            return "Player 1 wins!"
        } else if (player2Score > player1Score) {
            return "Player 2 wins!"
        } else {
            return "Tie!"
        }
    }
}

function render() {
    if (winner) {
        $('.status').html(`Winner is ${winner}`)
    } else if (freeTurn) {
        $('.status').html(`Free Turn. Player ${playerOneTurn ? 'one' : 'two'} goes again.`);
    } else {
        $('.status').html(`Next player is ${(playerOneTurn ? 'Player 1' : 'Player 2')}`)
    }
        
    if (playerOneTurn) {
        $('.topSeperator').addClass('active')
        $('.bottomSeperator').removeClass('active')
    } else if (!playerOneTurn) {
        $('.topSeperator').removeClass('active')
        $('.bottomSeperator').addClass('active')
    }
    
    $(".player1").html(`Player 1: ${board[7]}`)
    $(".player2").html(`Player 2: ${board[0]}`)
    $holes.each(function() {
        var idx = this.id;
        // $(this).html(`<img src="${stoneImgs[board[idx]]}" width="50">`);
        $(this).html(board[idx]);
    });
}

function init() {
    board = [
        0, 
        4, 4, 4, 4, 4, 4, 
        0, 
        4, 4, 4, 4, 4, 4
    ];
    playerOneTurn = true;
    winner = null;
    $('.status').html("Player one starts!")    
}

init();
render();
});

