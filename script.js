
function add(...num) {
    return num.reduce((accummulator, current) => accummulator + current)
}

function subtract(...num) {
    return num.reduce((accummulator, current) => accummulator - current)
}

function multiply(...num) {
    return num.reduce((accummulator, current) => accummulator * current)
}

function divide(...num) {
    return num.reduce((accummulator, current) => accummulator / current)
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2)

        case "-":
            return subtract(num1, num2)

        case "*":
            return multiply(num1, num2)

        case "/":
            return divide(num1, num2)
    }
}

let operators = document.querySelectorAll(".operator")
let operator = "";
let firstOperatorClicked = false;
let numberButtons = document.querySelectorAll(".number")
let num1 = ""
let num2 = ""
let result = 0;
let display = document.querySelector(".display")
let num1Display = document.querySelector(".num1")
let num2Display = document.querySelector(".num2")
let operatorDisplay = document.querySelector(".operatorDisplay")
let decimalPointNum1 = false;

operators.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (num1 === "") return -1;
        firstOperatorClicked = true;

        if (num2 != "") {
            result = operate(operator, parseFloat(num1), parseFloat(num2))

            console.log("result: " + result);
            num1 = Math.round(result * 100) / 100
            num2 = "";
        }

        operator = button.textContent
        updateDisplay()
    })
})

numberButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (!firstOperatorClicked) {
            num1 += button.textContent
        } else { //if firstOperatorClicked
            num2 += button.textContent
        }

        updateDisplay()
        console.log("Clicked: " + e.target.textContent)
    })
})

document.querySelector(".equals").addEventListener("click", (e) => {
    if (num2 != "") {
        result = operate(operator, parseFloat(num1), parseFloat(num2))
        console.log("result: " + result);
        num1 = Math.round(result * 100) / 100;
        num2 = "";
    }

    updateDisplay()
    console.log("Clicked: " + e.target.textContent)
})

document.querySelector(".clear").addEventListener("click", (e) => {
    display.textContent = "display"
    num1Display.textContent = ""
    num2Display.textContent = ""
    operatorDisplay.textContent = ""
    num1 = "";
    num2 = "";
    result = 0;
    operator = "";
    firstOperatorClicked = false;

    console.log("Clicked: " + e.target.textContent)
})

document.getElementById("%").addEventListener("click", () => {
    result /= 100;
    num1 = result;
    updateDisplay()
})

document.querySelector(".decimalPoint").addEventListener("click", (e) => {
    if (!decimalPointNum1) {
        num1 += e.target.textContent;
    } else {
        num2 += e.target.textContent;
    }
    updateDisplay()
    decimalPointNum1 = true;
})

function updateDisplay() {
    display.textContent = Math.round(result * 100) / 100;
    num1Display.textContent = num1;
    num2Display.textContent = num2;
    operatorDisplay.textContent = operator
}

document.querySelector(".delete").addEventListener("click", () => {
    if (!firstOperatorClicked) {
        num1 = num1.replace(num1.charAt(num1.length-1),"")        
    } else {
        num2 = num2.replace(num2.charAt(num2.length-1),"")   
    }
    updateDisplay();
})

//BUG sequence: 9, +, =, 3, =
//then it breaks