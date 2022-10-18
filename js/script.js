// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselleper ognun a delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

const playBtn = document.getElementById("play-btn");
console.log(playBtn);
const wrapper = document.getElementById("wrapper");
let indexBombs = [];
let numberCellsToGen = 100;
const difficultSelect = document.getElementById("difficult");
let cellSize = "cellx100"


// at click
playBtn.addEventListener("click", function(){

    // reset
    playBtn.innerHTML = "RESTART";
    wrapper.innerHTML = "";
    indexBombs = [];
    
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
    
    // generate random bomb array      
    indexBombs = rndNumberOrderGen(numberCellsToGen);
    console.log(indexBombs);
    
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

});



// FUNCTIONS------------------------------------------
/**
 * Description: Generate a random order of cellNumbers
 * @param {number} cellNumbers
 * @returns {array} array with random order of numbers
 */
function rndNumberOrderGen(cellNumbers) {
    const arrayNumbers = [];
    while (arrayNumbers.length < 16) {
    
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

/**
 * Description: toggle cells and bomb style
 * @returns {any}
 */
function cellClick(){
    const innerNumber = parseInt(this.textContent);
    console.log(innerNumber);

    let clickOrBomb = "";
    
    if (indexBombs.includes(innerNumber)){
        // add bomb class
        clickOrBomb = "bomb";
        this.classList.add(`${clickOrBomb}`);
        
    } else { 
        // add clicked btn
        clickOrBomb = "clicked-btn";
        this.classList.add(`${clickOrBomb}`);
    }

    
};