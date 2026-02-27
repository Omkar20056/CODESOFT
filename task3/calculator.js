const display = document.getElementById('display');
    let currentInput = '';
    let operator = null;
    let firstValue = null;

    function updateDisplay(value) {
        display.textContent = value;
    }

    function clearCalculator() {
        currentInput = '';
        operator = null;
        firstValue = null;
        updateDisplay('0');
    }

    function handleDigit(digit) {
        if (digit === '.' && currentInput.includes('.')) return; // only one decimal
        currentInput += digit;
        updateDisplay(currentInput);
    }

    function handleOperator(op) {
        if (currentInput === '' && firstValue === null) return;
        if (firstValue === null) {
            firstValue = parseFloat(currentInput);
        } else if (currentInput !== '') {
            firstValue = calculate(firstValue, parseFloat(currentInput), operator);
            updateDisplay(firstValue);
        }
        operator = op;
        currentInput = '';
    }

    function calculate(a, b, op) {
        switch(op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b === 0 ? 'Error' : a / b;
            default: return b;
        }
    }

    function handleEquals() {
        if (operator === null || currentInput === '') return;
        const result = calculate(firstValue, parseFloat(currentInput), operator);
        updateDisplay(result);
        currentInput = result.toString();
        operator = null;
        firstValue = null;
    }

    document.querySelectorAll('.button[data-digit]').forEach(btn => {
        btn.addEventListener('click', () => handleDigit(btn.getAttribute('data-digit')));
    });

    document.querySelectorAll('.button.operator').forEach(btn => {
        btn.addEventListener('click', () => handleOperator(btn.getAttribute('data-op')));
    });

    document.getElementById('equals').addEventListener('click', handleEquals);
    document.getElementById('clear').addEventListener('click', clearCalculator);