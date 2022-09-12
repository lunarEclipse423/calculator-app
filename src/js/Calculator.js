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

    cancelEntry() {
        this.#currentNum = this.#currentNum.toString().slice(0, -1);
    }

    addSymbol(symbol) {
        if (symbol === '.' && this.#currentNum.includes('.')) {
            return;
        }
        if (symbol === '%' && this.#currentNum === '') {
            console.log('im here!')
            return;
        }
        this.#currentNum = this.#currentNum.toString() + symbol.toString();
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

        if (isNaN(previous)) {
            if (isNaN(current)) {
                return;
            }

            if (this.#currentNum.toString().includes('%')) {
                const percentageCount = this.#currentNum.replace(/[^%]/g, '').length;
                for (let i = 0; i < percentageCount; i++) {
                    current = current / 100;
                }
                this.#currentNum = current;
            }
            return;
        }

        if (this.#previousNum.toString().includes('%')) {
            const percentageCount = this.#previousNum.replace(/[^%]/g, '').length;
            for (let i = 0; i < percentageCount; i++) {
                previous = previous / 100;
            }
        }

        let currentPercentageCount = 0;
        if (this.#currentNum.toString().includes('%')) {
            currentPercentageCount = this.#currentNum.replace(/[^%]/g, '').length;
            current = previous * current / 100;
            currentPercentageCount = currentPercentageCount - 1;
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

        if (currentPercentageCount !== 0) {
            for (let i = 0; i < currentPercentageCount; i++) {
                result = result / 100;
            }
        }

        this.#operation = undefined;
        this.#currentNum = result;
        this.#previousNum = '';
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
        } else {
            this.#currentNumText.innerText = this.displayNumber(this.#currentNum);
        }
        
        if (this.#operation != null) {
            if (this.#previousNum.toString().includes('%')) {
                this.#previousNumText.innerText = 
                    `${this.displayNumber(this.#previousNum).padEnd(this.#previousNum.length, '%')} ${this.#operation}`;
            } else {
                this.#previousNumText.innerText = 
                    `${this.displayNumber(this.#previousNum)} ${this.#operation}`;
            }
        } else {
            this.#previousNumText.innerText = '';
        }
    }
}
