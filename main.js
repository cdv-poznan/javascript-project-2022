const currentDay = document.querySelector('.day')
const curiosity = document.querySelector('.curiosity')

const curiosityArr = ['W Singapurze zabronione jest żucie gumy.','Leonardo da Vinci potrafił malować jedną ręką i jednocześnie pisać drugą.', 'W trakcie oddychania żebra poruszają się rocznie 5 mln razy.', 'Przeciętny czterolatek zadaje ponad 400 pytań dziennie.', 'George Washington w swoim ogrodzie hodował konopie.', 'Od 1945 r. wszystkie brytyjskie czołgi wyposażone są w zestaw do parzenia herbaty.', 'Żeby wejść na wieżę Eiffla trzeba pokonać 1710 stopni.', 'W naszej galaktyce jest 100 miliardów gwiazd.', 'Chińczycy używają ponad 80 miliardów pałeczek w ciągu roku.', 'Aż pięć planet jesteśmy gotowi zobaczyć gołym okiem. Są to: Wenus, Merkury, Mars, Jowisz i Saturn..', 'Kiedyś litera Z została usunięta z alfabetu na aż 200 lat', 'Za niegrzeczne uważa się pisanie czerwonym tuszem w języku portugalskim.', 'Kopenhaga jest najbardziej przyjaznym rowerom miastem na świecie.', 'W 1889 roku królowa Włoch, Margherita Savoy, zamówiła pierwszą pizzę z dowozem.', 'Muhammad to najpopularniejsze imię na świecie.']

const day = new Date()
currentDay.textContent = day.toLocaleString("pl", {weekday:"long"})

const generateCuriosity = () => {
    const newCuriosity = Math.floor(Math.random() * curiosityArr.length)
    // curiosity.innerHTML = `${curiosityArr[newCuriosity]}`
    curiosity.textContent = curiosityArr[newCuriosity]
}

generateCuriosity()