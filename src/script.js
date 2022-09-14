import * as constants from './js/constants.js';
import Calculator from './js/Calculator.js';

const calculator = new Calculator(constants.previousOperandText, constants.currentOperandText);

window.addEventListener('keydown', e => {
    let key;

    if (e.shiftKey && e.code === 'Equal') {
        key = document.querySelector('.key.Plus');
        calculator.selectOperation(key.innerText);
    } else if (e.shiftKey && e.code === 'Minus') {
        key = document.querySelector('.key.sign');
        calculator.reverseSign();
    } else if (e.shiftKey && e.code === 'Digit8') {
        key = document.querySelector('.key.Mult');
        calculator.selectOperation(key.innerText);
    } else if (e.ctrlKey && e.code === 'KeyA') {
        e.preventDefault();
        key = document.querySelector('.key.AllClear');
        calculator.clearAll();
    } else if (e.shiftKey && e.code === 'Digit5') {
        key = document.querySelector('.percentage');
        calculator.addSymbol(constants.percentage.innerText);
    } else {
        key = document.querySelector(`.key.${e.code}`);
        switch(e.code) {
            case 'Backspace':
                calculator.cancelEntry();
                break;
            case 'Equal':
                calculator.equals();
                break;
            case 'Slash':
                calculator.selectOperation(key.innerText);
                break;
            case 'Minus':
                calculator.selectOperation(key.innerText);
                break;
            case 'ShiftLeft':
                return;
            case 'ShiftRight':
                return;
            default:
                calculator.addSymbol(e.key);
                break;
        }        
    }
    key.classList.add('selected');
    calculator.updateScreen();
});

constants.keys.forEach(key =>
    key.addEventListener('transitionend', e => e.target.classList.remove('selected'))
);

constants.numbers.forEach(number => {
    number.addEventListener('click', () => {
        calculator.addSymbol(number.innerText);
        calculator.updateScreen();
    });
});

constants.operations.forEach(operation => {
    operation.addEventListener('click', () => {
        calculator.selectOperation(operation.innerText);
        calculator.updateScreen();
    });
});

constants.allClear.addEventListener('click', () => {
    calculator.clearAll();
    calculator.updateScreen();
});

constants.clearEntry.addEventListener('click', () => {
    calculator.cancelEntry();
    calculator.updateScreen();
});

constants.signChange.addEventListener('click', () => {
    calculator.reverseSign();
    calculator.updateScreen();
});

constants.equals.addEventListener('click', () => {
    calculator.equals();
    calculator.updateScreen();
});

constants.percentage.addEventListener('click', () => {
    calculator.addSymbol(constants.percentage.innerText);
    calculator.updateScreen();
});

// Dark theme
constants.themeSwitcher.addEventListener('click', () => {
    constants.calculatorWrapper.classList.toggle('calculator-wrapper_dark');
    constants.currentNumber.classList.toggle('current-calculation_dark');
    constants.themeIcon.classList.toggle('icon_light-theme');
    constants.themeIcon.classList.toggle('icon_dark-theme');
});
