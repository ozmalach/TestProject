var player1 = prompt("Enter a name for player one (you will be Blue)");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Enter a name for player two (you will be Red)");
var player2Color = 'rgb(237, 45, 73)';

var winMsg = "you win"

var game_on = true;
var table = $('table tr')

function reportWin(rowNum, colNum){
    console.log("You won starting at this row, col");
    console.log(rowNum);
    console.log(colNum);
}

function changeColor(rowIndex, colIndex, color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function returnColor(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkbottom(colIndex){
    var colorReport = returnColor(5, colIndex);
    for (let row = 5; row > -1; row--){
        colorReport = returnColor(row, colIndex);
        if (colorReport !== player1Color && colorReport !== player2Color){
            return row;
        }
    }
}

function colorMatchCheck(one, two, three, four){
    return (one === two && one === three && one === four &&
        (one === player1Color || one === player2Color) && one !== undefined)
}

function horizontalWinCheck(){
    for (let row =0; row < 6; row++){
        for (let col = 0; col < 4; col++){
            if (colorMatchCheck(returnColor(row, col), returnColor(row, col+1),
            returnColor(row, col + 2), returnColor(row, col + 3))){
                //console.log('horizontal');
                //reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

function verticalWinCheck(){
    for (let col =0; col < 7; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col),
            returnColor(row + 2, col), returnColor(row + 3, col))){
                console.log('vertical');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

function diagonalWinCheck(){
    for (let col =0; col < 5; col++){
        for (let row = 0; row < 7; row++){
            if (colorMatchCheck(returnColor(row, col), returnColor(row+1, col+1),
            returnColor(row+2, col + 2), returnColor(row+3, col + 3))){
                console.log('horizon');
                reportWin(row, col);
                return true;
            } else if (colorMatchCheck(returnColor(row, col), returnColor(row-1, col+1),
            returnColor(row-2, col + 2), returnColor(row-3, col + 3))){
                console.log('diagonal');
                reportWin(row, col);
                return true;
            }else {
                continue;
            }
        }
    }
}

var aWin = false;
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;
$('h3').text(currentName + " you start");

$('.board button').on('click', function(){
    if (!aWin){
        var col = $(this).closest('td').index();
        var bottomAvail = checkbottom(col);
        changeColor(bottomAvail, col, currentColor);

        if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
            console.log("a win");
            aWin = true;
            $('h3').text(currentName + ' ' + winMsg +'!! refresh the page to start over');
        } else{
            currentPlayer = currentPlayer * (-1);
            if (currentPlayer === 1){
                currentName = player1;
                currentColor = player1Color;
                $('h3').text(currentName + " your turn");
            } else{
                currentName = player2;
                currentColor = player2Color
                $('h3').text(currentName + " your turn");
            }
        }

    }
})





