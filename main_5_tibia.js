async function tibiaMonster() {
    const response = await fetch('https://api.tibiadata.com/v3/creatures');
    const json = await response.json();

    const creature = document.getElementById('monsterBox');

    for (const monster of json.creatures.creature_list) {
        const newMonster = document.createElement('div');
        newMonster.classList.add("monster-list");
        creature.appendChild(newMonster);

        const monsterName = document.createElement('p');
        monsterName.innerText = 'The name of the creation: ' + monster.name;

        const para = document.createElement('p');
        para.classList.add('imgPara');

        const monsterImg = document.createElement('img');
        monsterImg.src = monster.image_url;

        const monsterRace = document.createElement('p');
        monsterRace.innerText = 'Monster race: ' + monster.race
        
        newMonster.appendChild(monsterName);
        newMonster.appendChild(para);
        para.appendChild(monsterImg);
        newMonster.appendChild(monsterRace);

    }

}

document.addEventListener('DOMContentLoaded', async () => {
    tibiaMonster();
})