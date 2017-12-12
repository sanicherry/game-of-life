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
 * printing the Grid to the console for debugging
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
 * creates the grid with random postions for cells
 */
function createRandomPopulation() {
    for(var h = 5; h < theGrid.length - 5; h++) {
        for(var i = 5; i < theGrid[h].length - 5; i++) 
            theGrid[h][i] = Math.round(Math.random());
    }
}

/**
 * clears the canvas and refills it with living cells
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
 * checks living cells around one cell in the grid and updates mirror grid
 * transfer cells from mirrorGrid into theGrid
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

/**
 * change color of the cells
 */
function changeColor(color) {
    ctx.fillStyle = color;
}

/**
 * starts and continues the game of life
 */
function gameLoop() {
    fillPlayground();
    updatePlayground();
    if(breakvar === true) 
        return; 
    requestAnimationFrame(gameLoop);
}

/**
 * restarts the game of life with new Grid
 */
function restartGameLoop() {
    ctx.clearRect(0, 0, gridWidth, gridWidth);
    var theGrid = createArray(gridWidth);
	var mirrorGrid = createArray(gridWidth);
	createRandomPopulation();
	gameLoop();
}


