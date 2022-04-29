const currencyFirst = document.querySelector('#currency-one');
const currencySecond = document.querySelector('#currency-two');
const changeBtn = document.querySelector('.changing');
const amountFirst = document.querySelector('.base-amount');
const amountSecond = document.querySelector('.converted-amount');
const rateInfo = document.querySelector('.rate-info');
const total = document.querySelector('.total');

const infoBtn = document.querySelector('.fa-circle-info');
const explanation = document.querySelector('.explanation');
const save = document.querySelector('.fa-floppy-disk');
const closeModalBtn = document.querySelector('.close');

const colorBtn = document.querySelector('.fa-palette');
const colorPanel = document.querySelector('.colors');
const colorOne = document.querySelector('.first');
const colorTwo = document.querySelector('.second');
const colorThree = document.querySelector('.third');
let root = document.documentElement;

const currentDay = document.querySelector('.day');
const curiosity = document.querySelector('.curiosity');



const curiosityArr = [
	'W Singapurze zabronione jest żucie gumy.',
	'Leonardo da Vinci potrafił malować jedną ręką i jednocześnie pisać drugą.',
	'W trakcie oddychania żebra poruszają się rocznie 5 mln razy.',
	'Przeciętny czterolatek zadaje ponad 400 pytań dziennie.',
	'George Washington w swoim ogrodzie hodował konopie.',
	'Od 1945 r. wszystkie brytyjskie czołgi wyposażone są w zestaw do parzenia herbaty.',
	'Żeby wejść na wieżę Eiffla trzeba pokonać 1710 stopni.',
	'W naszej galaktyce jest 100 miliardów gwiazd.',
	'Chińczycy używają ponad 80 miliardów pałeczek w ciągu roku.',
	'Aż pięć planet jesteśmy gotowi zobaczyć gołym okiem. Są to: Wenus, Merkury, Mars, Jowisz i Saturn..',
	'Kiedyś litera Z została usunięta z alfabetu na aż 200 lat',
	'Za niegrzeczne uważa się pisanie czerwonym tuszem w języku portugalskim.',
	'Kopenhaga jest najbardziej przyjaznym rowerom miastem na świecie.',
	'W 1889 roku królowa Włoch, Margherita Savoy, zamówiła pierwszą pizzę z dowozem.',
	'Muhammad to najpopularniejsze imię na świecie.',
];

const day = new Date();
currentDay.textContent = day.toLocaleString('pl', { weekday: 'long' });

const generateCuriosity = () => {
	const newCuriosity = Math.floor(Math.random() * curiosityArr.length);
	curiosity.textContent = curiosityArr[newCuriosity];
};

const calculation = () => {
	fetch(
		`https://v6.exchangerate-api.com/v6/89de10cd4b5fc62d16b4a029/pair/${currencyFirst.value}/${currencySecond.value}`
	)
		.then((res) => res.json())
		.then((data) => {
			const currencyOne = currencyFirst.value;
			const currencyTwo = currencySecond.value;

			const rate = data.conversion_rate;

			rateInfo.textContent = `1 ${currencyOne} to ${rate} ${currencyTwo}`;
			amountSecond.value = (amountFirst.value * rate).toFixed(2);
			if (amountFirst.value > '0') {
				total.textContent = `${amountFirst.value} ${currencyOne} to ${amountSecond.value} ${currencyTwo}`;
				clear()
			}
		});
};

const change = () => {
	const firstValue = currencyFirst.value;
	currencyFirst.value = currencySecond.value;
	currencySecond.value = firstValue;
	calculation();
};

const showExplanation = () => {
	if (!(explanation.style.display === 'block')) {
		explanation.style.display = 'block';
	} else {
		explanation.style.display = 'none';
	}

	explanation.classList.toggle('modal-animation');
};

const saveConversion = () => {
	
}

currencyFirst.addEventListener('change', calculation);
currencySecond.addEventListener('change', calculation);
amountFirst.addEventListener('input', calculation);
changeBtn.addEventListener('click', change);

infoBtn.addEventListener('click', showExplanation);
closeModalBtn.addEventListener('click', showExplanation);
saveBtn.addEventListener('click', saveConversion )

window.addEventListener('click', (e) =>
	e.target === explanation ? showExplanation() : false
);

colorBtn.addEventListener('click', () => {
	colorPanel.classList.toggle('show-colors');
});

colorOne.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgba(30, 226, 216, 0.699)');
});

colorTwo.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgba(255, 255, 255, 0.43)');
});

colorThree.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgba(27, 48, 182, 0.86)');
});

generateCuriosity();
calculation();