$(document).ready(function() {
/*----- constants -----*/

/*----- app's state (variables) -----*/
var board
// players objects
var winner;
var state;
var player1
var player2
var idx
var holeClicked
var playerOneTurn = true
/*----- cached element references -----*/
var holes
// var $resetButton = $(".resetButton")
// var $infoButton = $(".instructions")
/*----- event listeners -----*/
// holes and buckets clicked
$(".resetButton").on('click', function() {
    console.log('reset button clicked')

})
$(".instructions").on('click', function() {
    console.log('instruction button clicked')

})
$(".gameBoard").on('click', 'div.hole', function() {
    idx = this.id
    console.log("hole " + idx + " on board")
    spreadStones()
    
})
/*----- functions -----*/
function spreadStones() {
    console.log("spread stones function called")  
    var numStones = board[idx]
    board[idx] = 0
    // console.log(idx)
    for (var offset = 1; offset <= numStones; offset++){
        var nextHole = idx + offset
        if (nextHole >= 14) nextHole = nextHole - 14 
        board[nextHole]++   
    } 
    // var $holeValue = $('.hole')
    //console.log($holeValue[1])
    // var $holes = $('.hole')
    // $(this).on('click', function(){
    //     $holes.html()
    // })
    // if (board[1] === 0, board[2] === 0, board[3] === 0, board[4] === 0, board[5] === 0, board[6] === 0) {
    //     console.log("checking if statement")
    //     checkWin()
    // }
    render() 
    console.log(numStones + " number of stones")
    console.log(board)
    
    return numStones
    
}

function freeTurn() {

}
function capture() {

}

function checkWin() {
    console.log('running check win function')
    if (player1 > player2) {
        alert("Player 1 wins!")
    } else if (player2 > player1) {
        alert("Player 2 wins!")
    }
    
}

function render() {

}
function init() {
    board = [
        {
            bucketAmt: 0, 
            playerOneOrTwo: 1,
        }, 
        4, 4, 4, 4, 4, 4, 
        {
            bucketAmt: 0, 
            playerOneOrTwo: 2,
        }, 
        4, 4, 4, 4, 4, 4,
    ]
    $('div.hole').html('4');
}

init()
render()
})