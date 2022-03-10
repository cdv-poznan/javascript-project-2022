
const currencyFirst = document.querySelector('#currency-one')
const currencySecond = document.querySelector('#currency-two')
const changeBtn = document.querySelector('.changing')
const amountFirst = document.querySelector('.base-amount')
const amountSecond = document.querySelector('.converted-amount')
const rateInfo = document.querySelector('.rate-info')
const total = document.querySelector('.total')

const infoBtn = document.querySelector('.fa-circle-info');
const explanation = document.querySelector('.explanation');
const closeModalBtn = document.querySelector('.close');

const calculation = () => {
    fetch(`https://v6.exchangerate-api.com/v6/89de10cd4b5fc62d16b4a029/pair/${currencyFirst.value}/${currencySecond.value}`)
    .then(res => res.json())
    .then(data => {
        const currencyOne = currencyFirst.value
        const currencyTwo = currencySecond.value
        // console.log(data)
        // console.log(currencyOne)
        // console.log(currencyTwo)

        const rate = data.conversion_rate
        // console.log(rate)
        // let val = amountFirst.value
                
        rateInfo.textContent = `1 ${currencyOne} to ${rate} ${currencyTwo}`
        // rateInfo.textContent = `${val}`

        amountSecond.value = (amountFirst.value * rate).toFixed(2)

       

                if(amountFirst.value > '0' ) {
            total.textContent = `${amountFirst.value} ${currencyOne} to ${amountSecond.value} ${currencyTwo}`
        }
        
    })
}

// if(amountSecond.textContent !== '0,00') {
//     total.textContent = `${amountFirst.value} ${currencyOne} to ${amountSecond.value} ${currencyTwo}`
// } else {
//     total.style.visibility = 'hidden';
//    }


// const testVisibility = () => {
//     total.textContent = `${amountFirst.value} ${currencyOne} to ${amountSecond.value} ${currencyTwo}`
//     if(amountSecond.textContent !== '0,00') {
//         total.style.visibility = 'visible';
//     } else {
//         total.style.visibility = 'hidden';
       
//     }
// }

const change = () => {
    const firstValue = currencyFirst.value
    currencyFirst.value = currencySecond.value
    currencySecond.value = firstValue
    calculation ()
}

const showExplanation = () => {
    if (!(explanation.style.display === 'block')) {
        explanation.style.display = 'block';
    } else {
        explanation.style.display = 'none';
    };

    explanation.classList.toggle('modal-animation')
}





currencyFirst.addEventListener('change', calculation)
currencySecond.addEventListener('change', calculation)
amountFirst.addEventListener('input', calculation)
changeBtn.addEventListener('click', change)

infoBtn.addEventListener('click', showExplanation);
closeModalBtn.addEventListener('click', showExplanation);
window.addEventListener('click', e => e.target === explanation ? showExplanation() : false);

calculation()
