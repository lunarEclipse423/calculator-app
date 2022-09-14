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
        if (isNaN(Number(symbol)) && (symbol !== '.' || symbol !== '%')) {
            return;
        }

        if (symbol === '.' && this.#currentNum.includes('.')) {
            return;
        }

        if (symbol === '%' && this.#currentNum === '') {
            return;
        } else if (symbol !== '%' && this.#currentNum.toString().includes('%')) {
            return;
        }

        if (this.#currentNum.length === 15) {
            return;
        }

        this.#currentNum = this.#currentNum.toString() + symbol.toString();
    }

    selectOperation(operation) {
        if (this.#currentNum === '') {
            return;
        }
        this.#stackNumbers.push(parseFloat(this.#currentNum));

        if (this.#stackOperations.length() !== 0 && !this.#isDivisionByZero) {
            if (OperationsPriority[operation] > OperationsPriority[this.#stackOperations.peek()]) {
                this.#stackOperations.push(operation);
            } else {
                while ((OperationsPriority[operation] < OperationsPriority[this.#stackOperations.peek()] || 
                    OperationsPriority[operation] === OperationsPriority[this.#stackOperations.peek()]) && 
                    !this.#isDivisionByZero) {
                        let current = this.#stackNumbers.pop();
                        let previous = this.#stackNumbers.pop();
                        let operation = this.#stackOperations.pop();
                        let result = '';
    
                        switch(operation) {
                            case '+':
                                result = previous + current;
                                break;
                            case '-':
                                result = previous - current;
                                break;
                            case '×':
                                result = previous * current;
                                break;
                            case '÷':
                                if (current === 0) {
                                    this.#isDivisionByZero = true;
                                } else {
                                    result = previous / current;
                                }
                                break;
                            default:
                                return;
                        }
                        this.#stackNumbers.push(result);
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
        if (this.#currentNum !== '') {
            this.#stackNumbers.push(parseFloat(this.#currentNum));
            this.#outputString = `${this.#outputString} ${this.#currentNum} =`;
        }

        while (this.#stackOperations.length() !== 0 && !this.#isDivisionByZero) {
            let current = this.#stackNumbers.pop();
            let previous = this.#stackNumbers.pop();
            let operation = this.#stackOperations.pop();
            let result = '';

            switch(operation) {
                case '+':
                    result = previous + current;
                    break;
                case '-':
                    result = previous - current;
                    break;
                case '×':
                    result = previous * current;
                    break;
                case '÷':
                    if (current === 0) {
                        this.#isDivisionByZero = true;
                    } else {
                        result = previous / current;
                    }
                    break;
                default:
                    return;
            }
            this.#stackNumbers.push(result);
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
        const reverseNumber = -Number(this.#currentNum);
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
        if (this.#currentNum.toString().includes('%')) {
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
