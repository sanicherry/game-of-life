/**
 * Creates an two dimensional grid visualized by arrays
 * It takes a number of rows that create a square
 * @param {Number Int} rows 
 */
function createArray(rows) {
    var arr = new Array();
    for (var i = 0; i < rows; i++){
        var pushArray = new Array(rows);
        arr.push(pushArray);
        pushArray = null;
    }
    return arr;
}

/**
 * 
 */
function printGridToConsole() {
    for(var u = 0; u < theGrid.length; u++) {
        row = '';
        for(var o = 0; o < theGrid.length; o++) {
            row += ' ' + theGrid[o][u] + ' ';
        }
        console.log(row);
    }
}

/**
 * 
 */
function createRandomPopulation() {
    for(var h = 5; h < theGrid.length - 5; h++) {
        for(var i = 5; i < theGrid[h].length - 5; i++) 
            theGrid[h][i] = Math.round(Math.random());
    }
}

/**
 * 
 */
function fillPlayground() {
    ctx.clearRect(0, 0, gridWidth, gridWidth);

    for(var j = 0; j < theGrid.length; j++) {
        for(var k = 0; k < theGrid[j].length; k++) {
            if(theGrid[j][k] === 1) {
                ctx.fillRect(j, k, 1, 1);
            }
        }
    }
}

/**
 * 
 */
function updatePlayground() {
    for(var l = 1; l < theGrid.length - 1; l++) {
        for(var m = 1; m < theGrid[l].length - 1; m++) {
            var sumLivingCells = 0;
            sumLivingCells += theGrid[l - 1][m - 1];
            
            sumLivingCells += theGrid[l][m - 1];
            sumLivingCells += theGrid[l + 1][m - 1];

            sumLivingCells += theGrid[l - 1][m];
            sumLivingCells += theGrid[l + 1][m];
            
            sumLivingCells += theGrid[l - 1][m + 1];
            sumLivingCells += theGrid[l][m + 1];
            sumLivingCells += theGrid[l + 1][m + 1];
            
            if(theGrid[l][m] === 0) {
                switch (sumLivingCells) {
                    case 3:
                        mirrorGrid[l][m] = 1;
                        break;
                    default:
                        mirrorGrid[l][m] = 0;
                        break;
                }
            } else if(theGrid[l][m] === 1){
                switch (sumLivingCells) {
                    case 2:
                    case 3:
                        mirrorGrid[l][m] = 1;
                        break;    
                    default:
                        mirrorGrid[l][m] = 0;
                        break;
                }
            }
        }
    }

    var tempGrid = theGrid;
    theGrid = mirrorGrid;
    mirrorGrid = tempGrid;
}

function changeColor(color) {
    ctx.fillStyle = color;
}

/**
 * 
 */
function gameLoop() {
    fillPlayground();
    updatePlayground();
    if(breakvar === true) 
        return; 
    requestAnimationFrame(gameLoop);
}

function restartGameLoop() {
    ctx.clearRect(0, 0, gridWidth, gridWidth);
    var theGrid = createArray(gridWidth);
	var mirrorGrid = createArray(gridWidth);
	createRandomPopulation();
	gameLoop();
}


