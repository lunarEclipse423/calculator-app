import Stack from './Stack.js';

const OperationsPriority = {
    '+': 1,
    '-': 1,
    '×': 2,
    '÷': 2
};

export default class Calculator {
    #previousNumText;
    #currentNumText;
    #currentNum;
    #stackNumbers;
    #stackOperations;
    #outputString;
    #isDivisionByZero;

    constructor(previousNumText, currentNumText) {
        this.#previousNumText = previousNumText;
        this.#currentNumText = currentNumText;
        this.#stackNumbers = new Stack();
        this.#stackOperations = new Stack();
        this.#outputString = '';
        this.#isDivisionByZero = false;
        this.clearAll();
    }

    clearAll() {
        this.#currentNum = '';
        this.#stackNumbers.clear();
        this.#stackOperations.clear();
        this.#outputString = '';
    }

    cancelEntry() {
        this.#currentNum = this.#currentNum.toString().slice(0, -1);
    }

    addSymbol(symbol) {
        if (isNaN(Number(symbol)) && symbol !== '.' && symbol !== '%') {
            return;
        }

        if (symbol === '.' && this.#currentNum.includes('.')) {
            return;
        }

        if (symbol === '%' && this.#currentNum.toString() === '') {
            return;
        } else if (symbol !== '%' && this.#currentNum.toString().includes('%')) {
            return;
        }

        if (this.#currentNum.length === 15) {
            return;
        }

        this.#currentNum = this.#currentNum.toString() + symbol.toString();
    }

    calculatePercentage() {
        if (this.#stackNumbers.peek() === undefined) {
            this.#stackNumbers.push(0);
        } else {
            let current = parseFloat(this.#currentNum);
            let percentageCount = this.#currentNum.replace(/[^%]/g, '').length;

            if (OperationsPriority[this.#stackOperations.peek()] === 1) {
                let previous = this.#stackNumbers.peek();
                for (let i = 0; i < percentageCount; i++) {
                    current = current * previous / 100;
                }
            } else if (OperationsPriority[this.#stackOperations.peek()] === 2) {
                for (let i = 0; i < percentageCount; i++) {
                    current = current / 100;
                }
            }
            this.#stackNumbers.push(current);
        }
    }

    performOperation() {
        let current = this.#stackNumbers.pop();
        let previous = this.#stackNumbers.pop();
        let lastAddedOperation = this.#stackOperations.pop();
        let result = '';
        let precision = 0;
        if (current.toString().includes('.') || previous.toString().includes('.')) {
            precision = Math.max(current.toString().split('.').pop().length, 
            previous.toString().split('.').pop().length);
        }

        switch(lastAddedOperation) {
            case '+':
                result = (previous + current).toFixed(precision);
                break;
            case '-':
                result = (previous - current).toFixed(precision);
                break;
            case '×':
                result = (previous * current).toFixed(precision);
                break;
            case '÷':
                if (current === 0) {
                    this.#isDivisionByZero = true;
                } else {
                    result = (previous / current).toFixed(precision);
                }
                break;
            default:
                return;
        }
        this.#stackNumbers.push(parseFloat(result));
    }

    addOperation(operation) {
        if (this.#currentNum === '') {
            return;
        }
        if (this.#currentNum.toString().includes('%')) {
            this.calculatePercentage();
            this.performOperation();
        } else {
            this.#stackNumbers.push(parseFloat(this.#currentNum));
        }

        if (this.#stackOperations.length() !== 0 && !this.#isDivisionByZero) {
            if (OperationsPriority[operation] > OperationsPriority[this.#stackOperations.peek()]) {
                this.#stackOperations.push(operation);
            } else {
                while ((OperationsPriority[operation] < OperationsPriority[this.#stackOperations.peek()] || 
                    OperationsPriority[operation] === OperationsPriority[this.#stackOperations.peek()]) && 
                    !this.#isDivisionByZero) {
                        this.performOperation();
                }
                this.#stackOperations.push(operation);
            }
        } else {
            this.#stackOperations.push(operation);
        }
        
        this.#outputString = parseFloat(this.#currentNum) < 0 ?
            `${this.#outputString} (${this.#currentNum}) ${operation}` : 
            `${this.#outputString} ${this.#currentNum} ${operation}`;
        this.#currentNum = '';
    }

    equals() {
        if (this.#stackNumbers.length() === 0) {
            return;
        }

        if (this.#currentNum !== '') {
            if (this.#currentNum.toString().includes('%')) {
                this.calculatePercentage();
            } else {
                this.#stackNumbers.push(parseFloat(this.#currentNum));
            }
            this.#outputString = `${this.#outputString} ${this.#currentNum} =`;
        }

        if (this.#stackNumbers.length() < 2) {
            this.#currentNum = this.#stackNumbers.pop();
            this.#stackNumbers.clear();
            this.#stackOperations.clear();
            this.#outputString = `${this.#currentNum} =`;
            return;
        }

        while (this.#stackOperations.length() !== 0 && !this.#isDivisionByZero) {
            this.performOperation();
        }

        if (this.#isDivisionByZero) {
            this.#currentNum = 'Cannot divide by zero';
            this.#stackNumbers.clear();
            this.#stackOperations.clear();
            this.#isDivisionByZero = false;
        } else {
            this.#currentNum = this.#stackNumbers.pop();
        }
    }

    reverseSign() {
        if (this.#currentNum === '') {
            return;
        }

        let reverseNumber = -parseFloat(this.#currentNum);
        if (this.#currentNum.toString().includes('%')) {
            reverseNumber = `${reverseNumber}${this.#currentNum.replace(/[^%]/g, '')}`;
        }
        this.#currentNum = reverseNumber.toString();
    }

    displayNumber(num) {
        const stringNumber = num.toString();
        const integerPart = parseFloat(stringNumber.split('.')[0]);
        const decimalPart = stringNumber.split('.')[1];
        let integerPartDisplay = '';
        
        if (!isNaN(integerPart)) {
            integerPartDisplay = integerPart.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        return decimalPart != null ? `${integerPartDisplay}.${decimalPart}` : integerPartDisplay;
    }

    updateScreen() {
        if (this.#currentNum === undefined) {
            this.#currentNumText.innerText = '';
            this.#currentNum = '';
        } else if (this.#currentNum.toString().includes('%')) {
            this.#currentNumText.innerText = this.displayNumber(this.#currentNum).padEnd(this.#currentNum.length, '%');
        } else if (this.#currentNum === 'Cannot divide by zero') {
            this.#currentNumText.innerText = this.#currentNum;
            this.#currentNum = '';
        } else {
            this.#currentNumText.innerText = this.displayNumber(this.#currentNum);
        }

        this.#previousNumText.innerText = this.#outputString;
    }
}
