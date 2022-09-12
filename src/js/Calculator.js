export default class Calculator {
    #previousNumText;
    #currentNumText;
    #previousNum;
    #currentNum;
    #operation;

    constructor(previousNumText, currentNumText) {
        this.#previousNumText = previousNumText;
        this.#currentNumText = currentNumText;
        this.clearAll();
    }

    clearAll() {
        this.#previousNum = '';
        this.#currentNum = '';
        this.#operation = undefined;
    }

    delete() {
        this.#currentNum = this.#currentNum.toString().slice(0, -1);
    }

    addSymbol(num) {
        if (num === '.' && this.#currentNum.includes('.')) {
            return;
        }
        this.#currentNum = this.#currentNum.toString() + num.toString();
    }

    reverseSign() {
        if (this.#currentNum === '') {
            return;
        }
        const reverseNumber = -Number(this.#currentNum);
        this.#currentNum = reverseNumber.toString();
    }

    selectOperation(operation) {
        if (this.#currentNum === '') {
            return;
        }
        if (this.#previousNum !== '') {
            this.calculate();
        }

        this.#operation = operation;
        this.#previousNum = this.#currentNum;
        this.#currentNum = '';
    }

    calculate() {
        let result = '';
        let previous = parseFloat(this.#previousNum);
        let current = parseFloat(this.#currentNum);

        if (isNaN(previous) || isNaN(current)) {
            return;
        }

        switch(this.#operation) {
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
                result = previous / current;
                break;
            default:
                return;
        }
        this.#operation = undefined;
        this.#currentNum = result;
        this.#previousNum = '';
    }

    displayNumber(num) {
        const stringNumber = num.toString();
        const integerPart = parseFloat(stringNumber.split('.')[0]);
        const decimalPart = stringNumber.split('.')[1];
        let integerPartDisplay;
        if (isNaN(integerPart)) {
            integerPartDisplay = '';
        } else {
            integerPartDisplay = integerPart.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimalPart != null) {
            return `${integerPartDisplay}.${decimalPart}`;
        } else {
            return integerPartDisplay;
        }
    }

    updateDisplay() {
        this.#currentNumText.innerText = this.displayNumber(this.#currentNum);
        if (this.#operation != null) {
            this.#previousNumText.innerText = 
            `${this.displayNumber(this.#previousNum)} ${this.#operation}`;
        } else {
            this.#previousNumText.innerText = '';
        }
    }
}
