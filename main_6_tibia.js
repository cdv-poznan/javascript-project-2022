async function tibiaData() {
    const response = await fetch('https://api.tibiadata.com/v3/spells');
    const json_tibia = await response.json();

    const box = document.getElementById('spellBox');
    for (const spell of (json_tibia.spells.spell_list)) {

        const info = document.createElement('div');
        info.classList.add('spell_list');

        box.appendChild(info);
        const spell_name = document.createElement('p');
        spell_name.innerText = "Name of spell: " + spell.name;

        const spell_level = document.createElement('p');
        spell_level.innerText = "The level required to use a spell: " + spell.level;

        const mana_spell = document.createElement('p');
        mana_spell.innerText = "Cost of mana: " + spell.mana;

        const price_spell = document.createElement('p');
        price_spell.innerText = "Price for spell: " + spell.price;


        info.appendChild(spell_name);
        info.appendChild(spell_level);
        info.appendChild(mana_spell);
        info.appendChild(price_spell);

    }
}


document.addEventListener('DOMContentLoaded', async () => {
    tibiaData();
});