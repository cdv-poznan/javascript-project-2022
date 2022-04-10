// consts:

const funFacts = [
    'Money usually takes the form of coins, banknotes and bank balances',
    'There are a number of different currencies used in countries around the world',
    'Many countries have their own currency, while some use a shared currency',
    'The currency most traded around the world is the United States dollar',
    'It is believed that products such as livestock and grain were used to barter (exchange goods and services without the use of money) over 10,000 years ago',
    'The first coins were minted (made) around 2,500 years ago',
    'Paper money was first used in China over 1,000 years ago',
    'The benefit of metal coins is that they are portable and durable',
    'The original value of a British pound was equal to a pound (in weight) of silver',
    "Credit cards were first used in the United States in the 1920’s"
]

const bottomSpan = document.querySelector('.bottom__span')
const dateSpan = document.querySelector('.top__info--span')
const styleBtn = document.querySelector('.top__button button')
const styleDiv = document.querySelector('.main__style')
const topDiv = document.querySelector('.top')
const styleInput = document.querySelector('.main__style--bgc input')
const basicBtn = document.querySelector('.main__style--first button')
const redBtn = document.querySelector('.main__style--second button')
const greenBtn = document.querySelector('.main__style--third button')
const styleP = document.querySelectorAll('.main__style p')
let root = document.documentElement
const inputTop = document.querySelector('.input-one')
const inputBottom = document.querySelector('.input-two')
const selectTop = document.querySelector('.select-one')
const selectBottom = document.querySelector('.select-two')
const swapBtn = document.querySelector('.swap')
const rateInfo = document.querySelector('.main__exchange--p')

// functions:

const getDate = () => {
    let currentDate = new Date().toLocaleDateString('pl')
    dateSpan.textContent = currentDate    
}

const getFact = () => {
    let number = Math.floor(Math.random()*funFacts.length)
    bottomSpan.textContent = `${funFacts[number]}.`
}

const showStyle = () => {
    if (styleDiv.style.opacity == 0) {
        styleDiv.style.opacity = 1
    } else {
        styleDiv.style.opacity = 0
    }
}

const getBackgroundImage = () => {
    newUrl = styleInput.value
    topDiv.style.backgroundImage = `url('${newUrl}')`
}

const getBasic = () => {
    root.style.setProperty('--dark', '#262626')
    root.style.setProperty('--light', '#262626')
    root.style.setProperty('--bgc', '#F2F2F2')
    for (p of styleP) {
        p.style.color = '#262626'
    }
}

const getRed = () => {
    root.style.setProperty('--dark', '#BF2121')
    root.style.setProperty('--light', '#BF8173')
    root.style.setProperty('--bgc', '#D9C5AD')
    for (p of styleP) {
        p.style.color = '#BF2121'
    }
}

const getGreen = () => {
    root.style.setProperty('--dark', '#005C53')
    root.style.setProperty('--light', '#9FC131')
    root.style.setProperty('--bgc', '#D6D58E')
    for (p of styleP) {
        p.style.color = '#005C53'
    }
}

const count = () => {
    const URL = `https://api.exchangerate.host/latest`
    const base = `?base=${selectTop.value}`
    const symbols = `&symbols=${selectBottom.value}`

    fetch(URL+base+symbols)
    .then(res => res.json())
    .then(data => {
        const rate = data.rates[selectBottom.value]
        rateInfo.textContent = `1${selectTop.value} = ${rate.toFixed(6)}${selectBottom.value}`
        inputBottom.value = (inputTop.value * rate).toFixed(2)
    })
    .catch(err => alert('fatal ERROR of API!!!'))
}

const swap = () => {
    const catchCurrency = selectTop.value
    selectTop.value = selectBottom.value
    selectBottom.value = catchCurrency
    count()
}


// listeners:

styleInput.addEventListener('keyup', function(e) {
if (e.keyCode === 13) {getBackgroundImage() 
    styleInput.value = ''}})
window.addEventListener('DOMContentLoaded', getFact)
window.addEventListener('DOMContentLoaded', getDate)
styleBtn.addEventListener('click', showStyle)
basicBtn.addEventListener('click', getBasic)
redBtn.addEventListener('click', getRed)
greenBtn.addEventListener('click', getGreen)
selectTop.addEventListener('change', count)
selectBottom.addEventListener('change', count)
inputTop.addEventListener('input', count)
swapBtn.addEventListener('click', swap)