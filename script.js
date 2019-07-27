//declare variables
let gameOverBool = false;
let p1 = 0;
let p2 = 0;
let roundCount = 5;
let selectorObj = {};
const listSelectors = [
    "#scoreP1", "#scoreP2", "#rounds", "#btnP1", "#btnP2", "#btnReset", "#inptField", ".winner", ".gameOver"
];
//converting to a proper string without # or .
function convSelector(selector) {
    const result = selector.slice(1, selector.length);
    return result;
}

//query selectors
for (let i = 0; i < listSelectors.length; i++) {
    selectorObj[convSelector(listSelectors[i])] = document.querySelector(listSelectors[i]);
}

// updater functions
function updateScore() {
    if (!gameOverBool) {
        if (this.id == "btnP1") {
            p1++;
            selectorObj.scoreP1.textContent = p1;
        }
        else if (this.id == "btnP2") {
            p2++;
            selectorObj.scoreP2.textContent = p2;
        }
        else {
            //reset button was clicked
            selectorObj.scoreP1.textContent = p1;
            selectorObj.scoreP2.textContent = p2;
        }
        updateRounds();
    }
}
function updateRounds(){
    roundCount = selectorObj.inptField.value - (p1 + p2);
    selectorObj.rounds.textContent = roundCount;
    if (roundCount === 0 || p1 > (p2+roundCount) || p2 > (p1+roundCount)) {
        gameOverBool = true;
        gameOver();
    }
}

function gameOver(text) {
    if (p2 > p1) {
        selectorObj.winner.textContent = "Player 2 Won!";
        selectorObj.scoreP2.style.color = "#7ac26e";
    }
    else if (p2 < p1){
        selectorObj.winner.textContent = "Player 1 Won!";
        selectorObj.scoreP1.style.color = "#7ac26e";
    }
    else {
        selectorObj.winner.textContent = "Draw!";
        selectorObj.scoreP2.style.color = "#7ac26e";
        selectorObj.scoreP1.style.color = "#7ac26e";
    }
    selectorObj.gameOver.style.display = "block";
    selectorObj.winner.style.display = "block";
}

function resetGame() {
    gameOverBool = false;
    selectorObj.scoreP1.style.color = "white";
    selectorObj.scoreP2.style.color = "white";
    selectorObj.gameOver.style.display = "none";
    selectorObj.winner.style.display = "none";
    p1 = 0;
    p2 = 0;
    roundCount = selectorObj.inptField.value;
    updateScore();
}

// event listeners
selectorObj.inptField.addEventListener("keyup", updateRounds);

selectorObj.btnP1.addEventListener("click", updateScore);

selectorObj.btnP2.addEventListener("click", updateScore);

selectorObj.btnReset.addEventListener("click", resetGame);