var player1 = prompt("Player one: Enter your Name, You will be Blue");
var player1colour = 'rgb(86, 151, 255)';

var player2 = prompt("Player two: Enter your Name, You will be Red");
var player2colour = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

function reportWin(rowNum, colNum) {
    console.log("YOU WON STARTING AT THIS ROW,COL");
    console.log(rowNum);
    console.log(colNum);
}

function changecolor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function returncolor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex) {
    var colorReport = returncolor(5, colIndex);
    for (var row = 5; row > -1; row--) {
        colorReport = returncolor(row, colIndex);
        if (colorReport === 'rgb(128, 128, 128)') {
            return row;
        }
    }
}

function colormatchcheck(one, two, three, four) {
    return (
        one === two &&
        one === three &&
        one === four &&
        one !== 'rgb(128, 128, 128)' &&
        one !== undefined
    );
}

function horizontalWincheck() {
    for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 4; col++) {
            if (
                colormatchcheck(
                    returncolor(row, col),
                    returncolor(row, col + 1),
                    returncolor(row, col + 2),
                    returncolor(row, col + 3)
                )
            ) {
                console.log('horiz');
                reportWin(row, col);
                return true;
            }
        }
    }
}

function verticalWincheck() {
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 3; row++) {
            if (
                colormatchcheck(
                    returncolor(row, col),
                    returncolor(row + 1, col),
                    returncolor(row + 2, col),
                    returncolor(row + 3, col)
                )
            ) {
                console.log('vertical');
                reportWin(row, col);
                return true;
            }
        }
    }
}

function diagonalWincheck() {
    for (var col = 0; col < 5; col++) {
        for (var row = 0; row < 7; row++) {
            if (
                colormatchcheck(
                    returncolor(row, col),
                    returncolor(row - 1, col + 1),
                    returncolor(row - 2, col + 2),
                    returncolor(row - 3, col + 3)
                )
            ) {
                console.log('diag');
                reportWin(row, col);
                return true;
            } else if (
                colormatchcheck(
                    returncolor(row, col),
                    returncolor(row + 1, col + 1),
                    returncolor(row + 2, col + 2),
                    returncolor(row + 3, col + 3)
                )
            ) {
                console.log('diag');
                reportWin(row, col);
                return true;
            }
        }
    }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1colour;
$('h3').text(player1 + " It's your Turn, pick a column to Drop in!");

$('.board button').on('click', function () {
    var col = $(this).closest('td').index();
    var bottomAvail = checkBottom(col);
    changecolor(bottomAvail, col, currentColor);

    if (horizontalWincheck() || verticalWincheck() || diagonalWincheck()) {
        $('h1').text(currentName + ' You have Won!');
        $('h3').fadeOut('fast');
        $('h2').fadeOut('fast');
    }

    currentPlayer = currentPlayer * -1;
    if (currentPlayer === 1) {
        currentName = player1;
        $('h3').text(currentName + " it is your turn");
        currentColor = player1colour;
    } else {
        currentName = player2;
        $('h3').text(currentName + " it is your turn");
        currentColor = player2colour;
    }
});
