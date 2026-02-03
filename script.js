class Calculator {
 constructor(previousOperandTextElement, currentOperandTextElement) {
// this no JavaScript é uma palavra-chave que referencia o objeto que está executando o código no momento  
  this.previousOperandTextElement = previousOperandTextElement
  this.currentOperandTextElement = currentOperandTextElement
  this.clear()
 }

// definindo funções
 clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
 }

 delete() {
  this.currentOperand = this.currentOperand.toString().slice(0, -1)
 }
// '===' é o operador de igualdade estrita em JavaScript.  '&&' em JavaScript é o operador lógico "E" (AND), usado para combinar múltiplas condições.
 appendNumber(number) {
  if (number === '.' && this.currentOperand.includes('.')) return
  this.currentOperand = this.currentOperand.toString() + number.toString()
 }

 chooseOperation(operation) {
  if (this.currentOperand === '') return
  //!==
  if (this.previousOperand !== '') {
    this.compute()
  }
  this.operation = operation
  this.previousOperand = this.currentOperand
  this.currentOperand = ''
 }

//função dos calculos
 compute() {
  let computation
  const prev = parseFloat(this.previousOperand)
  const current = parseFloat(this.currentOperand)
  if (isNaN(prev) || isNaN(current)) return
  switch (this.operation) {
    case '+':
      computation = prev + current
      break
    case '-':
      computation = prev - current
      break
    case '*':
      computation = prev * current
      break
    case '÷':
      computation = prev / current
      break
    default:
      return
  }
  this.currentOperand = computation
  this.operation = undefined
  this.previousOperand = ''
 }

 getDysplayNumber(number) {
  const stringNumber = number.toString()
  const integerDigits = parseFloat(stringNumber.split('.')[0])
  const decimalDigits= stringNumber.split('.')[1]
  let integerDisplay
  if (isNaN(integerDigits)) {
    integerDisplay = ''
  } else {
    integerDisplay = integerDigits.toLocaleString('en', {
    maximumFractionDigits: 0})
  }
  if(decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`
  } else {
    return integerDisplay
  }
}

 updateDisplay() {
  this.currentOperandTextElement.innerText = 
    this.getDysplayNumber(this.currentOperand)
  if (this.operation != null) {
    this.previousOperandTextElement.innerText = 
    `${this.getDysplayNumber(this.previousOperand)} ${this.operation}`
  } else {
    this.previousOperandTextElement.innerText = ''
  }
 }
}

// constantes para os atributos de dados
const numberButtons = document.querySelectorAll('[data-number]');
const OperationButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]'); 
const deleteButton = document.querySelector('[data-delete]'); 
const allCrearButtons = document.querySelector('[data-all-clear]'); 
const previousOperandTextElement = document.querySelector('[data-previous-operand]'); 
const currentOperandTextElement = document.querySelector('[data-current-operand]');

//definindo classes junto com o construtor
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText) // calculator: É uma Instância da classe (ou simplesmente um Objeto).
    calculator.updateDisplay() //.appendNumber e .updateDisplay: São Chamadas de Método.
  })
})

OperationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButtons.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allCrearButtons.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})