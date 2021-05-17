
const numBtns = document.querySelectorAll('.key-number')
const opBtns = document.querySelectorAll('.key-operation')

const delBtn = document.getElementById('btn-del')
const equalsBtn = document.getElementById('btn-equals')
const resetBtn = document.getElementById('btn-reset')
const displayEl = document.getElementById('display-inner')

const themeBtn = document.getElementById('theme-switch')
const toggleEl = document.querySelector('.toggle')
const theme = localStorage.getItem('theme');
let i = 0;
if (theme) {
    document.body.classList.remove('theme-one','theme-two','theme-three')
    document.body.classList.add(theme)
}

let inputCurrent = ''
let inputPrev
let result
let operationCurrent = undefined

numBtns.forEach(numBtn => {
    numBtn.addEventListener('click', () => {
        let key = numBtn.dataset.value
        numInput(key)
    })
})
opBtns.forEach(opBtn => {
    opBtn.addEventListener('click', () => {
        let operation = opBtn.dataset.value
        if (operationCurrent !== undefined) return
        operationCurrent = operation
        inputPrev = inputCurrent;
        inputCurrent = '_'
        displayEl.classList.add('ready')
        displayEl.innerText = inputCurrent
    })
})
equalsBtn.addEventListener('click', calculate)

resetBtn.addEventListener('click', reset)
delBtn.addEventListener('click', deleteNumber)

themeBtn.addEventListener('click',() => {
    i <= 1 ? i ++ : i = 0;
    switchTheme()
})

function numInput(key) {
    if (typeof inputCurrent === 'string') {
        if (inputCurrent === '0' || inputCurrent == '_') {
            if (key !== '.') {
                inputCurrent = key
            } else {
                inputCurrent = '0.'
            }
        } else if(key === '.' && inputCurrent.includes('.')){
            return
        } else {
            inputCurrent += key
        }
    } else {
        if (key !== '.') {
            reset()
            inputCurrent = key
        } else {
            reset()
            inputCurrent = '0.'
        }
    }
    displayEl.classList.remove('ready')
    updateDisplay()
}
function  updateDisplay() {
    let option = {
        maximumFractionDigits: "10"
    }
    displayEl.innerText = Number(inputCurrent).toLocaleString("en-GB",option)
}

function calculate() {
    if (operationCurrent !== undefined) {
        result = eval(Number(inputPrev) + operationCurrent + Number(inputCurrent))
        inputCurrent = result
        operationCurrent = undefined
        updateDisplay()
    } else {
        return
    }
}

function deleteNumber() {
    if (typeof inputCurrent === 'string' && inputCurrent.length > 0) {
        inputCurrent = inputCurrent.slice(0,-1)
    } else if(inputCurrent.length <= 0){
        return
    } else {
        reset()
    }
    updateDisplay()
}
function reset() {
    inputCurrent = '0'
    inputPrev = 0
    result = 0
    operationCurrent = undefined
    updateDisplay()
    displayEl.classList.add('ready')
}

function switchTheme() {
    switch (i) {
        case 0:
            document.body.classList.add('theme-one')
            document.body.classList.remove('theme-two', 'theme-three')
            localStorage.setItem('theme', 'theme-one');
            break;
        case 1:
            document.body.classList.remove('theme-one', 'theme-three')
            document.body.classList.add('theme-two')
            localStorage.setItem('theme', 'theme-two');
            break;
        case 2:
            document.body.classList.remove('theme-two', 'theme-one')
            document.body.classList.add('theme-three')
            localStorage.setItem('theme', 'theme-three');
            break;
    
        default: console.log('default');
            break;
    }
}