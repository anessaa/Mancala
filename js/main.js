/*----- constants -----*/

/*----- app's state (variables) -----*/
var board
// players objects
var player1
var player2
var score
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
    console.log('game board clicked')
    // $('.holes').data('#id')
    var idx = this.id
    console.log(idx)
})
/*----- functions -----*/

function freeTurn() {

}
function capture() {

}

function checkWin() {

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
    $('.hole').text('4');
}

init()
render()