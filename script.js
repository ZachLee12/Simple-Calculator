
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
    if (operator == "/" && num2 == "0") {
        return "No dividing by 0!!"
    }
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
let decimalPointNum1 = true;
let decimalPointNum2 = false;

operators.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (num1 === "") return -1;
        firstOperatorClicked = true;
        decimalPointNum1 = false;

        if (num2 != "") {
            if (num2 === ".") {
                num2 = 0;
            }

            result = operate(operator, parseFloat(num1), parseFloat(num2))
            console.log("result: " + result);
            num1 = result.toString();
            num2 = "";
        }

        decimalPointNum2 = false;
        operator = button.textContent //change operator, after previous operator has already been executed!
        if (isNaN(result)) {
            num1 = 0;
            updateDisplay();
            result = 0;
        } else {
            updateDisplay()
        }
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
        if (num2 === ".") {
            num2 = 0;
        }
        result = operate(operator, parseFloat(num1), parseFloat(num2))
        console.log("result: " + result);
        num1 = result.toString();
        num2 = "";
    }

    updateDisplay()
    decimalPointNum2 = false;
})

document.querySelector(".clear").addEventListener("click", () => {
    clear();
})

document.getElementById("%").addEventListener("click", () => {
    result /= 100;
    num1 = Math.round(result * 100) / 100;
    updateDisplay()
})

document.querySelector(".decimalPoint").addEventListener("click", (e) => {
    if (decimalPointNum1 == true) {
        num1 += e.target.textContent;
    } else {
        if (firstOperatorClicked) {
            if (!decimalPointNum2) {
                num2 += e.target.textContent;
            }
            decimalPointNum2 = true;
        }

    }
    updateDisplay()
    decimalPointNum1 = false;

}
)

document.querySelector(".delete").addEventListener("click", () => {
    if (num1.charAt(num1.length - 1) === ".") {
        decimalPointNum1 = true;
    }

    if (num2 === "") {
        firstOperatorClicked = false;
        num1 = num1.slice(0, -1)
        operator = ""
    } else {
        if (!firstOperatorClicked) {
            num1 = num1.slice(0, -1)
        } else {
            if (num2.charAt(num2.length - 1) === ".") {
                decimalPointNum2 = false;
            }
            num2 = num2.slice(0, -1)
        }
    }
    updateDisplay();
})

function updateDisplay() {
    display.textContent = result;
    num1Display.textContent = num1;
    num2Display.textContent = num2;
    operatorDisplay.textContent = operator
}

function clear() {
    display.textContent = "display"
    num1Display.textContent = ""
    num2Display.textContent = ""
    operatorDisplay.textContent = ""
    num1 = "";
    num2 = "";
    result = 0;
    operator = "";
    firstOperatorClicked = false;
    decimalPointNum1 = true;
}

//keyboard inputs
window.addEventListener("keydown", function (e) {
    let validNumberInputs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    let validOperatorInputs = ["/", "+", "-", "*"];
    //general keys or numpad
    if (validNumberInputs.includes(e.key)) {
        if (!firstOperatorClicked) {
            num1 += e.key
        } else { //if firstOperatorClicked
            num2 += e.key
        }
        updateDisplay()
    };

    if (validOperatorInputs.includes(e.key)) {
        if (num1 === "") return -1;
        firstOperatorClicked = true;
        decimalPointNum1 = false;

        if (num2 != "") {
            if (num2 === ".") {
                num2 = 0;
            }

            result = operate(operator, parseFloat(num1), parseFloat(num2))
            console.log("result: " + result);
            num1 = result.toString();
            num2 = "";
        }

        decimalPointNum2 = false;
        operator = e.key //change operator, after previous operator has already been executed!
        if (isNaN(result)) {
            num1 = 0;
            updateDisplay();
            result = 0;
        } else {
            updateDisplay()
        }
    }

    if (e.key.toLowerCase() === "c" ) {
        if (num2 != "") {
            if (num2 === ".") {
                num2 = 0;
            }
            result = operate(operator, parseFloat(num1), parseFloat(num2))
            console.log("result: " + result);
            num1 = result.toString();
            num2 = "";
        }

        updateDisplay()
        decimalPointNum2 = false;
    }

    if (e.key === "Backspace") {
        if (num1.charAt(num1.length - 1) === ".") {
            decimalPointNum1 = true;
        }

        if (num2 === "") {
            firstOperatorClicked = false;
            num1 = num1.slice(0, -1)
            operator = ""
        } else {
            if (!firstOperatorClicked) {
                num1 = num1.slice(0, -1)
            } else {
                if (num2.charAt(num2.length - 1) === ".") {
                    decimalPointNum2 = false;
                }
                num2 = num2.slice(0, -1)
            }
        }
        updateDisplay();
    }

    if (e.key === ".") {
        if (decimalPointNum1 == true) {
            num1 += e.key;
        } else {
            if (firstOperatorClicked) {
                if (!decimalPointNum2) {
                    num2 += e.key;
                }
                decimalPointNum2 = true;
            }

        }
        updateDisplay()
        decimalPointNum1 = false;
    }
})


