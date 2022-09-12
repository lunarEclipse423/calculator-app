import * as constants from './js/constants.js';
import Calculator from './js/Calculator.js';

const calculator = new Calculator(constants.previousOperandText, constants.currentOperandText);

constants.numbers.forEach(buttonNumber => {
    buttonNumber.addEventListener('click', () => {
        calculator.addSymbol(buttonNumber.innerText);
        calculator.updateDisplay();
    });
});

constants.operations.forEach(buttonOperation => {
    buttonOperation.addEventListener('click', () => {
        calculator.selectOperation(buttonOperation.innerText);
        calculator.updateDisplay();
    });
});

constants.signChange.addEventListener('click', () => {
    calculator.reverseSign();
    calculator.updateDisplay();
});

constants.equals.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
});

constants.allClear.addEventListener('click', () => {
    calculator.clearAll();
    calculator.updateDisplay();
});

constants.clearEntry.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});
