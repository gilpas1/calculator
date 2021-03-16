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
function upDisplay(){
    const display = document.getElementById("screen");
    display.textContent = localStorage.getItem("display");
}
function numberClick(button){
    console.log(button.target.dataset.key);
    const number = button.target.dataset.key;
    const curentDisplay = localStorage.getItem("display");
    if (curentDisplay == "0"){
        localStorage.setItem("display", `${number}`);
    }
    else localStorage.setItem("display", `${curentDisplay}${number}`);
    upDisplay();
}

//adding eventlisteners to the number buttons
const numButtons = document.querySelectorAll("button[id=number]");
numButtons.forEach(button => {
    button.addEventListener("click", numberClick);
});

window.localStorage.setItem("display", "0");
upDisplay();