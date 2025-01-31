const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let totalTurns = 0;

let turn_O = true;

let buttons = document.querySelectorAll(".box");

let container = document.querySelector(".container");

let title = document.querySelector(".title");

buttons.forEach((button) => {

    button.addEventListener("click", (evnt) => {

        if(turn_O == true){

            button.innerHTML = 'O';
            button.style.color = "#4682B4";
            turn_O = false;
        }else{

            button.innerHTML = 'X';
            button.style.color = "#FF6F61";
            turn_O = true;
        }
        button.disabled = true;
        totalTurns++;
        (checkWinner() ? "won" : checkDraw());
    })
})


let message = document.createElement("h1");
    message.style.textAlign = "center";
    message.style.fontSize = "30px";


const checkDraw = () => {

    let patternsCount = 0;

    winPatterns.forEach((patterns) => {

        let position1val = buttons[patterns[0]].innerText;
        let position2val = buttons[patterns[1]].innerText;
        let position3val = buttons[patterns[2]].innerText;

        if (position1val != '' && position2val != '' && position3val != '') patternsCount++;

        if(patternsCount == 8) drawScreen();
    })
}

const drawScreen = () => {

    message.innerText = `Game Draw`;
    message.style.color = "red";
    title.after(message);
    disableButtons();
}





// Check winner

function checkWinner(){

    let isWin = false;
    
    winPatterns.forEach((patterns) => {

        let position1val = buttons[patterns[0]].innerText;
        let position2val = buttons[patterns[1]].innerText;
        let position3val = buttons[patterns[2]].innerText;

        if(position1val != "" && position2val != "" && position1val != ""){

            if(position1val == position2val && position2val == position3val){

                winnerScreen(position1val);
                highlightButtons(patterns[0], patterns[1], patterns[2]);
                isWin = true;
            }
        }
    })

    return isWin;
}



// Screen After win

const winnerScreen = (position1val) => {

    message.innerText = `${position1val} won`;
    message.style.color = "green";
    title.after(message);
    disableButtons();
}

const disableButtons = () => {

    buttons.forEach((button) => {

        button.disabled = true;
    })
    totalTurns = 0;
}

const highlightButtons = (index1, index2, index3) => {

    buttons[index1].classList.add("winBox");
    buttons[index2].classList.add("winBox");
    buttons[index3].classList.add("winBox");
}

const deEmphasize = () => {

    buttons.forEach((button) => {

        if(button.classList.length > 1){

            button.classList.remove("winBox");
        }
    })
}


// Reset Button

let newGame = document.querySelector(".newGame");

newGame.addEventListener("click", (res) => {

    buttons.forEach((button) => {

        button.innerHTML = '';
        button.disabled = false;
        message.innerText = '';
        deEmphasize();  
    })
})