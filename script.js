function add(a, b){
    return a+b;
}
function substruct(a, b){
    return a-b;
}
function multiply(a, b){
    return a*b;
}
function divide(a, b){
    //if b is zero
    if (!b){
        return "ERROR";
    } 
    return a/b;
}
function operate(op, a, b){
    let opFunc;
    switch(op){
        case "+": opFunc = add; break;
        case "-": opFunc = substruct; break;
        case "*": opFunc = multiply; break;
        case "/": opFunc = divide; break;
        default: return "ERROR";
    }

    return opFunc(a,b);
}
function upDisplay(numberStr){
    const screenElement = document.getElementById("screen");
    if (numberStr.length > 14){ //max 15 digits
        numberStr = numberStr.slice(0,14);
    }
    screenElement.textContent = numberStr;
    localStorage.setItem("secondNumber", numberStr);
}

function numberClick(button){
    const number = button.target.dataset.key;
    const currentDisplay = document.getElementById("screen").textContent;
    let newNum;
    if(window.localStorage.getItem("newNum") == "true"){
        newNum = number;
    }
    else{
        newNum = `${currentDisplay}${number}`;
    }
    upDisplay(newNum);
    window.localStorage.setItem("newNum", "false");

}

function opsPress(button){
    const op = button.target.dataset.key;
    const currentDisplay = document.getElementById("screen").textContent;

    equalPressed();
    window.localStorage.setItem("newNum", "true");
    window.localStorage.setItem("firstNumber", localStorage.getItem("secondNumber"));
    window.localStorage.setItem("secondNumber", "0");
    window.localStorage.setItem("op", op);
}

function equalPressed(){
    const firstNum = parseFloat(localStorage.getItem("firstNumber"));
    const secondNum = parseFloat(localStorage.getItem("secondNumber"));
    const op = localStorage.getItem("op");

    console.log(firstNum, secondNum, op);
     
    const result = operate(op, firstNum, secondNum).toString();

    upDisplay(result);
    window.localStorage.setItem("newNum", "true");
    window.localStorage.setItem("firstNumber", "0");
    window.localStorage.setItem("op", "+");
}
function clearCalc(){
    upDisplay("0");
    window.localStorage.clear();
    window.localStorage.setItem("firstNumber", "0");
    window.localStorage.setItem("secondNumber", "0");
    window.localStorage.setItem("op", "+");
    window.localStorage.setItem("newNum", "true");
}

//reset button
const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clearCalc);

//number buttons
const numButtons = document.querySelectorAll("button[id='number']");
numButtons.forEach(button => {
    button.addEventListener("click", numberClick);
});

//oparation button
const opsButtons = document.querySelectorAll("button[id='ops']");
opsButtons.forEach(button => {
    button.addEventListener("click", opsPress);
});

//equal
const equalButton = document.getElementById("equals");
equalButton.addEventListener("click", equalPressed);

//clear screen and restart local values
clearCalc();
