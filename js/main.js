$(document).ready(function() {
/*----- constants -----*/

/*----- app's state (variables) -----*/
var board;
// players objects
var playerOneTurn;


/*----- cached element references -----*/
var $holes = $('.hole, .bucket1, .bucket2');
console.log($holes.length)

/*----- event listeners -----*/
$(".resetButton").on('click', function() {
    init();
    render();
});

$(".instructions").on('click', function() {
    console.log('instruction button clicked')
});

$("div.hole").on('click', function() {
    var idx = this.id
    idx = parseInt(idx)
    spreadStones(idx)
    playerOneTurn = !playerOneTurn;
    winner = checkWin();
    render();
})

/*----- functions -----*/
function spreadStones(idx) {
    idx = parseInt(idx);
    var numStones = board[idx];
    board[idx] = 0;
    var bucketOffSet = 0;
    console.log(idx)
    for (var offset = 1; offset <= numStones; offset++) { 
        var nextHole = idx + offset;
        if (nextHole >= 14) nextHole = nextHole - 14;
        if((playerOneTurn && nextHole === 0) || (!playerOneTurn && nextHole === 7)) bucketOffSet++;

        board[nextHole + bucketOffSet]++;

    }
    return numStones;
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
        $(this).html(board[idx]);
        });
    }

function init() {
    board = [
        0, 
        4, 4, 4, 4, 4, 10, 
        0, 
        4, 4, 4, 4, 4, 10
    ];
    playerOneTurn = true;
    winner = null;
    $('.status').html("Player one starts!")
}

init();
render();

});

