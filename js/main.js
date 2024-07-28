/*----- constants -----*/
//look up ddata structure 
const COLORS = {
    '1': 'green', 
    '-1': 'black',
    'null': 'white',
};

/*----- state variables -----*/
let board; /* tracks visuals of board */
let turn; /* tracks whose turn it is */
let winner; /* tracks if the game is over */

/*----- cached elements  -----*/
const msgEl = document.querySelector('h1');
const playAgainBtn = document.getElementById('play-again-btn');
const markersEl = [...document.querySelectorAll('#markers > div')]; /* selecting div in markers */ 
//document.qsAll returns node list NOT array --> spread syntax: [...]turning node list into an array to get access to index

/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click',handleDrop);
playAgainBtn.addEventListener('click', init); 

/*----- functions -----*/
init();

//initialize all state, then call render()
function init() {
    // visial board mapping to the DOM by rotating board array 90 degs CC
    board = [
        [null, null, null, null, null, null],   /* column 0 */
        [null, null, null, null, null, null],   /* column 1 */
        [null, null, null, null, null, null],   /* column 2 */
        [null, null, null, null, null, null],   /* column 3 */
        [null, null, null, null, null, null],   /* column 4 */
        [null, null, null, null, null, null],   /* column 5 */
        [null, null, null, null, null, null],   /* column 6 */
    ];
    turn = 1; 
    winner = null; 
    render();
};

// in reponse to user interaction - update all impacted state, then render()
function handleDrop(evt) {
    // get the index of marker
    const columnIdx = markersEl.indexOf(evt.target);
    //console.log(columnIdx);
    // create "shortcut" to the column that needs to be updated
    const columnArr = board[columnIdx];
    // get index of 1st avaible cell ('null' bc empty)
    const rowIdx = columnArr.indexOf(null);
    // update board 
    columnArr[rowIdx] = turn;
    winner = getWinner(columnIdx, rowIdx); 
    //update turn 
    turn *= -1; 
    render(); 
}

// return null (game still in play), 1/-1 (there is a winner), tie (game has tied)
function getWinner(columnIdx, rowIdx) {
    return checkVeritcal(columnIdx, rowIdx) //|| checkHorizontal()
}; 

function checkVeritcal(columnIdx, rowIdx) {
    const numBelow = countAdj(columnIdx, rowIdx, 0, -1); 
    return numBelow === 3 ? turn : null; 
}

function countAdj(columnIdx, rowIdx, columnOffSet, rowOffSet) {
    let count = 0; 
    columnIdx += columnOffSet; 
    rowIdx += rowOffSet; 
    // use while loop if unkown how many times to iterate 
    while (board[columnIdx] && board[columnIdx][rowIdx] === turn) { 
        // checking to see if out-of-bounds & prevent error 
        count++; 
        columnIdx += columnOffSet; 
        rowIdx += rowOffSet; 
    }
    return count; 
}

// visualize all state & other info (like massaging) in the DOM
function render() {
    renderBoard();
    renderMessage();
    renderControls();
};

function renderControls() {
    // need to use ternary expression - used to return 1 of 2 values/expressions"
    // <conditional expression > ? <truthy expression> : <falsy expression>;
    // can typically replase if else 
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}; 

function renderMessage () {
    if (winner === null) {
        //game in progress
        msgEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s turn`;
    } else if (winner === 'Tie') {
        msgEl.textContent = "how do you tie at connect-four?"
    } else {
        //winner 
        msgEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> wins!!!`;
    }
}; 

// changing color of cell dependent on value of cell 
function renderBoard() {
    board.forEach((columnArr, columnIdx)  => {
      columnArr.forEach((cellVal, rowIdx) => {
        const cellEl = document.getElementById(`c${columnIdx}r${rowIdx}`);
        // console.log(cellEl); --> check to make sure all cellEl are selected 
        cellEl.style.backgroundColor = COLORS[cellVal];
        // can ck by changing value of null to 1/-1 & seeing if board color changes 
      });
    });
  }; 

  
    
