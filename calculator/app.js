//! Browser Calculator with vanilla js 
//! The view for our calculator app 
class View {
	constructor() {
		this.root = this.getElement('#root') //The root element for the app  
	}
	//! A method for selecting element 
	getElement(selector){
		return document.querySelector(selector)
	} 
	//! This method will create the view for our calculator 
	render(){
		this.root.innerHTML = 
		`<div class="calculator">
            <input type="text" class="screen" value="" disabled />
            <div class="keys">
                <button type="button" class="operator" value="+">+</button>
                <button type="button" class="operator" value="-">-</button>
                <button type="button" class="operator" value="*">&times;</button>
                <button type="button" class="operator" value="/">&divide;</button>
                <button type="button" value="7">7</button>
                <button type="button" value="8">8</button>
                <button type="button" value="9">9</button>
                <button type="button" value="4">4</button>
                <button type="button" value="5">5</button>
                <button type="button" value="6">6</button>
                <button type="button" value="1">1</button>
                <button type="button" value="2">2</button>
                <button type="button" value="3">3</button>
                <button type="button" value="0">0</button>
                <button type="button" class="decimal" value=".">.</button>
                <button type="button" class="all-clear" value="all-clear">AC</button>
                <button type="button" class="equal-sign operator" value="=">=</button>
            </div>
        </div>
		`
		return this.root 
	}
}
//! Render the view 
let app = new View() 
app.render() //Launches the view 

//An helper function to always select an element within the DOM 
let selector = e => document.querySelector(e) 

//!create an object to the initial state of the calculator 
// displayValue is the value that will be displayed on the screen 
// firstOperand is the first argument entered before pressing an operator 
// waitingForSecondOperand is false since firstOperand has not been entered 
// Operator has same meaning  
const calculator = {
	displayValue : '0' , 
	firstOperand : null , 
	waitingForSecondOperand : false ,
	operator : null 
}
//! A function to handle input of digits 
function inputDigit(digit) {
	let displayValue = calculator.displayValue  
	//! check if the calculator is waiting for a second operand and set that as the input 
	//! else append the digit to the display 
	if (calculator.waitingForSecondOperand) {
		calculator.displayValue = digit 
		calculator.waitingForSecondOperand = false 
	}else {
	    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit 
	}		
} 

//! A function to always add decimal point 
function inputDecimal(dot) {
	if (!calculator.displayValue.includes(dot)) {
		calculator.displayValue += dot 
	}
}
//! An object to always use in adding numbers 

//! A function to always handle an operator 
function handleOperator(nextOperator) {
	let firstOperand = calculator.firstOperand 
	let displayValue = calculator.displayValue 
	let operator     = calculator.operator 
    const inputValue = parseFloat(displayValue) 
	//! The object below contains method for evaluating expressions depending on the operator that 
	//! was clicked 
	const Calculation = {
        '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
        '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
        '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
        '=': (firstOperand, secondOperand) => secondOperand
    }
    if (operator && calculator.waitingForSecondOperand)  {
        calculator.operator = nextOperator;
        return
    }
    if (firstOperand == null) {
        calculator.firstOperand = inputValue;
    }else if (operator) {
        const currentValue = firstOperand || 0;
        const result = Calculation[operator](currentValue, inputValue);
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}
//! A function that will reset the calculator when invoked 
const resetCalculator = () => {
  calculator.displayValue = '0'
  calculator.firstOperand = null
  calculator.waitingForSecondOperand = false
  calculator.operator = null
}

//! A function to update what is displayed on the screen 
const updateDisplay = () => {
  const display = selector('.screen');
  display.value = calculator.displayValue;
}

updateDisplay();

//! Handling clicks on the button 
const keys = selector('.keys');
keys.addEventListener('click', (event) => {
	//Grab which element was clicked by using event.target 
	//Check the class name of the element 
	//Invoke any of our helper functions for each button that was clicked 
    const target = event.target 
    if (!target.matches('button')) {
        return 
    }
    if (target.classList.contains('operator')) {
        handleOperator(target.value);
		updateDisplay();
        return
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
		updateDisplay();
        return
    }
    if (target.classList.contains('all-clear')) {
        resetCalculator();
		updateDisplay();
        return
    }
    inputDigit(target.value);
    updateDisplay();
})