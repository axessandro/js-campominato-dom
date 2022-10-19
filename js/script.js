// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselleper ognun a delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

const playBtn = document.getElementById("play-btn");
console.log(playBtn);
const wrapper = document.getElementById("wrapper");
let bombsArray = [];
let numberCellsToGen = 100;
const difficultSelect = document.getElementById("difficult");
let cellSize = "cellx100";
let gameOver = false;

let bombsNumber = 16;
let clickedCells = [];

// at click
playBtn.addEventListener("click", function(){
    // reset
    playBtn.innerHTML = "RESTART";
    wrapper.innerHTML = "";
    bombsArray = [];
    
    // difficult selection var changes
    const difficult = parseInt(difficultSelect.value);
    console.log(difficult);
    if (difficult === 3) {
        numberCellsToGen = 100;
        cellSize = "cellx100"; 
    } else if (difficult === 2){
        numberCellsToGen = 81;
        cellSize = "cellx81"; 
    } else if (difficult === 1){
        numberCellsToGen = 49;
        cellSize = "cellx49";
    }
    
    // calculate safe cells number
    let safeCells = numberCellsToGen - 16;
    console.log(safeCells);
    
    // generate random bomb array      
    bombsArray = rndNumberOrderGen(numberCellsToGen, bombsNumber);
    console.log(bombsArray);
    


    // for each numbers of array 
    for (let i = 0; i < numberCellsToGen; i++){
        const thisNumber = i + 1;
        // generate cells
        const thisCell = cellGenerator();
        // at cells click
        thisCell.addEventListener("click", cellClick)
        // apppend thisNumber to cells
        thisCell.append(thisNumber)
        // append cells on DOM
        wrapper.append(thisCell)
    };
    
    /**
     * Description: toggle cells and bomb style
     * @returns {any}
     */
    function cellClick(){
        // import innerNumber 
        const innerNumber = parseInt(this.textContent);
        console.log(innerNumber);
    
      
        // if bombArray includes inner number
        if (bombsArray.includes(innerNumber)){
            // add bomb class
            this.classList.add("bomb");
            // endgame
            endGame("lose")
        // else
        } else { 
            // add clicked btn
            this.classList.add("clicked-btn");
            // if scoreArray not includes 
                // push cell 
            if (!clickedCells.includes(innerNumber)) {
                clickedCells.push(innerNumber);
            }
            // if score is = safecells 
                // win
            if (clickedCells.length === safeCells) {
                // endgame
                endGame("win")
            }
        }
    };

    /**
     * Description: end game settings
     * @param {stringa} winLose : win or lose
     * @returns {any}
     * */
    function endGame(winLose) {
        // remove click
        const allCells = document.getElementsByClassName("ms-cell");
        for (let i = 0; i < allCells.length; i++){
            const thisCell = allCells[i];
            thisCell.removeEventListener("click", cellClick)
        }

        if (winLose === "win"){
            alert(" you win")
        } else {
            
            for(let i = 0; i < allCells.length; i++){
                const thisCell = allCells[i];
                const thisCellNumber = parseInt(thisCell.textContent);
                if(bombsArray.includes(thisCellNumber)){
                    thisCell.classList.add("bomb")
                }
            }

            alert("you lose")
        }
    }

});




// FUNCTIONS------------------------------------------
/**
 * Description: Generate a random numbers = bombs
 * @param {number} cellNumbers
 * @param {nuumber} bombsNumber
 * @returns {array} array with random order of numbers
 */
function rndNumberOrderGen(cellNumbers, bombsNumber) {
    const arrayNumbers = [];
    while (arrayNumbers.length < bombsNumber) {
        const rndNumber = Math.floor(Math.random() * (cellNumbers - 1 + 1) ) + 1;
        // if number is included in array DONT push
        if (!arrayNumbers.includes(rndNumber)) {
            arrayNumbers.push(rndNumber);
        }
    }
    // return arraynumbers
    return arrayNumbers;
};

/**
 * Description: generate cells
 * @param {number} thisNumber number to insert 
 * @returns {any}
 */
function cellGenerator() {
    // create div
    const cell = document.createElement("div");
    // add classes
    cell.classList.add("ms-cell");
    cell.classList.add(`${cellSize}`);
    //  return cells
    return cell;
};
