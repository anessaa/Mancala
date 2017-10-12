$(document).ready(function() {
/*----- constants -----*/
var stoneImgs = [
    '',
    "img/pebble1.png",
    "img/pebble2.png",
    "img/pebble3.png",
    "img/pebble4.png",
    "img/pebble5.png",
    "img/pebble6.png",
    "img/pebble7.png",
    "img/pebble8.png",
    "img/pebble9.png",
    "img/pebble10.png",
    "img/pebble11.png",
    "img/pebble12.png",
    "img/pebble13.png",
    "img/pebble14.png",
    "img/pebble15.png",
    "img/pebble16.png",
    "img/pebble17.png",
    "img/pebble18.png",
    "img/pebble19.png",
    "img/pebble20.png",
    "img/pebble21.png", 
    "img/pebble22.png", 
    "img/pebble23.png", 
    "img/pebble24.png",    
    "img/pebble25.png", 
    "img/pebble26.png", 
    "img/pebble27.png", 
    "img/pebble28.png", 
    "img/pebble29.png", 
    "img/pebble30.png", 
    "img/pebble31.png", 
    "img/pebble32.png", 
    "img/pebble33.png", 
    "img/pebble34.png", 
    "img/pebble35.png" 
];

/*----- app's state (variables) -----*/
var board;
var playerOneTurn;
var freeTurn;
var resetButtonClicked; 
/*----- cached element references -----*/
var $holes = $('.hole, .bucket1, .bucket2');
/*----- event listeners -----*/
resetButtonClicked = false;
$(".resetButton").on('click', function() {   
    resetButtonClicked = true; 
    init();
    render();
});

$(".hidden").hide();
$(".instructions").on('click', function() {
    $(".info, .hidden").toggle()   
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
            return "Player 1 wins!";
        } else if (player2Score > player1Score) {
            return "Player 2 wins!";
        } else {
            return "Tie!";
        }
    }
}

function render() {
    if (winner) {
        $('.status').html(`Winner is ${winner}`);
    } else if (freeTurn) {
        freeTurn = false;
        $('.status').html(`Free Turn. Player ${playerOneTurn ? 'one' : 'two'} goes again.`); 
    } else {
        $('.status').html(`${(playerOneTurn ? "Player 1's" : "Player 2's")} Turn`);
    }


    if (playerOneTurn) {
        $('.topSeperator').addClass('active')
        $('.bottomSeperator').removeClass('active');
    } else if (!playerOneTurn) {
        $('.topSeperator').removeClass('active')
        $('.bottomSeperator').addClass('active');
    }
    
    $(".player1").html(`Player 1: ${board[7]}`);
    $(".player2").html(`Player 2: ${board[0]}`);
    $holes.each(function() {
        var idx = this.id;
        $(this).html(`<img src="${stoneImgs[board[idx]]}">`);
        //$(this).html(board[idx]);
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
}

init();
render();
});


